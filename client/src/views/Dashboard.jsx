import React from 'react';
import Navbar from '../components/Navbar';
import Dashboardsection from '../components/Dashboardsection';

function Dashboard() {
  // This function is passed down and used in Dashboardsection
  const handleGenerateReport = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Unknown error from server');
      }

      const data = await response.json();
      return data.prediction; // This is sent to Dashboardsection and shown in alert
    } catch (error) {
      console.error('Error while predicting:', error);
      throw error;
    }
  };

  return (
    <div>
      <Navbar />
      <Dashboardsection onGenerateReport={handleGenerateReport} />
    </div>
  );
}

export default Dashboard;
