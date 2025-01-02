import React from 'react';
import { Link } from 'react-router-dom';

const Start = () => {
    return (
        <div>
          <div className='bg-cover bg-center  bg-[url(https://ideogram.ai/assets/progressive-image/balanced/response/4gdzODBIRcycV70sjXf3MQ)] h-screen w-full pt-7  bg-red-400 flex flex-col justify-between'>
            <img className='w-20 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1200px-Uber_logo_2018.png" alt="" />
            <div className='bg-white py-5 px-10 pb-7 text-2xl font-bold text-center'>
                <h2>Get Started with Uber</h2>
                <Link to='/user-login' className=' flex items-center justify-center w-full font-light font-mono bg-black text-white py-3 rounded-lg mt-2 text-center'>Continue </Link>
            </div>
          </div>
        </div>
    );
};

export default Start;