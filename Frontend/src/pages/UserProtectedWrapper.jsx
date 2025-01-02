import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner'; // Import the loader spinner

const UserProtectedWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const checkToken = () => {
      if (!token) {
        navigate('/user-login');
      } else {
        setIsLoading(false); // Stop loading when token check is done
      }
    };

    checkToken(); // Call the function to check token

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
    ); // Show the spinner while loading
  }

  return <div>{children}</div>; // Render children once the loading is complete
};

export default UserProtectedWrapper;
