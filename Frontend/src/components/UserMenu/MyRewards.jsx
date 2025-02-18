import React,{useState} from 'react';
import { ArrowLeft, HelpCircle, Circle, Copy } from 'lucide-react';


const RewardsPanel = (props) => {
    const expiryDate = new Date (props.Coupon.cuponExpiry).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  const handleCopyCode = () => {
    navigator.clipboard.writeText(props.Coupon.cuponCode);
  };



  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-sky-400 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <ArrowLeft onClick={() => props. toggleRewardPanel(false)} className="w-6 h-6 mr-2" />
          <h1 className="text-xl font-semibold">My Rewards</h1>
        </div>
        <div onClick={() => {props.toggleRewardPanel(false);props.toggleContact(true)}} className="flex items-center bg-white px-3 py-1 rounded-full">
          <HelpCircle className="w-5 h-5 text-gray-600" />
          <span className="ml-1 text-gray-600">Help</span>
        </div>
      </div>

      {/* Rewards Summary Card */}
      <div className="bg-white rounded-lg shadow-sm mb-6 p-4">
        <div className="flex justify-between">
          <div className="flex-1 border-r border-gray-200">
            <div className="text-gray-600 mb-2">Coin rewards</div>
            <div className="flex items-center">
              <span className="text-2xl font-semibold mr-1">0</span>
              <div className="w-5 h-5 bg-amber-400 rounded-full"></div>
            </div>
          </div>
          <div className="flex-1 pl-8">
            <div className="text-gray-600 mb-2">Vouchers</div>
            <div className="text-2xl font-semibold">1</div>
          </div>
        </div>
      </div>

      {/* Coupon Code Card */}
      <div className="bg-white rounded-lg shadow-sm w-full mb-6 p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-gray-600 mb-1">Available Coupon</div>
            <div className="text-xl font-bold text-amber-500">{props.Coupon.cuponCode}</div>
            <div className="text-sm text-gray-500">20% off on your next purchase</div>

          </div>
          <button
            onClick={handleCopyCode}
            className="flex items-center bg-amber-50 text-amber-600 px-4 py-2 rounded-lg hover:bg-amber-100"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Code
          </button>

        </div>
        <div className="inline-block px-4 py-1 rounded-full border border-red-500 text-red-500 text-sm mt-2">
        {expiryDate}

        </div>
      </div>

      {/* Reward Card */}

    </div>
  );
};

export default RewardsPanel;