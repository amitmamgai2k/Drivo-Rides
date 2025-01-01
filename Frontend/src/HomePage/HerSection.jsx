// HeroSection.js
import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-white flex flex-col md:flex-row items-center justify-between px-6 py-6 gap-32 md:py-20 md:px-16">
      {/* Left Section */}
      <div className="w-full md:w-1/2 mb-12 md:mb-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Go anywhere with <span className="text-black">Uber</span>
        </h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            aria-label="Ride Option"
            className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            <span className="text-xl">🚗</span>
            <span className="font-semibold">Ride</span>
          </button>
          <button
            aria-label="Courier Option"
            className="flex items-center space-x-2 px-4 py-2 text-gray-500 hover:text-black"
          >
            <span className="text-xl">📦</span>
            <span className="font-semibold">Courier</span>
          </button>
        </div>

        {/* Input Fields */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3">
            <span className="text-sm text-black">Pickup location</span>
            <button
              aria-label="Set pickup location"
              className="ml-auto text-gray-500 hover:text-black"
            >
              ➤
            </button>
          </div>
          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3">
            <span className="text-sm text-black">Dropoff location</span>
          </div>
        </div>

        {/* Date and Time */}
        <div className="flex space-x-4 mb-6">
          <button
            aria-label="Set pickup date"
            className="flex items-center space-x-2 bg-gray-100 px-4 py-3 rounded-lg hover:bg-gray-200"
          >
            <span>📅</span>
            <span>Today</span>
          </button>
          <button
            aria-label="Set pickup time"
            className="flex items-center space-x-2 bg-gray-100 px-4 py-3 rounded-lg hover:bg-gray-200"
          >
            <span>🕒</span>
            <span>Now</span>
          </button>
        </div>

        {/* Button */}
        <button className="bg-black text-white text-lg font-semibold px-6 py-3 rounded-lg hover:bg-gray-800">
          See prices
        </button>
      </div>

      {/* Right Section */}
      <div className="w-full  md:w-1/2">
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d64062.603396409286!2d77.05049921090873!3d28.531332225397012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1735626786526!5m2!1sen!2sin"
          width="100%"
          height="450"
          className="rounded-lg"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default HeroSection;
