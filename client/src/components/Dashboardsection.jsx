import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import reportImg from './../assets/DashboardImg/Report.png';

const Dashboardsection = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);


  const onDrop = useCallback(acceptedFiles => {
    setIsDraggingOver(false);
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploadedFile(file);
      setImagePreview(URL.createObjectURL(file)); // 👈 create preview
      setIsUploading(true);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
        }
      }, 300);
    }
  }, []);

  const handleGenerateReport = async () => {
    if (!uploadedFile) {
      alert('Please upload an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
      setIsUploading(true);
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.error) {
        alert("Backend Error: " + result.error);
      } else {
        setPrediction({
          severity: result.severity,
          advice: result.advice,
        });
      }
    } catch (error) {
      console.error("Prediction error:", error);
      alert("Something went wrong while giving prediction.");
    } finally {
      setIsUploading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Mild': return 'text-green-600';
      case 'Moderate': return 'text-yellow-600';
      case 'Severe': return 'text-red-600';
      case 'Normal Skin': return 'text-blue-600';
      case 'Invalid Image': return 'text-gray-500';
      default: return 'text-gray-800';
    }
  };


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, image/jpg',
    maxFiles: 1,
    onDragEnter: () => setIsDraggingOver(true),
    onDragLeave: () => setIsDraggingOver(false),
  });

  return (
    <div className="bg-white py-10 px-6 md:px-20">
      <h2 className="text-2xl font-semibold text-gray-800 mb-10 text-center">
        Psoriasis Severity Detector:Upload Image of affected part of skin
      </h2>

      <div className="flex flex-col md:flex-row md:items-start md:space-x-10">
        {/* Left Side - Upload + Button + Result */}
        <div className="flex-1 space-y-6">
          {/* Upload Section */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed border-gray-300 rounded-md p-10 text-center cursor-pointer transition duration-300 ease-in-out ${isDraggingOver ? 'bg-gray-50 border-green-500' : 'bg-white'}`}
          >
            <input {...getInputProps()} />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <p className="text-gray-700">{isDragActive ? 'Drop it here...' : 'Drag and Drop Files or Browse'}</p>
            <p className="text-gray-500 text-sm">(Only jpg, jpeg, png supported)</p>
          </div>

          {/* Uploaded Image Preview */}
          {imagePreview && (
            <div className="mt-4 flex justify-center pr-4">
              <div>
                <h3 className="text-gray-700 font-semibold mb-2 text-left">Preview:</h3>
                <img
                  src={imagePreview}
                  alt="Uploaded Preview"
                  className="w-72 h-96 rounded-lg border border-gray-300 shadow-md"
                />
              </div>
            </div>
          )}


          {/* Generate Button */}
          <div className="flex justify-end pr-80">
            <button
              onClick={handleGenerateReport}
              className="mt-4 bg-green-500 text-white py-3 px-6 rounded-lg transition-all duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!uploadedFile || isUploading}
            >
              GENERATE REPORT
            </button>
          </div>

          {/* Prediction Card */}
          {prediction && (
            <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6">
              <h3 className={`text-xl font-semibold mb-2 text-center ${getSeverityColor(prediction.severity)}`}>
                Psoriasis Severity: {prediction.severity}
              </h3>
              <p className="text-gray-700 text-center">{prediction.advice}</p>
            </div>
          )}
        </div>

        {/* Right Side - Report Image */}
        <div className="md:w-[500px] h-[400px] mt-10 md:mt-0 flex justify-center items-center">
          <div className="relative w-full h-full rounded-md overflow-hidden shadow-md">
            <img src={reportImg} alt="Report Illustration" className="absolute inset-0 w-full h-full object-contain" />
          </div>
        </div>
      </div>

      {/* Upload Progress - Always at the Bottom */}
      {isUploading && (
        <div className="mt-10">
          <p className="text-gray-700 mb-2">Uploading...</p>
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-green-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-gray-500 text-sm mt-1">{uploadProgress}%</p>
        </div>
      )}

      {uploadedFile && !isUploading && (
        <div className="mt-6">
          <p className="text-gray-700">Uploaded File: {uploadedFile.name}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboardsection;
