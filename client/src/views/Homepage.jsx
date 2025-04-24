import React from 'react';
import Navbar from '../components/Navbar';
import HeroWithVideoBackground from '../components/HeroWithVideoBackground'; 
import HomeCardSection from '../components/HomeCardSection';
import CountDiseaseSection from '../components/CountDiseaseSection';
import SliderSection from '../components/SliderSection';
import Footer from '../components/Footer';

function Home() {
  return (
    <div>
      <Navbar />
      <HeroWithVideoBackground />
      <HomeCardSection/>
      <CountDiseaseSection/>
      <SliderSection/>
      <Footer/>
    </div>
  );
}

export default Home;
