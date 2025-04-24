
from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os

app = Flask(__name__)
model = load_model('model.h5')  # Make sure model.h5 is in same folder

@app.route('/predict', methods=['POST'])
def predict():
    img_file = request.files['file']
    img_path = "temp.jpg"
    img_file.save(img_path)

    img = image.load_img(img_path, target_size=(128, 128))  # Change to your input size
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0

    prediction = model.predict(img_array)
    class_idx = np.argmax(prediction[0])

    class_names = ['mild', 'moderate', 'severe']  # Update this based on your training
    return jsonify({'prediction': class_names[class_idx]})
    
if __name__ == '__main__':
    app.run(debug=True)
