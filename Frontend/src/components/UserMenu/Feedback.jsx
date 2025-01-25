import React, { useState } from 'react';
import {
  ArrowLeft,
  Smile,
  Frown,
  Star,
  MessageSquare,
  ThumbsUp,
  Car,
  Smartphone,
  User,
  Mail,
  ChevronRight,
  Send
} from 'lucide-react';

import { Link } from 'react-router-dom';
const Feedback = (props) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [detailedRatings, setDetailedRatings] = useState({
    driver: 0,
    app: 0,
    vehicle: 0,
    safety: 0
  });
  const [comment, setComment] = useState('');

  if (!props.feedback) return null;

  const ratingEmojis = [
    { icon: Frown, color: 'red' },
    { icon: Frown, color: 'orange' },
    { icon: Smile, color: 'yellow' },
    { icon: Smile, color: 'lightgreen' },
    { icon: Smile, color: 'green' }
  ];

  const ratingCategories = [
    { icon: User, label: 'Driver Behavior', key: 'driver' },
    { icon: Smartphone, label: 'Booking Experience', key: 'app' },
    { icon: Car, label: 'Vehicle Condition', key: 'vehicle' },
    { icon: ThumbsUp, label: 'Safety Measures', key: 'safety' }
  ];

  return (
    <div className="fixed inset-0 bg-white z-30 overflow-auto animate-in slide-in-from-right">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={() => props.toggleFeedback(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">Share Feedback</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-8 space-y-12">
        {/* Overall Rating */}
        <section className="space-y-6 text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            How was your ride?
          </h2>

          <div className="flex justify-center gap-4">
            {ratingEmojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => setSelectedRating(index + 1)}
                className={`p-4 rounded-2xl ${
                  selectedRating >= index + 1
                    ? `bg-${emoji.color}-100 border-2 border-${emoji.color}-500`
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <emoji.icon
                  size={32}
                  className={`text-${emoji.color}-500`}
                />
              </button>
            ))}
          </div>
        </section>

        {/* Detailed Ratings */}
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold flex items-center gap-3">
            <Star className="text-yellow-500" />
            Rate Individual Aspects
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ratingCategories.map((category) => (
              <div key={category.key} className="p-6 bg-white border rounded-xl hover:border-blue-200 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <category.icon className="w-8 h-8 text-blue-600" />
                  <h4 className="text-lg font-semibold">{category.label}</h4>
                </div>
                <div className="flex justify-between">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setDetailedRatings(prev => ({
                        ...prev,
                        [category.key]: star
                      }))}
                      className={`p-2 ${
                        detailedRatings[category.key] >= star
                          ? 'text-yellow-400'
                          : 'text-gray-300 hover:text-yellow-300'
                      }`}
                    >
                      <Star className="w-6 h-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comments Section */}
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold flex items-center gap-3">
            <MessageSquare className="text-blue-500" />
            Additional Comments
          </h3>

          <div className="space-y-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="What could we improve? (Optional)"
            ></textarea>

            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
              <Mail className="w-6 h-6 text-blue-600" />
              <input
                type="email"
                placeholder="Email for follow-up (Optional)"
                className="bg-transparent flex-1 outline-none"
              />
            </div>
          </div>
        </section>

        {/* Submission */}
        <button
          className="w-full bg-blue-600 text-white py-4 px-8 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-3"
          onClick={() => console.log('Submitted feedback')}
        >
          <Send className="w-5 h-5" />
          Submit Feedback
        </button>

        {/* Footer */}
        <div className="pt-8 border-t text-center text-sm text-gray-500">
          Your feedback helps improve experiences for millions of riders
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

export default Feedback;