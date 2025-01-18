import React, { createContext, useState, useEffect } from 'react';

export const CaptainDataContext = createContext();

function CaptainContext({ children }) {
  const [captain, setCaptain] = useState({
    email: '',
    fullName: {
      firstName: '',
      lastName: '',
    },
    vehicle: {
      color: '',
      plate: '',
      capacity: 0,
      vehicleType: '',
    },
    status: 'offline',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch current data when the component mounts
  useEffect(() => {
    const fetchCaptainData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Replace this with your actual API endpoint
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch captain data');
        }

        const data = await response.json();

        // Update the captain state with fetched data
        setCaptain(data);

        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCaptainData();
  }, []);

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain, isLoading, error }}>
      {children}
    </CaptainDataContext.Provider>
  );
}

export default CaptainContext;
