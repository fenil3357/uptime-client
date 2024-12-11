import React from 'react';
import Typewriter from 'typewriter-effect'

const HomePage = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-12 text-center">
        Introducing <span className="text-blue-400">UPTIME</span>
      </h1>
      <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-center">
        {/* WE NOTIFY YOU WHEN YOUR WEBSITE GOES DOWN! */}
        <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString('WE NOTIFY YOU WHEN YOUR WEBSITE GOES DOWN!')
              .start()
          }}
          options={{
            delay: 80
          }}
        />
      </h2>

      <p className="text-lg md:text-xl text-gray-300 mb-10 text-center px-6 md:px-16 lg:px-32">
        The ultimate AI-powered website monitoring system. Track your website’s health with ease, efficiency, and precision.
      </p>
      <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        Get Started
      </button>
    </div>
  );
};

export default HomePage;
