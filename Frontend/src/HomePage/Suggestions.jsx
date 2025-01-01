// SuggestionsSection.js
import React from "react";

const suggestions = [
  {
    title: "Ride",
    description: "Go anywhere with Uber. Request a ride, hop in, and go.",
    image: "https://mobile-content.uber.com/launch-experience/ride.png", // Replace with your image URL
  },
  {
    title: "Reserve",
    description: "Reserve your ride in advance so you can relax on the day of your trip.",
    image: "https://mobile-content.uber.com/uber_reserve/reserve_clock.png", // Replace with your image URL
  },
  {
    title: "Courier",
    description: "Uber makes same-day item delivery easier and faster than ever",
    image: "https://cn-geo1.uber.com/static/mobile-content/Courier.png", // Replace with your image URL
  },
];


const SuggestionsSection = () => {
  return (
    <section className="bg-white py-6 px-6 md:px-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">Suggestions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-8">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-xl shadow-md p-4  flex  items-center justify-between"
          >
            <div>
            <h3 className="text-xl font-semibold mb-2">{suggestion.title}</h3>
            <p className="text-gray-600 mb-4">{suggestion.description}</p>
            <button className="bg-black text-white py-2 px-6 rounded-full hover:bg-gray-800">
              Details
            </button></div>
            <div>
            <img
              src={suggestion.image}
              alt={suggestion.title}
              className="w-24 h-24 mb-4"
            /></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuggestionsSection;
