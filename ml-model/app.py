from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.utils import img_to_array
from PIL import Image
import numpy as np
import pandas as pd

# our hybrid recommender
from recommendation_engine import RecommendationEngine, KNNConfig

# ---------------------------
# Load DL models
# ---------------------------
print("Loading models...")
skin_model = load_model("skin_detector_model.h5")
severity_model = load_model("psoriasis_severity_model.h5")
print("Models loaded successfully.")

# ---------------------------
# Load recommender dataset
# ---------------------------
DF_PATH = "dataset/patients_history.csv"
try:
    df = pd.read_csv(DF_PATH)
    print(f"Loaded patient dataset: {len(df)} records")
except Exception as e:
    raise RuntimeError(f"Failed to load dataset at {DF_PATH}: {e}")

# NOTE: keep k <= dataset size (or implement auto-k in recommendation_engine.py)
engine = RecommendationEngine(KNNConfig(n_neighbors=3, rule_weight=0.7, knn_weight=0.3))
engine.fit(df)

# ---------------------------
# Initialize Flask
# ---------------------------
app = Flask(__name__)
CORS(app)

# ---------------------------
# Image prediction endpoint
# ---------------------------
@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    print(f"Received file: {file.filename}")

    try:
        # preprocess image
        image = Image.open(file.stream).convert("RGB")
        image = image.resize((128, 128))
        img_array = img_to_array(image) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # step 1: detect valid/normal/psoriasis
        skin_pred = skin_model.predict(img_array)
        skin_class = np.argmax(skin_pred, axis=1)[0]
        skin_labels = ["invalid", "normal skin", "psoriasis"]
        skin_result = skin_labels[skin_class]

        if skin_result == "invalid":
            return jsonify({
                "severity": "Invalid image",
                "advice": "Please upload a proper skin image for analysis."
            })

        if skin_result == "normal skin":
            return jsonify({
                "severity": "Normal skin",
                "advice": "No signs of psoriasis detected. Maintain healthy skincare."
            })

        # psoriasis → step 2: severity
        severity_pred = severity_model.predict(img_array)
        severity_class = np.argmax(severity_pred, axis=1)[0]
        severity_labels = ["Mild", "Moderate", "Severe"]
        advice_text = {
            "Mild": "Maintain good skincare and monitor symptoms regularly.",
            "Moderate": "Consider visiting a dermatologist for a personalized treatment plan.",
            "Severe": "Immediate consultation with a dermatologist is highly recommended."
        }
        severity = severity_labels[severity_class]

        return jsonify({
            "severity": severity,
            "advice": advice_text[severity]
        })

    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({"error": str(e)}), 500


# ---------------------------
# Lifestyle recommendation endpoint
# ---------------------------
@app.route("/recommend", methods=["POST"])
def recommend():
    """
    Expects JSON:
    {
      "form_answers": {...},
      "image_severity": "normal|mild|moderate|severe|invalid"
    }
    """
    try:
        data = request.get_json(force=True) or {}
        form_answers = data.get("form_answers", {}) or {}
        severity = (data.get("image_severity") or "mild").lower()

        # normalize yes/no fields
        def norm(v): return v.lower() if isinstance(v, str) else v
        for k in ["smoking", "alcohol", "scalp_involved", "harsh_soap_use", "moisturiser_use"]:
            if k in form_answers:
                form_answers[k] = norm(form_answers[k])

        # SAFE DEFAULTS to avoid NaNs in kNN (imputers help too)
        form_answers.setdefault("sleep_hours", 7)
        form_answers.setdefault("itch_severity", 0)
        form_answers.setdefault("flare_frequency", 0)

        result = engine.recommend(form_answers, severity)
        return jsonify(result), 200

    except Exception as e:
        print(f"Recommend error: {e}")
        return jsonify({"error": str(e)}), 500


# ---------------------------
# Main
# ---------------------------
if __name__ == "__main__":
    print("Starting Flask server on port 5001...")
    app.run(host="0.0.0.0", port=5001, debug=False)
