import React from 'react';
import { ArrowLeft, UserRound, Phone, Mail, Calendar, Camera, Edit2, LogOut,ChevronRight } from 'lucide-react';

const Profile = ({ showProfile, toggleProfile }) => {
  if (!showProfile) return null;

  return (
    <div className="fixed inset-0 bg-white z-30 overflow-auto animate-in slide-in-from-right">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={() => toggleProfile(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">My Profile</h1>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          <div className="relative group">
            <img
              src="http://res.cloudinary.com/ddjo2iypg/image/upload/v1737633957/ngsx07ii8wlz703xbfud.jpg"
              alt="Amit Mamgai"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <button className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white shadow-lg hover:bg-blue-600 transition-colors">
              <Camera size={18} />
            </button>
          </div>

          {/* Name Section */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-2xl font-bold text-gray-900">Amit Mamgai</h2>
              <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                <Edit2 size={16} className="text-gray-500" />
              </button>
            </div>
            <p className="text-gray-500 mt-1">Personal Account</p>
          </div>

          {/* Info Cards */}
          <div className="w-full mt-8 space-y-1">
            <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Mail className="text-blue-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">amitmamgai2k@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Phone className="text-green-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900">+91 7011343807</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <UserRound  className="text-purple-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="text-gray-900">Male</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Calendar className="text-orange-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-gray-900">January 2024</p>
                </div>
              </div>
            </div>

    <div className="  mt-2 border-t">
            <button

              className="w-full flex items-center justify-between px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-4 ">
                <div className=' bg-pink-200 rounded-lg p-2'> <LogOut className="w-5 h-5" /></div>

                <span>Delete Account</span>
              </div>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;