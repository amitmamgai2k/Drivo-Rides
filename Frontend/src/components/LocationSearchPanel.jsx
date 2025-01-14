import React from 'react';
import { MapPin } from 'lucide-react';
const LocationSearchPanel = ({ suggestions = [], setPickup, setDrop, activeField, setPanelOpen, setVehiclePanel }) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion); // Set the selected suggestion as pickup
    } else if (activeField === 'destination') {
      setDrop(suggestion); // Set the selected suggestion as drop
    }
    setPanelOpen(false);
    setVehiclePanel(true);
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Suggested Locations</h3>
      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
          >
            <MapPin className="h-5 w-5 text-gray-500" />
            <div>
              <p className="font-medium">{suggestion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationSearchPanel;
