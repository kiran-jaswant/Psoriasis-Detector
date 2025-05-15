from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.utils import img_to_array
from PIL import Image
import numpy as np

# Load both models
skin_detector_model = load_model('skin_detector_model.h5')  #  new model
severity_model = load_model('psoriasis_severity_model.h5')  #  old model

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    print(f"Received file: {file.filename}")

    try:
        # Step 1: Preprocess image
        image = Image.open(file.stream).convert('RGB')
        image = image.resize((128, 128))
        img_array = img_to_array(image) / 255.0
        img_array = np.expand_dims(img_array, axis=0)  # (1, 128, 128, 3)

        # Step 2: Run skin detector model
        skin_pred = skin_detector_model.predict(img_array)
        skin_label_index = int(np.argmax(skin_pred))
        skin_labels = ['invalid', 'normal skin', 'psoriasis']
        skin_result = skin_labels[skin_label_index]

        # Step 3: Handle based on result
        if skin_result == 'invalid':
            return jsonify({'severity': 'Invalid Image', 'advice': 'Please upload a clear image of skin area.'})

        elif skin_result == 'normal skin':
            return jsonify({'severity': 'Normal Skin', 'advice': 'No signs of psoriasis detected. Maintain healthy skincare.'})

        elif skin_result == 'psoriasis':
            # Step 4: Run severity model
            severity_pred = severity_model.predict(img_array)
            severity_index = int(np.argmax(severity_pred))
            severity_labels = ['Mild', 'Moderate', 'Severe']
            advice = {
                'Mild': 'Maintain good skincare and monitor symptoms regularly.',
                'Moderate': 'Consider visiting a dermatologist for a personalized treatment plan.',
                'Severe': 'Immediate consultation with a dermatologist is highly recommended.'
            }
            severity_result = severity_labels[severity_index]

            return jsonify({
                'severity': severity_result,
                'advice': advice[severity_result]
            })

        else:
            return jsonify({'error': 'Unexpected result'}), 500

    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
