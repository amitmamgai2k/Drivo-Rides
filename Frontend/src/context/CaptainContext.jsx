import React, { createContext, useState } from 'react';

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
    status: 'offline'
  });

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  );
}

export default CaptainContext;