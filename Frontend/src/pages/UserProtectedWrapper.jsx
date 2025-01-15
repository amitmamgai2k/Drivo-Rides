import React, { useState, useEffect,useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner'; // Import the loader spinner
import axios from 'axios';

const UserProtectedWrapper = ({ children }) => {
  const {user,setUser} = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/user-login');
    }

    // Fetch user data after checking the token
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setUser(response.data);
        setIsLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token');
        setIsLoading(false); // Set loading to false in case of an error
        navigate('/user-login');
    })
  }, [token]);

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

  return <>{children}</>; // Render children once the loading is complete
};

export default UserProtectedWrapper;
