import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import axios from "axios";

// Fix default icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapBackGround = ({ panelOpen, setVehiclePanel, pickup, drop, vehiclePanel }) => {
  const mapRef = useRef(null);
  const routingRef = useRef(null);
  const containerRef = useRef(null);
  const currentLocationMarkerRef = useRef(null);
  const markersRef = useRef([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [captains, setCaptains] = useState([]);

  const fetchNearbyCaptains = async (lat, lng) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/maps/nearby`,
        { latitude: lat, longitude: lng, radius: 50 },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (response.data && Array.isArray(response.data.data)) {
        setCaptains(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching captains:", error);
    }
  };

  useEffect(() => {
    if (!mapRef.current && containerRef.current) {
      mapRef.current = L.map(containerRef.current, {
        center: [28.6139, 77.209],
        zoom: 13,
        zoomControl: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(mapRef.current);

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation([latitude, longitude]);
            mapRef.current.setView([latitude, longitude], 15);
            if (currentLocationMarkerRef.current) {
              currentLocationMarkerRef.current.remove();
            }
            currentLocationMarkerRef.current = L.marker([latitude, longitude])
              .addTo(mapRef.current)
              .bindPopup("Your Location")
              .openPopup();

            L.circle([latitude, longitude], {
              radius: position.coords.accuracy,
              color: "#3b82f6",
              fillColor: "#3b82f6",
              fillOpacity: 0.15,
            }).addTo(mapRef.current);

            fetchNearbyCaptains(latitude, longitude);
          },
          (error) => console.error("Error getting location:", error),
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
      }
    }
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        currentLocationMarkerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    if (!mapRef.current || captains.length === 0) return;
    captains.forEach((captain) => {
      if (captain.latitude && captain.longitude) {
        const newMarker = L.marker([captain.latitude, captain.longitude], {
          icon: L.icon({
            iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
            iconSize: [30, 40],
            iconAnchor: [15, 40],
          }),
        }).addTo(mapRef.current).bindPopup(`Captain ${captain.name || ''}`);
        markersRef.current.push(newMarker);
      }
    });
  }, [captains]);

  useEffect(() => {
    const createRoute = async () => {
      if (!pickup || !drop || !vehiclePanel || !mapRef.current) return;
      try {
        const [pickupRes, dropRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-coordinates`, {
            params: { address: pickup },
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }),
          axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-coordinates`, {
            params: { address: drop },
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          })
        ]);

        const pickupCoords = [pickupRes.data.latitude, pickupRes.data.longitude];
        const dropCoords = [dropRes.data.latitude, dropRes.data.longitude];

        if (routingRef.current) routingRef.current.remove();

        routingRef.current = L.Routing.control({
          waypoints: [L.latLng(...pickupCoords), L.latLng(...dropCoords)],
          router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1', profile: 'driving' }),
          lineOptions: { styles: [{ color: 'green', weight: 6 }] },
          show: false,
          addWaypoints: false,
          draggableWaypoints: false,
          fitSelectedRoutes: true,
        }).addTo(mapRef.current);

        L.marker(pickupCoords).addTo(mapRef.current).bindPopup('Pickup Location').openPopup();
        L.marker(dropCoords).addTo(mapRef.current).bindPopup('Drop Location').openPopup();

        mapRef.current.fitBounds(L.latLngBounds([pickupCoords, dropCoords]), { padding: [50, 50] });
      } catch (error) {
        console.error("Error creating route:", error);
      }
    };
    if (vehiclePanel) createRoute();
  }, [vehiclePanel, pickup, drop]);

  return (
    <div onClick={() => setVehiclePanel(false)} className={`h-full w-full transition-opacity duration-300 ${panelOpen ? "opacity-0" : "opacity-100"}`}>
      <div ref={containerRef} className="w-full h-full" style={{ zIndex: 0 }} />
      <style>{`.leaflet-routing-container { display: none !important; }`}</style>
    </div>
  );
};

export default MapBackGround;
