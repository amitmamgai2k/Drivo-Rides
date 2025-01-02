import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import{useNavigate} from 'react-router-dom';
import axios from 'axios';

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});
  const [colour, setVehicleColour] = useState('');
  const [plate, setVehiclePlate] = useState('');
  const [capacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const { captain, setCaptain } = useContext(CaptainDataContext);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: colour,
        plate: plate,
        capacity: capacity,
        vehicleType: vehicleType
      },
    };

    console.log('Submitting Captain Data:', captainData);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);

      if (response.status === 201) {
        console.log('Registration successful:', response.data);
        setCaptain(response.data);
        localStorage.setItem('token', response.data.token);

        navigate('/captain-home');

        // Reset input fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setVehicleColour('');
        setVehiclePlate('');
        setVehicleCapacity('');
        setVehicleType('');
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };



  return (
    <div className="min-h-screen bg-white px-4 pt-8">
      <img
        className="w-16 mb-2"
        src="https://www.svgrepo.com/show/505031/uber-driver.svg"
        alt="Uber Logo"
      />

      <form onSubmit={(e) => {
            submitHandler(e)
          }}>
        <div className="space-y-6">
          {/* User Information Fields */}
          <div>
            <label className="block font-semibold text-lg mb-2">Enter Your Full Name</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full px-4 py-3  border-2 rounded bg-gray-100 focus:outline-none"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-full px-4 border-2 py-3 rounded bg-gray-100 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">Enter Your Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-full px-4 py-3 rounded border-2 bg-gray-100 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-lg mb-2 font-semibold ">Enter Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded border-2 bg-gray-100 focus:outline-none"
            />
          </div>

          {/* Vehicle Information Fields */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Vehicle Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-lg mb-2 font-mono">Vehicle Color</label>
                <input
                  type="text"
                  value={colour}
                  onChange={(e) => setVehicleColour(e.target.value)}
                  placeholder="Vehicle Color"
                  className="w-full px-4 py-3 rounded border-2 bg-gray-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-lg mb-2 font-mono">Vehicle Plate</label>
                <input
                  type="text"
                  value={plate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                  placeholder="Vehicle Plate"
                  className="w-full px-4 py-3 rounded border-2 bg-gray-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-lg mb-2  font-mono">Vehicle Capacity</label>
                <input
                  type="number"
                  value={capacity}
                  onChange={(e) => setVehicleCapacity(e.target.value)}
                  placeholder="Vehicle Capacity"
                  className="w-full px-4 py-3 rounded border-2 bg-gray-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-lg mb-2  font-mono">Vehicle Type</label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full px-4 py-3 rounded border-2 bg-gray-100 focus:outline-none"
                >
                  <option value="">Select Vehicle Type</option>
                  <option value="car">Car</option>
                  <option value="auto">Auto</option>
                  <option value="motorcycle">MotorCycle</option>
                  <option value="van">Van</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg text-lg font-normal mt-4"
          >
            Create Captain Account
          </button>

          <div className="text-center mt-4">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/captain-login" className="text-blue-500">
              Login here
            </Link>
          </div>

          <div>
            <p className="text-[10px] leading-tight mt-2 mb-5">
              This site is protected by reCAPTCHA and the{' '}
              <span className="underline">Google Privacy Policy</span> and{' '}
              <span className="underline">Terms of Service apply</span>.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CaptainSignup
