import React, { useState, useEffect, useRef } from 'react';
import skincard1 from "./../assets/HomeImg/skincard1.jpg";
import skincard2 from "./../assets/HomeImg/skincard2.jpg";
import skincard3 from "./../assets/HomeImg/skincard3.jpg";
import skincard4 from "./../assets/HomeImg/skincard4.jpg";
import skincard5 from "./../assets/HomeImg/skincard5.jpg";
import skincard9 from "./../assets/HomeImg/skincard9.jpg";
import skincard7 from "./../assets/HomeImg/skincard7.jpg";
import skincard8 from "./../assets/HomeImg/skincard8.jpg";


const CountDiseaseSection = () => {
  const stats = [
    {
      count: 125,
      suffix: 'M',
      label: 'People Affected Worldwide',
      description:
        'An estimated 125 million people globally live with psoriasis, according to the World Psoriasis Day consortium.',
    },
    {
      count: 80,
      suffix: '%',
      label: 'Experience Mild to Moderate Symptoms',
      description:
        'Most patients manage their psoriasis with topical treatments and lifestyle changes.',
    },
    {
      count: 70,
      suffix: '%',
      label: 'Report Improvement with Biologics',
      description:
        'Advanced therapies like biologics have significantly improved quality of life for many moderate to severe cases.',
    },
    {
      count: 30,
      suffix: '%',
      label: 'Develop Psoriatic Arthritis',
      description:
        'Around 30% of individuals with psoriasis eventually develop psoriatic arthritis, causing joint pain, stiffness, and swelling.',
    },
  ];

  const useCountUp = (targetValue, isVisible) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let interval;
      let timeout;

      if (isVisible) {
        interval = setInterval(() => {
          setCount((prev) => Math.min(prev + 1, targetValue));
        }, 10);

        timeout = setTimeout(() => {
          clearInterval(interval);
        }, 5000);
      }

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }, [isVisible, targetValue]);

    return count;
  };

  const observerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  // Array for image paths
  const imagePaths = [
    skincard1,
    skincard5,
    skincard3,
    skincard2,
    skincard8,
    skincard9,
    skincard4,
    skincard7, // duplicate images to have 8
  ];

  return (
    <div ref={observerRef} className="bg-pink-50 text-pink-900 py-16 px-6 overflow-hidden">
      {/* Stats Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-30 mt-15">
        {stats.map((item, index) => {
          const animatedCount = useCountUp(item.count, isVisible);
          return (
            <div key={index} className="animate-fadeInUp delay-[200ms]">
              <div className="bg-white w-27 h-23 mx-auto flex items-center justify-center rounded-xl shadow transform transition-transform duration-300 hover:scale-105 hover:bg-pink-200 mb-6">
                <div className="text-3xl font-bold text-pink-700">
                  {animatedCount}
                  {item.suffix && (
                    <span className="text-xl text-pink-600 ml-1">
                      {item.suffix}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-2xl font-medium text-pink-600">{item.label}</div>
              <p className="text-base text-gray-700 mt-2">{item.description}</p>
            </div>
          );
        })}
      </div>

      {/* Image Section with 8 images */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {imagePaths.map((imgPath, i) => (
          <div
            key={i}
            className="bg-pink-200 rounded-lg overflow-hidden animate-zoomIn delay-[300ms]"
          >
            <div className="aspect-square flex items-center justify-center">
              <img
                src={imgPath} // Using the path from the imagePaths array
                alt={`Image ${i + 1}`} // Alt text for accessibility
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountDiseaseSection;
