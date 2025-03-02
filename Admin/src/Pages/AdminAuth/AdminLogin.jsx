import { useState } from "react";
import { Login } from "../../Redux/Slices/AdminAuth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async(e)=>{
    e.preventDefault();
    if(!email || !password){
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const response = await dispatch(Login({email,password}));
      if(response.meta.requestStatus === 'fulfilled'){
        navigate('/admin-dashboard');
        setEmail("");
        setPassword("");
      }

    } catch (error) {
      toast.error("Invalid Credentials");
      console.log(error);



    }

  }



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 text-sm mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
