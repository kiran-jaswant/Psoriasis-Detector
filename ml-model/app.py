from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.utils import img_to_array
from PIL import Image
import numpy as np

# Load both models
skin_model = load_model('skin_detector_model.h5')
severity_model = load_model('psoriasis_severity_model.h5')

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    print(f"Received file: {file.filename}")

    try:
        image = Image.open(file.stream).convert('RGB')
        image = image.resize((128, 128))
        img_array = img_to_array(image) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # Step 1: Use skin detector model
        skin_pred = skin_model.predict(img_array)
        skin_class = np.argmax(skin_pred, axis=1)[0]
        skin_labels = ['invalid', 'normal skin', 'psoriasis']
        skin_result = skin_labels[skin_class]

        if skin_result == 'invalid':
            return jsonify({
                'severity': 'Invalid image',
                'advice': 'Please upload a proper skin image for analysis.'
            })

        elif skin_result == 'normal skin':
            return jsonify({
                'severity': 'Normal skin',
                'advice': 'No signs of psoriasis detected. Maintain healthy skincare.'
            })

        elif skin_result == 'psoriasis':
            # Step 2: Use severity model
            severity_pred = severity_model.predict(img_array)
            severity_class = np.argmax(severity_pred, axis=1)[0]
            severity_labels = ['Mild', 'Moderate', 'Severe']
            advice = {
                'Mild': 'Maintain good skincare and monitor symptoms regularly.',
                'Moderate': 'Consider visiting a dermatologist for a personalized treatment plan.',
                'Severe': 'Immediate consultation with a dermatologist is highly recommended.'
            }
            severity = severity_labels[severity_class]

            return jsonify({
                'severity': severity,
                'advice': advice[severity]
            })

        else:
            return jsonify({'error': 'Unexpected result'}), 500

    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
