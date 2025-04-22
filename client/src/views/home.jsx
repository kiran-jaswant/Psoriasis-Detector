import React from 'react';
import Navbar from '../components/Navbar';
import HeroWithVideoBackground from '../components/HeroWithVideoBackground'; 
import HomeCardSection from '../components/HomeCardSection';
import CountDiseaseSection from '../components/CountDiseaseSection';

function Home() {
  return (
    <div>
      <Navbar />
      <HeroWithVideoBackground />
      <HomeCardSection/>
      <CountDiseaseSection/>
    </div>
  );
}

export default Home;
