import React from 'react';
import { MapPin } from 'lucide-react';

function LocationSearchPanel(props) {
  const locations = [
    { name: 'Downtown', description: 'City Center, Main Street' },
    { name: 'Airport', description: 'International Terminal' },
    { name: 'Shopping Mall', description: 'Central Mall, East Wing' },
    { name: 'Central Park', description: 'Large park in the city center' },
    { name: 'Museum of Art', description: 'Modern art collections' },
    { name: 'Beachside', description: 'Coastal area, great for swimming' },
    { name: 'Train Station', description: 'Main transit hub in the city' },
  ];

  return (
    <div className="p-5 bg-white rounded-lg shadow-md">
      <h5 className="text-lg font-semibold mb-4">Popular Locations</h5>
      <ul className="space-y-3 ">
        {locations.map((location, index) => (
          <li onClick={() =>{
            props.setVehiclePanel(true)
            props.setPanelOpen(false)}}
            key={index}
            className="p-3  border-2 active:border-black bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors flex items-start gap-3"
          >
            <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
            <div >
              <div className="font-medium">{location.name}</div>
              <div className="text-sm text-gray-500">{location.description}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocationSearchPanel;