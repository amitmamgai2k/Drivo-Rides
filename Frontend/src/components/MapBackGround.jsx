import React, { useEffect } from "react";

const MapBackground = ({ panelOpen, setVehiclePanel }) => {
  useEffect(() => {
    const loadMapplsScript = () => {
      if (!document.getElementById("mappls-sdk")) {
        const script = document.createElement("script");
        script.id = "mappls-sdk";
        const apiKey = import.meta.env.VITE_MAP_API_KEY;
        script.src = `https://apis.mappls.com/advancedmaps/api/${apiKey}/map_sdk?layer=vector&v=3.0`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          console.log("Mappls SDK loaded successfully");
          initializeMap();
        };
        script.onerror = () => {
          console.error("Failed to load Mappls SDK");
        };
        document.body.appendChild(script);
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      if (window.mappls && document.getElementById("map-container")) {
        new window.mappls.Map("map-container", {
          center: [28.638698386592438, 77.27604556863412], // Example coordinates
          zoom: 12, // Zoom level
          zoomControl: false, // Disable zoom controls
          scaleControl: false, // Disable scale control
          location: false, // Disable current location marker
          logo: false, // Remove Mappls logo
          attributionControl: false, // Remove attribution
          fullscreenControl: false, // Disable fullscreen control
        });
        console.log("Map initialized with custom settings");
      } else {
        console.error("Mappls SDK not loaded or map container missing");
      }
    };

    loadMapplsScript();
  }, []); // Runs once when the component mounts

  return (
    <div
      onClick={() => setVehiclePanel(false)}
      className={`h-full w-full transition-opacity duration-300 ${
        panelOpen ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        id="map-container"
        className="w-full h-full object-cover"
        style={{ zIndex: 0 }}
      ></div>
    </div>
  );
};

export default MapBackground;
