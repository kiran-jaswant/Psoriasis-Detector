import React from 'react';

const HomeCardSection = () => {
  const features = [
    {
      title: 'Not Just Better Care, But A Better Experience',
      text: 'Ut wisi enim ad minim veniam, quis laore est usus legentis in iis qui facit eorum nostrud exerci tation ulm hedi corper tures suscipit lobortis',
    },
    {
      title: 'Serving All People Through Exemplary Care',
      text: 'Ut wisi enim ad minim veniam, quis laore est usus legentis in iis qui facit eorum nostrud exerci tation ulm hedi corper tures suscipit lobortis',
    },
    {
      title: 'Specialty Medicine with Compassion and Care',
      text: 'Ut wisi enim ad minim veniam, quis laore est usus legentis in iis qui facit eorum nostrud exerci tation ulm hedi corper tures suscipit lobortis',
    },
  ];

  return (
    <div className="w-full bg-pink-50 text-pink-900 overflow-hidden">

      {/* Features */}
      <section className="py-16 px-6 animate-fadeInUp">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-15 min-h-[260px] shadow-md hover:shadow-lg transition-all duration-300 animate-slideInUp delay-[200ms] mt-25"
            >
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-sm mb-6">{feature.text}</p>
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full transition duration-300">
                Learn More &rarr;
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Image + Text Section */}
      <section className="py-35 px-6 bg-pink-100 animate-fadeInUp delay-[400ms]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Image */}
          <div className="w-full lg:w-1/2 animate-slideInLeft delay-[500ms]">
            <div className="w-full h-auto bg-pink-300 rounded-xl p-4 flex justify-center items-center">
              <span className="text-pink-900 font-semibold text-lg">img1</span>
            </div>
          </div>

          {/* Text */}
          <div className="w-full lg:w-1/2 animate-slideInRight delay-[600ms]">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Laboratory Place <br />
              <span className="text-pink-700">In Medical Practice</span>
            </h2>
            <p className="mb-4 text-sm">
              Ut wisi enim ad minim veniam, quis laore nostrud exerci tation ulm hedi corper
              tures suscipit lobortis nisi ut aliquip erat volutpat autem vel eum iriure
              dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore
              eu feugiat nulla facilisis at vero eros et accumsan et iusto odio.
            </p>
            <p className="text-sm">
              Aliquip erat volutpat autem vel eum iriure dolor in hendrerit in vulputate velit
              esse molestie consequat, vel illum dolore aliquenean sit ametsis.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeCardSection;
