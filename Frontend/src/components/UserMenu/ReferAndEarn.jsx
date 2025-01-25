import React, { useState } from 'react';
import {
  ArrowLeft,
  Gift,
  Share2,
  Users,
  DollarSign,
  Car,
  BadgeCheck,
  MessageSquare,
  Mail,
  Smartphone,
  ClipboardCheck,
  ChevronRight,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Refer = (props) => {
  const [copied, setCopied] = useState(false);
  const referralCode = "DRIVO50";

  if (!props.refer) return null;

  const stats = [
    { icon: Users, value: "12", label: "Friends Joined", color: "blue" },
    { icon: DollarSign, value: "$320", label: "Total Earned", color: "green" },
    { icon: Zap, value: "500", label: "Bonus Credits", color: "purple" },
  ];

  const steps = [
    { icon: Share2, title: "Share Your Link", description: "Send your unique referral code to friends" },
    { icon: BadgeCheck, title: "Friend Signs Up", description: "They get ₹200 off their first ride" },
    { icon: Car, title: "Friend Takes Ride", description: "Minimum ride value of ₹300" },
    { icon: Gift, title: "You Earn Reward", description: "Get ₹150 per qualified referral" },
  ];

  return (
    <div className="fixed inset-0 bg-white z-30 overflow-auto animate-in slide-in-from-right">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={() => props.toggleRefer(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">Refer & Earn</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 p-1 rounded-full w-fit mx-auto">
            <div className="bg-white rounded-full px-8 py-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Earn ₹150 Per Friend!
              </h2>
            </div>
          </div>
          <p className="text-gray-600 text-lg">
            Give ₹200, Get ₹150 - Share the Drivo experience with friends
          </p>
        </section>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className={`p-4 bg-${stat.color}-50 rounded-xl text-center`}>
              <stat.icon className={`w-8 h-8 text-${stat.color}-600 mx-auto mb-2`} />
              <div className={`text-xl font-bold text-${stat.color}-600`}>{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Referral Code */}
        <section className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-xl text-center">
            <h3 className="text-sm text-gray-600 mb-2">Your Unique Code</h3>
            <div className="flex items-center justify-center gap-4">
              <div className="text-3xl font-bold text-blue-600 tracking-wider">
                {referralCode}
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(referralCode);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                {copied ? <ClipboardCheck size={18} /> : "Copy"}
              </button>
            </div>
          </div>
        </section>

        {/* Sharing Options */}
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold flex items-center gap-3">
            <Share2 className="text-green-600" />
            Share Via
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
              <MessageSquare className="w-8 h-8 text-green-600 mx-auto" />
              <span className="text-sm mt-2">WhatsApp</span>
            </button>
            <button className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              <Mail className="w-8 h-8 text-blue-600 mx-auto" />
              <span className="text-sm mt-2">Email</span>
            </button>
            <button className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
              <Smartphone className="w-8 h-8 text-purple-600 mx-auto" />
              <span className="text-sm mt-2">SMS</span>
            </button>
            <button className="p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors">
              <Share2 className="w-8 h-8 text-orange-600 mx-auto" />
              <span className="text-sm mt-2">More</span>
            </button>
          </div>
        </section>

        {/* How It Works */}
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold flex items-center gap-3">
            <Zap className="text-yellow-500" />
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="p-6 bg-white border rounded-xl hover:border-green-200 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`bg-green-100 p-3 rounded-lg`}>
                    <step.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">Step {index + 1}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Progress */}
        <section className="space-y-6">
          <div className="bg-green-50 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Next Reward Tier</h3>
              <span className="text-green-600">3/5 Referrals</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-green-600 rounded-full h-3 w-3/5"></div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              Refer 2 more friends to unlock ₹500 bonus!
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="pt-8 border-t text-center text-sm text-gray-500">
          Terms apply • Rewards expire in 90 days • No spam allowed
        </div>
        <div className="mt-6">
                   <p className="text-xs text-gray-500 text-center mt-6">
                                       By signing up, you agree to our{' '}
                                       <Link to='/Drivo-Rides-Terms-and-Conditions' className="text-blue-600 hover:underline">Terms of Service</Link>{' '}
                                       and{' '}
                                       <Link to ='/Drivo-Rides-privacy-policy' className="text-blue-600 hover:underline">Privacy Policy</Link>
                                   </p>
                </div>
      </div>
    </div>
  );
};

export default Refer;