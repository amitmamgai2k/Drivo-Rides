import React, { useState, useRef,useEffect, useContext } from 'react';
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
  LayoutDashboard
} from 'lucide-react';
import Profile from './MyProfile';
import About from '../UserMenu/About';
import Support from '../UserMenu/Support';
import RideHistory from './RideHistory';
import Feedback from '../UserMenu/Feedback';
import Refer from '../UserMenu/ReferAndEarn';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CaptainDataContext } from '../../context/CaptainContext';



function DropdownMenu({ isOpen, toggleMenu }) {
  const {captain} =useContext(CaptainDataContext);
  const navigate = useNavigate();
  const [userData, setuser] = useState(null)
  const [showProfile, setShowProfile] = useState(false);
  const [about, setAbout] = useState(false);
  const[ContactUs,setContactUs]= useState(false);
  const [rideHistory, setRideHistory] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [refer, setRefer] = useState(false);
  const [rideHistoryData, setRideHistoryData] = useState([]);

  console.log('User',captain);






  useEffect(() => {
    if (captain) {
      setuser(captain);
    }
  }, [captain]);

  if (!isOpen) return null;
  const getRideHistory =async ()=>{
    try {

const userId = captain.captain?._id;
console.log("captain id",userId);


      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/ride-history`, {userId} , {

        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 200) {
        toast.success('Ride history fetched successfully');
        setRideHistoryData([response.data]);
        console.log('rideHistory',rideHistoryData);

        console.log('rideHistory',response.data); // "Ride History"

      }
    } catch (error) {
      toast.error('Failed to fetch ride history');
      console.error('Error during fetching rides:', error);
    }

  }

  const menuItems = [
    { icon: CircleUserRound, label: 'My Profile', action: () => setShowProfile(true), textColour: 'text-red-600', background: 'bg-red-100' },
    { icon: LayoutDashboard, label: 'Dashboard', action: () =>  navigate('/captain-dashboard' ), textColour: 'text-pink-800', background: 'bg-pink-100' },
    { icon: AppWindowMac, label: 'About', action: () => setAbout(true), textColour: 'text-blue-600', background: 'bg-blue-100' },

    { icon: Contact, label: 'Contact', action: () => setContactUs(true), textColour: 'text-green-600', background: 'bg-green-100' },
    { icon: History, label: 'Past Rides', action: () => { setRideHistory(true); getRideHistory(); }, textColour: 'text-yellow-600', background: 'bg-yellow-100' },
    { icon: MessagesSquare, label: 'Feedback', action: () => setFeedback(true), textColour: 'text-purple-600', background: 'bg-purple-100' },
    { icon: Wallet, label: 'Refer And Earn', action: () => setRefer(true), textColour: 'text-orange-600', background: 'bg-orange-100' },

];

  console.log('User data:', userData);




  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('No token found');
        navigate('/captain-login');
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/logout`,
        {}, // Empty body as we're sending token in headers
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        // Clear local storage first
        localStorage.removeItem('token');
        toast.success('Logout successful');
        navigate('/captain-login');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      if (error.response?.status === 401) {
        // If unauthorized, clear token and redirect anyway
        localStorage.removeItem('token');
        navigate('/captain-login');
      }
      toast.error(error.response?.data?.error || 'Logout failed');
    }
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
              src={captain.captain?.ProfilePicture}
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-white"
            />
            <div onClick={() => setShowProfile(true)}>
              <p className="font-semibold">{captain.captain?.fullname?.firstname} {captain.captain?.fullname?.lastname}</p>
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
                <item.icon size={40} className={` text-gray-600 ${item.background} ${item.textColour} font-semibold p-2 rounded-lg`}  />
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
       >

        <Profile
          toggleProfile={toggleProfile}
          showProfile={showProfile}
          userData={userData}
        />
        </div>

      )}
     {about && (
        <div
        className="fixed  bg-black bg-opacity-50 z-30"
      >

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
          rideHistoryData = {rideHistoryData}
         History={rideHistory}
          userData={userData}
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
