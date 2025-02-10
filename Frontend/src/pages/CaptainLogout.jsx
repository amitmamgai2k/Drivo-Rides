import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function CaptainLogout() {
  const navigate = useNavigate();
  try {
    const token = localStorage.getItem('token');

  axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then((response) => {
    if (response.status === 200) {
      toast.success('Logout successful');
      localStorage.removeItem('token');
      navigate('/captain-login');
    }
  });
  } catch (error) {
    toast.error('Logout failed');

  }

  return (
    <div>
    </div>
  );
}

export default CaptainLogout;