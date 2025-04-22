import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Doc1 from './../assets/HomeImg/Doc1.jpg';
import Doc2 from './../assets/HomeImg/Doc2.jpg';
import Doc3 from './../assets/HomeImg/Doc3.jpg';

const testimonials = [
  {
    name: 'Dr. Anthony Fauci',
    role: 'Immunologist, Director of NIAID',
    text: 'Public health is not just about fighting disease, but also empowering people to take control of their health through education, prevention, and early detection.',
    images: [Doc1, Doc2, Doc3],
  },
  {
    name: 'Dr. Paul Farmer',
    role: 'Physician, Anthropologist',
    text: 'The idea that some lives matter less is the root of all that is wrong with the world.',
    images: [Doc2, Doc1, Doc3],
  },
  {
    name: 'Dr. Sanjay Gupta',
    role: 'Neurosurgeon, Medical Correspondent',
    text: 'We are our brains. It\'s the most important organ in our body and one that needs more care than we often give it.',
    images: [Doc3, Doc1, Doc2],
  },
  {
    name: 'Dr. Atul Gawande',
    role: 'Surgeon, Writer',
    text: 'The secret to living a long life is to continue to learn and to stay curious about the world around you.',
    images: [Doc1, Doc3, Doc2],
  },
  {
    name: 'Dr. Deepak Chopra',
    role: 'Physician, Author, Speaker',
    text: 'In the process of healing, it’s important to know that the mind and body are not separate entities but are inextricably connected.',
    images: [Doc2, Doc3, Doc1],
  },
];

const SliderSection = () => {
  return (
    <div className="bg-[#ffeef5] py-20 px-4 relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop={true}
        className="max-w-4xl mx-auto"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="text-center">
              {/* Images Row */}
              <div className="flex justify-center gap-6 mb-8">
                {testimonial.images.map((img, i) => (
                  <div key={i} className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-lg">
                    <img src={img} alt={`Doctor Image ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-xl text-black max-w-3xl mx-auto mb-6">
                {testimonial.text}
              </p>

              {/* Quote and Name Section */}
              <div className="mb-4">
              
                <div className="text-pink-600 text-2xl font-semibold">{testimonial.name}</div>
                <div className="text-md text-gray-800">{testimonial.role}</div><br></br>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Arrows */}
        <div className="custom-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-pink-500 text-4xl px-3">
          ‹
        </div>
        <div className="custom-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-pink-500 text-4xl px-3">
          ›
        </div>
      </Swiper>
    </div>
  );
};

export default SliderSection;
