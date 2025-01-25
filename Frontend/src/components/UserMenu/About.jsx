import React from 'react';
import {
  ArrowLeft,
  Target,
  Shield,
  Map,
  Leaf,
  Phone,
  Mail,
  Users,
  Star,
  BadgeCheck,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
const About = (props) => {
  if (!props.About) return null;

  // Sample statistics
  const stats = [
    { value: "5M+", label: "Rides Completed" },
    { value: "4.9", label: "Average Rating" },
    { value: "50+", label: "Cities Covered" },
    { value: "100%", label: "Verified Drivers" },
  ];

  const features = [
    { icon: Shield, title: "Safety First", description: "Rigorous driver screening and 24/7 ride monitoring" },
    { icon: Map, title: "Real-Time Tracking", description: "Live tracking and route sharing with loved ones" },
    { icon: Leaf, title: "Eco-Friendly", description: "Growing fleet of electric vehicles for cleaner rides" },
    { icon: Clock, title: "24/7 Support", description: "Round-the-clock customer service team" },
  ];

  return (
    <div className="fixed inset-0 bg-white z-30 overflow-auto animate-in slide-in-from-right">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={() => props.toggleAbout(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">About Drivo</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-8 space-y-12">
        {/* Hero Section */}
        <section className="space-y-6 text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            Revolutionizing Urban Mobility
          </h2>
          <p className="text-gray-600 text-lg text-justify">
            Connecting millions of riders with safe, affordable, and reliable transportation since 2024
          </p>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="p-4 bg-blue-50 rounded-xl text-center">
              <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-green-500" />
            <h3 className="text-2xl font-semibold">Our Mission</h3>
          </div>
          <p className="text-gray-600 leading-relaxed text-justify">
            At Drivo, we're committed to transforming urban transportation through innovative technology
            that prioritizes safety, sustainability, and accessibility. We empower communities by creating
            flexible earning opportunities for drivers while providing riders with seamless mobility solutions.
          </p>
        </section>

        {/* Features Grid */}
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold">Why Choose Drivo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-white border rounded-xl hover:border-blue-200 transition-all">
                <feature.icon className="w-8 h-8 text-blue-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-500" />
            <h3 className="text-2xl font-semibold">Our Drivers</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="text-center space-y-2">
                <img
                  src={`https://randomuser.me/api/portraits/men/${index + 40}.jpg`}
                  alt="Driver"
                  className="w-20 h-20 rounded-full mx-auto mb-2"
                />
                <div className="font-medium">Driver Name</div>
                <div className="flex items-center justify-center gap-1 text-sm text-yellow-600">
                  <Star className="w-4 h-4 fill-yellow-400" />
                  4.95
                </div>
                <div className="text-sm text-gray-500 flex items-center justify-center gap-1">
                  <BadgeCheck className="w-4 h-4 text-green-500" />
                  500+ rides
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold">Get in Touch</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-600">
              <Mail className="w-5 h-5" />
              support@drivo.com
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Phone className="w-5 h-5" />
              +91 7011343805
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="pt-8 border-t text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Drivo Rides. All rights reserved.
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

export default About;