import React, { useState, useEffect, useRef } from 'react';

const CountDiseaseSection = () => {
  const stats = [
    { count: 22, label: 'Health Sections' },
    { count: 146, label: 'Different Services' },
    { count: 388, label: 'Blood Donations' },
    { count: 1280, label: 'Satisfied Patients' },
  ];

  // Custom hook for the count animation with time limit
  const useCountUp = (targetValue, isVisible) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let interval;
      let timeout;

      if (isVisible) {
        interval = setInterval(() => {
          setCount(prev => Math.min(prev + 1, targetValue));
        }, 10);

        timeout = setTimeout(() => {
          clearInterval(interval);
        }, 5000); // Stop counting after 5 seconds
      }

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }, [isVisible, targetValue]);

    return count;
  };

  // Intersection Observer logic to trigger when the section is in view
  const observerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 } // Trigger when 50% of the section is in view
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

  return (
    <div
      ref={observerRef}
      className="bg-pink-50 text-pink-900 py-16 px-6 overflow-hidden"
    >
      {/* Count section with white box behind number */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-30 mt-15">
        {stats.map((item, index) => {
          const animatedCount = useCountUp(item.count, isVisible);
          return (
            <div
              key={index}
              className="animate-fadeInUp delay-[200ms]"
            >
              <div className="flex justify-center mb-2">
                <div
                  className="bg-white px-7 py-7 rounded-xl shadow text-3xl font-bold text-pink-700 transform transition-transform duration-300 hover:scale-105 hover:bg-pink-200"
                >
                  {animatedCount}
                </div>
              </div>
              <div className="text-xl font-medium">{item.label}</div>
              <p className="text-lg text-pink-600 mt-1">
                Ut wisi enim ad minim veniam, quis laore et iusto exerci tation.
              </p>
            </div>
          );
        })}
      </div>

      {/* Images Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-pink-200 rounded-lg overflow-hidden animate-zoomIn delay-[300ms]"
          >
            <div className="aspect-square flex items-center justify-center text-pink-900 font-bold text-lg">
              img{i + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountDiseaseSection;
