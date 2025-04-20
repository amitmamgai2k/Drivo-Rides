import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../Redux/Slices/AdminDashBoardData';
import { AlertTriangle, Trash2 } from 'lucide-react';

function DeleteUser() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmation, setConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = location.state || {};

  const handleDelete = () => {
    if (!isConfirmed) return;

    setIsLoading(true);
    dispatch(deleteUser(userId));

    setTimeout(() => {
      setIsLoading(false);
      navigate('/admin-dashboard');
    }, 3000);
  };

  const isConfirmed = confirmation.toLowerCase() === 'delete';

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <h1 className="text-2xl font-bold text-center mb-6 text-red-600">
        Delete User Account
      </h1>

      {/* Warning Card */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-start mb-3">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
          <h2 className="text-lg font-semibold text-red-700">
            Warning
          </h2>
        </div>

        <p className="text-gray-700 mb-4">
          This action cannot be undone. This will permanently delete the captain's account and remove all data from our servers.
        </p>

        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>All User's personal information will be deleted</li>
          <li>Their profile and settings will be removed</li>
          <li>Associated team data may be affected</li>
          <li>This account cannot be recovered after deletion</li>
        </ul>
      </div>

      {/* Confirmation Input */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2 font-medium">
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

      {/* Action Buttons */}
      <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
        <button
          onClick={handleDelete}
          disabled={!isConfirmed || isLoading}
          className={`flex items-center justify-center px-4 py-2 rounded-lg font-medium ${
            isConfirmed && !isLoading
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          } transition-colors w-full sm:w-1/2`}
        >
          {isLoading ? (
            <>
              <span className="mr-2">Deleting...</span>
            </>
          ) : (
            <>
              <Trash2 className="w-4 h-4 mr-2" />
              <span>Delete User Account</span>
            </>
          )}
        </button>

        <Link
          to="/admin-dashboard"
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors text-center w-full sm:w-1/2"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}

export default DeleteUser;