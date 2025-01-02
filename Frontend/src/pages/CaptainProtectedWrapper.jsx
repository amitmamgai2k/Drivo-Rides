import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner'; // Import the loader spinner

const CaptainProtectedWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [captain, setCaptain] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/captain-login');
      return; // If no token, prevent further execution
    }

    // Fetch captain data after checking the token
    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setCaptain(response.data);
        setIsLoading(false); // Stop loading once the data is fetched
      })
      .catch((error) => {
        console.error(error);
        localStorage.removeItem('token');
        navigate('/captain-login');
      });
  }, [token, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Oval
          height={40}
          width={40}
          color="#3498db"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#f3f3f3"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    ); // Show spinner while loading
  }

  return (
    <div>
      {children} {/* Render children after loading */}
    </div>
  );
};

export default CaptainProtectedWrapper;
