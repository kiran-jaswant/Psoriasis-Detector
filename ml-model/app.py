from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.utils import img_to_array
from PIL import Image
import numpy as np

# Load the model
model = load_model('psoriasis_severity_model.h5')

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    print(f"Received file: {file.filename}")

    try:
        # Resize to the shape your model expects: (128, 128)
        image = Image.open(file.stream).convert('RGB')
        image = image.resize((128, 128))  # ✅ VERY IMPORTANT
        img_array = img_to_array(image) / 255.0
        img_array = np.expand_dims(img_array, axis=0)  # Shape: (1, 128, 128, 3)

        prediction = model.predict(img_array)
        predicted_class = int(np.argmax(prediction, axis=1)[0])
        labels = ['Mild', 'Moderate', 'Severe']
        advice = {
            'Mild': 'Maintain good skincare and monitor symptoms regularly.',
            'Moderate': 'Consider visiting a dermatologist for a personalized treatment plan.',
            'Severe': 'Immediate consultation with a dermatologist is highly recommended.'
        }
        severity = labels[predicted_class]

        return jsonify({
            'severity': severity,
            'advice': advice[severity]
        })

    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
