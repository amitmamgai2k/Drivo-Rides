import { useState, useRef,useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';

const OTPPage = () => {
  const [otp, setOtp] = useState(new Array(4).fill(''));
  const inputsRef = useRef([]);
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Initialize useLocation
  const email = location.state?.email || '';
  const newPassword = location.state?.password || '';
  useEffect(() => {
    if (!email) {
      // Redirect back to Forgot Password if email is not present
      navigate("/forgot-password");
    }
  }, [email, navigate]);
  const handleChange = (index, e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value) {
      const newOtp = [...otp];
      newOtp[index] = value.substring(value.length - 1);
      setOtp(newOtp);

      if (index < otp.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    console.log("Entered OTP:", enteredOtp);

    if (enteredOtp.length === otp.length) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/verify-otp`,
          {email, enteredOtp,newPassword}
        );

        if (response.status === 200) {
          // OTP verification successful
          console.log('OTP verified successfully');
          alert('OTP verified successfully! Redirecting to login page...');
          navigate('/user-login'); // Redirect to login page
        }
      } catch (error) {
        console.error('OTP verification failed:', error);
        alert(
          error.response?.data?.error ||
            'Failed to verify OTP. Please try again.'
        );
      }
    } else {
      alert('Please fill all OTP digits');
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '');
    const pasteArray = pasteData.split('').slice(0, otp.length);

    if (pasteArray.length === otp.length) {
      setOtp(pasteArray);
      inputsRef.current[otp.length - 1].focus();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          OTP Verification
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Enter the 4-digit code sent to your email
        </p>

        <form onSubmit={handleSubmit}>
          <div
            className="flex justify-center gap-3 mb-8"
            onPaste={handlePaste}
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => (inputsRef.current[index] = el)}
                className="w-16 h-16 text-3xl text-center border-2 border-gray-300 rounded-lg
                          focus:outline-none focus:border-blue-500 focus:ring-2 ring-blue-200
                          transition-all duration-200"
                autoFocus={index === 0}
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold
                     py-3 px-6 rounded-lg transition-colors duration-300"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPPage;
