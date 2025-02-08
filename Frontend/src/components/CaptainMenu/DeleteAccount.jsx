import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const DeleteAccount = () => {
  const navigate = useNavigate();
  const [confirmation, setConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);












  const handleDelete = async () => {
    setIsLoading(true);
    const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/captains/delete`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    try{
    if (response.status === 200) {
      localStorage.removeItem('token');
       toast.success('Account deleted successfully');

      navigate('/');
    }
}catch(error){
  toast.error('Failed to delete account');
  console.log("Error in deleting account",error);

}

    // Add your delete account logic here
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  const isConfirmed = confirmation.toLowerCase() === 'delete';

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <div className="max-w-md mx-auto p-6">
        {/* Header */}
        <div className="mb-8">

          <h1 className="text-2xl font-bold text-gray-900">Delete Account</h1>
        </div>

        {/* Warning Card */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
            <h2 className="text-lg font-semibold text-red-700">Warning</h2>
          </div>
          <p className="text-red-600 mb-4">
            This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
          </p>
          <ul className="list-disc list-inside text-red-600 space-y-2">
            <li>All your personal information will be deleted</li>
            <li>Your profile and settings will be removed</li>
            <li>You won't be able to recover your account</li>
          </ul>
        </div>

        {/* Confirmation Input */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type "delete" to confirm
          </label>
          <input
            type="text"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
            placeholder="delete"
          />
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
           disabled={!isConfirmed || isLoading}
          className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
            isConfirmed && !isLoading
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Trash2 size={20} />
          {isLoading ? 'Deleting...' : 'Delete Account'}
        </button>

        {/* Cancel Button */}
        <Link
          to="/home"

          className="flex items-center justify-center w-full mt-4 py-3 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default DeleteAccount;