import React, { useState, useRef,useEffect } from 'react';
import {
  CircleUserRound,
  Contact,
  History,
  MessagesSquare,
  Wallet,
  AppWindow as AppWindowMac,
  LogOut,
  ArrowLeft,
  ChevronRight,
} from 'lucide-react';
import Profile from './MyProfile';
import About from './About';
import Support from './Support';
import RideHistory from './RideHistory';
import Feedback from './Feedback';
import Refer from './ReferAndEarn';


function DropdownMenu({ isOpen, toggleMenu }) {
  const [showProfile, setShowProfile] = useState(false);
  const [about, setAbout] = useState(false);
  const[ContactUs,setContactUs]= useState(false);
  const [rideHistory, setRideHistory] = useState(false)
  const [feedback, setFeedback] = useState(false)
  const [refer, setRefer] = useState(false)

  if (!isOpen) return null;

  const menuItems = [
    { icon: CircleUserRound, label: 'My Profile', action: () => setShowProfile(true) },
    { icon: AppWindowMac, label: 'About', action: () => setAbout(true) },
    { icon: Contact, label: 'Contact', action: () => setContactUs(true) },
    { icon: History, label: 'Past Rides', action: () => setRideHistory(true) },
    { icon: MessagesSquare, label: 'Feedback', action: () => setFeedback(true) },
    { icon: Wallet, label: 'Refer And Earn', action: () => setRefer(true) },
  ];


  const handleLogout = () => {
    console.log('Logging out...');
    toggleMenu(false);
  };
  const toggleProfile = (state) => {
    setShowProfile(state !== undefined ? state : !showProfile); // Toggle menu state
  };
  const toggleAbout = (state) => {
    setAbout(state !== undefined ? state : !about); // Toggle menu state
  };
  const toggleContact = (state) => {
    setContactUs(state !== undefined ? state : !ContactUs); // Toggle menu state
  };
  const toggleRideHistory = (state) => {
    setRideHistory(state !== undefined ? state : !rideHistory); // Toggle menu state
  }
  const toggleFeedback = (state) => {
    setFeedback(state !== undefined ? state : !feedback); // Toggle menu state
  }
  const toggleRefer = (state) => {
    setRefer(state !== undefined ? state : !refer); // Toggle menu state
  }
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-10"
        onClick={() => toggleMenu(false)}
      />

      {/* Menu */}
      <div className="fixed top-0 left-0 bg-white w-[300px] h-screen z-20 shadow-2xl transform transition-transform">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6">
          <div className="flex items-center space-x-3 mb-6">
            <button onClick={() => toggleMenu(false)} className="hover:bg-blue-700 p-2 rounded-full transition-colors">
              <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl font-semibold">Menu</h2>
          </div>

          <div className="flex items-center space-x-4">
            <img
              src="http://res.cloudinary.com/ddjo2iypg/image/upload/v1737633957/ngsx07ii8wlz703xbfud.jpg"
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-white"
            />
            <div>
              <p className="font-semibold">Amit Mamgai</p>
              <p className="text-sm text-blue-100">View Profile</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full flex items-center justify-between px-6 py-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <item.icon className="w-5 h-5 text-gray-600 font-semibold" />
                <span className="text-gray-700">{item.label}</span>
              </div>
            </button>
          ))}

          {/* Profile Section */}

          {/* Logout Button */}
          <div className="px-6 pt-4 mt-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-4">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </div>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      {showProfile && (
        <div
        className="fixed inset-0 bg-black bg-opacity-50 z-30"
        onClick={() => toggleProfile(false)}>

        <Profile
          toggleProfile={toggleProfile}
          showProfile={showProfile}
        />
        </div>

      )}
     {about && (
        <div
        className="fixed  bg-black bg-opacity-50 z-30"
        onClick={() => toggleAbout(false)}>

        <About
          toggleAbout={toggleAbout}
          About={about}
        />
        </div>

      )}
       {ContactUs && (
        <div
        className="fixed  bg-black bg-opacity-50 z-30"
      >

        <Support
          toggleContact={toggleContact}
         Contact ={ContactUs}
        />
        </div>

      )}
        {rideHistory && (
        <div
        className="fixed  bg-black bg-opacity-50 z-30"
      >

        <RideHistory
          toggleRideHistory={toggleRideHistory}
         History={rideHistory}
        />
        </div>

      )}
       {feedback  && (
        <div
        className="fixed  bg-black bg-opacity-50 z-30"
      >

        <Feedback
          toggleFeedback={toggleFeedback}
         feedback={feedback}
        />
        </div>

      )}
{refer && (
        <div
        className="fixed  bg-black bg-opacity-50 z-30"
      >

        <Refer
          toggleRefer={toggleRefer}
         refer={refer}
        />
        </div>

      )}






    </>
  );
}

export default DropdownMenu;
