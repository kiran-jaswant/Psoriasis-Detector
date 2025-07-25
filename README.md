# Psoriasis Severity Detection System

## Overview

A comprehensive web-based application that uses machine learning to predict psoriasis severity from skin images and provides personalized treatment recommendations. This project was developed as part of Session 2024-25 mini project.

## Team Members - Group No. 1

- **Arunima Lokhande** (Roll no: 02)
- **Kiran Jaswant** (Roll no: 12)
- **Prachi Iikhar** (Roll no: 17)
- **Ritiksha Ingle** (Roll no: 21)
- **Janvi Bhaise** (Roll no: 07)
- **Gaurav Tichkule** (Roll no: 51)

**Guided By:** Dr. Rajesh Dharmik

## Features

### 🔍 Core Features

- **Image-based Psoriasis Detection**: Upload skin images for severity analysis
- **AI-Powered Classification**: Deep learning model classifies severity as Mild, Moderate, or Severe
- **Personalized Recommendations**: Tailored advice based on severity level
- **User Authentication**: Secure login/signup system
- **Responsive Design**: Works on desktop and mobile devices

### 🚀 Advanced Features

- **Real-time Image Preview**: Preview uploaded images before analysis
- **Progress Tracking**: Visual upload progress indicators
- **Historical Reports**: Track analysis history (planned)
- **Educational Content**: Information about psoriasis and treatment options

## Technology Stack

### Frontend

- **React 19** with Vite for fast development
- **Tailwind CSS** for modern styling
- **React Router** for navigation
- **React Dropzone** for file uploads
- **Lucide React** for icons

### Backend

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **CORS** for cross-origin requests

### Machine Learning

- **TensorFlow/Keras** for deep learning
- **Flask** API for model serving
- **PIL** for image processing
- **NumPy** for numerical operations

## Project Structure

```
Psoriasis-Detector/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── views/         # Page components
│   │   └── assets/        # Images and static files
│   └── package.json
├── server/                # Node.js backend
│   ├── controllers/       # Route handlers
│   ├── models/           # Database models
│   └── index.js
├── ml-model/             # Machine learning components
│   ├── app.py           # Flask API
│   ├── *.ipynb          # Jupyter notebooks
│   ├── dataset/         # Training images
│   └── labeled_data/    # Classified training data
└── README.md
```

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- MongoDB
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Prachiikhar25/Psoriasis-Detector.git
cd Psoriasis-Detector
```

### 2. Frontend Setup

```bash
cd client
npm install
npm run dev
```

### 3. Backend Setup

```bash
cd server
npm install
# Create .env file with MongoDB connection string
echo "MONGODB_URL=your_mongodb_connection_string" > .env
echo "JWT_SECRET=your_jwt_secret" >> .env
npm run dev
```

### 4. ML Model Setup

```bash
cd ml-model
pip install tensorflow flask flask-cors pillow numpy
python app.py
```

## Usage

1. **Start all services**:

   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:5002`
   - ML API: `http://localhost:5000`

2. **Create an account** or login
3. **Upload a skin image** showing psoriasis symptoms
4. **Get severity analysis** with personalized recommendations

## Model Information

### Architecture

- **Convolutional Neural Network (CNN)**
- **Input Size**: 128x128x3 RGB images
- **Classes**: Mild, Moderate, Severe
- **Training Data**: Curated dataset of psoriasis images

### Performance Metrics

- **Accuracy**: ~85% (on validation set)
- **Precision**: High for severe cases
- **Recall**: Balanced across all severity levels

## API Endpoints

### Authentication

- `POST /signup` - User registration
- `POST /login` - User login

### Health Check

- `GET /health` - Server status

### ML Prediction

- `POST /predict` - Image analysis (Flask API)

## Contributing

This is an academic project. For improvements or suggestions:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## Future Enhancements

- [ ] Mobile app development
- [ ] Advanced image preprocessing
- [ ] Integration with medical databases
- [ ] Telemedicine consultation features
- [ ] Multi-language support
- [ ] Real-time notifications

## License

This project is developed for educational purposes as part of the academic curriculum.

## Acknowledgments

- **Dr. Rajesh Dharmik** for guidance and supervision
- Medical literature and datasets used for training
- Open-source libraries and frameworks

## Contact

For questions or collaboration:

- GitHub: [Prachiikhar25](https://github.com/Prachiikhar25)
- Project Link: [Psoriasis-Detector](https://github.com/Prachiikhar25/Psoriasis-Detector)

---

.
**Note**: This system is for educational and research purposes only. Always consult healthcare professionals for medical advice.
