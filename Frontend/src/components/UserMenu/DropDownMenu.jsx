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
} from 'lucide-react';
import Profile from './MyProfile';
import About from './About';
import Support from './Support';
import RideHistory from './RideHistory';
import Feedback from './Feedback';
import Refer from './ReferAndEarn';
import { UserDataContext } from '../../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';



function DropdownMenu({ isOpen, toggleMenu }) {
  const {user} =useContext(UserDataContext);
  const navigate = useNavigate();
  const [userData, setuser] = useState(null)
  const [showProfile, setShowProfile] = useState(false);
  const [about, setAbout] = useState(false);
  const[ContactUs,setContactUs]= useState(false);
  const [rideHistory, setRideHistory] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [refer, setRefer] = useState(false);
  const [rideHistoryData, setRideHistoryData] = useState([]);





  useEffect(() => {
    if (user) {
      setuser(user);
    }
  }, [user]);

  if (!isOpen) return null;
  const getRideHistory =async ()=>{
    try {

const userId = user.user?._id;

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/ride-history`, {userId} , {

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
    { icon: CircleUserRound, label: 'My Profile', action: () => setShowProfile(true) },
    { icon: AppWindowMac, label: 'About', action: () => setAbout(true) },
    { icon: Contact, label: 'Contact', action: () => setContactUs(true) },
    { icon: History, label: 'Past Rides', action: () => {setRideHistory(true); getRideHistory()} ,},
    { icon: MessagesSquare, label: 'Feedback', action: () => setFeedback(true) },
    { icon: Wallet, label: 'Refer And Earn', action: () => setRefer(true) },
  ];
  console.log('User data:', userData);




const handleLogout = async () => {

    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
           headers:{Authorization: `Bearer ${localStorage.getItem('token')}`} // Send cookies with the request
        });

        if (response.status === 200) {
            console.log(response.data.message); // "Logout successful"

            // Clear local storage or user state if used
            localStorage.removeItem('token');
            toast.success('Logout successful');

            // Redirect to login or home page
            navigate('/user-login');
        }
    } catch (error) {
        console.error('Error during logout:', error);
        toast.error('Logout failed');
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
              src={user.user?.ProfilePicture}
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-white"
            />
            <div onClick={() => setShowProfile(true)}>
              <p className="font-semibold">{user.user?.fullname?.firstname} {user.user?.fullname?.lastname}</p>
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
