import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Start = () => {
    return (
        <div>
          <div className='bg-cover bg-center  bg-[url(https://ideogram.ai/assets/image/lossless/response/LnGjk1BcR9q2JfLmiIvNIA)] h-screen w-full pt-7  flex flex-col justify-between'>
            <img className='ml-8' src={logo} alt="" height={80} width={150} />
            <div className='bg-white py-5 px-10 pb-7 text-2xl font-bold text-center'>
                <h2>Get Started with Drivo</h2>
                <Link to='/user-login' className=' flex items-center justify-center w-full font-light font-mono bg-black text-white py-3 rounded-lg mt-2 text-center'>Continue </Link>
            </div>
          </div>
        </div>
    );
};

export default Start;