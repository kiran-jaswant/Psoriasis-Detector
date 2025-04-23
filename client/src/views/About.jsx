import React from "react";
import Slider from "react-slick";
import Navbar from "../components/Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../components/Footer";

import AboutImg1 from './../assets/AboutImg/aboutslide1.jpg'
import AboutImg2 from './../assets/AboutImg/aboutslide2.jpg'
import AboutImg3 from './../assets/AboutImg/aboutslide3.jpg'


export default function About() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <div>
      <Navbar />

      {/* Section 1: About + Auto-Slider */}
      <div className="bg-pink-100 px-6 py-10 flex flex-col md:flex-row justify-center items-center min-h-[700px]">
        {/* Info Text */}
        <div className="md:w-1/2 mb-7 md:mb-0 md:pr-10">
          <h2 className="text-4xl font-semibold text-pink-600 mb-9 ml-40">About Psoriasis Detector</h2>
          <p className="text-gray-700 text-lg leading-relaxed ml-40">
          Our AI-powered psoriasis detector helps individuals assess the severity of their skin condition quickly and easily. By analyzing images of affected areas—such as the palms, scalp, fingers, feet, and elbows—our model evaluates visible symptoms and provides insights into the intensity of psoriasis.<br/>
          Whether you're managing mild flare-ups or tracking more serious cases, our tool empowers you with early awareness and information to support timely care and treatment decisions.
          </p>
        </div>

        {/* Slider */}
        <div className="md:w-1/2 w-full">
          <div className="rounded-xl overflow-hidden shadow-lg mx-4">
            <Slider {...sliderSettings}>
              <div>
                <img src={AboutImg1} alt="Slide 1" className="w-full h-[400px] object-cover rounded-xl" />
              </div>
              <div>
                <img src={AboutImg2} alt="Slide 2" className="w-full h-[400px] object-cover rounded-xl" />
              </div>
              <div>
                <img src={AboutImg3} alt="Slide 3" className="w-full h-[400px] object-cover rounded-xl" />
              </div>
            </Slider>
          </div>
        </div>
      </div>

      {/* Section 2: Info + Images */}
      <div className="bg-white py-12 px-6 text-center">
        <h3 className="text-4xl font-semibold text-pink-600 mb-10">Our Mission</h3>
        <p className="text-gray-700 max-w-2xl mx-auto mb-10 text-lg">
          We aim to make skin disease diagnosis more accessible. Our platform promotes awareness and enables 
          quick pre-screening from the comfort of home.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <img src={AboutImg1} className="rounded-xl" alt="Awareness" />
          <img src={AboutImg2} className="rounded-xl" alt="Detection" />
          <img src={AboutImg3} className="rounded-xl" alt="Community" />
        </div>
      </div>
 
      {/* Section 3: Team Members */}
      <div className="bg-pink-50 py-12 px-6 text-center">
  <h3 className="text-4xl font-semibold text-pink-600 mb-15">Meet Our Team</h3>
  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
    {[
      "Ritiksha Ingle",
      "Kiran Jaswant",
      "Prachi Likhar",
      "Arunima Lokhande",
      "Janhvi Bhaise",
      "Gaurav Tichkule"
    ].map((name, i) => (
      <div key={i} className="flex flex-col items-center">
        <img
          src="https://via.placeholder.com/150"
          className="rounded-full w-28 h-28 object-cover shadow-md mb-2"
          alt={name}
        />
        <p className="text-pink-600 font-medium">{name}</p>
      </div>
    ))}
  </div>
</div>

      <Footer/>
    </div>
  );
}
