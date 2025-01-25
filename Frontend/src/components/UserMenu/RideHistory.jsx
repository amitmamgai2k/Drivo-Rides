import React from 'react';
import {
  ArrowLeft,
  Clock,
  MapPin,
  Car,
  Wallet,
  Star,
  Calendar,
  Navigation,
  Receipt,
  ChevronDown,
  ChevronUp,
  CircleDollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';

const RideHistory = (props) => {
  const [expandedRide, setExpandedRide] = React.useState(null);
  const [filter, setFilter] = React.useState('all');

  if (!props.History) return null;

  // Sample ride data
  const rides = [
    {
      id: 1,
      date: '2024-03-15',
      time: '08:30 AM',
      from: 'Central Business District',
      to: 'Tech Park Campus',
      driver: 'Michael Chen',
      car: 'Toyota Camry (AB123CD)',
      fare: 28.50,
      duration: '25 mins',
      distance: '12.4 km',
      rating: 4.9,
      payment: '•••• 1234',
      routeImage: 'https://via.placeholder.com/400x150',
      invoiceLink: '#'
    },
    {
      id: 2,
      date: '2024-03-14',
      time: '06:45 PM',
      from: 'Downtown Mall',
      to: 'Green Valley Apartments',
      driver: 'Sarah Johnson',
      car: 'Honda Accord (XY456ZA)',
      fare: 35.20,
      duration: '38 mins',
      distance: '18.7 km',
      rating: 4.8,
      payment: '•••• 5678',
      routeImage: 'https://via.placeholder.com/400x150',
      invoiceLink: '#'
    }
  ];

  // Stats cards data
  const stats = [
    { icon: Car, value: rides.length, label: 'Total Rides', color: 'blue' },
    { icon: CircleDollarSign, value: `$${rides.reduce((sum, ride) => sum + ride.fare, 0).toFixed(2)}`, label: 'Total Spent', color: 'green' },
    { icon: Star, value: (rides.reduce((sum, ride) => sum + ride.rating, 0) / rides.length).toFixed(1), label: 'Avg Rating', color: 'yellow' },
    { icon: Clock, value: `${rides.reduce((sum, ride) => sum + parseInt(ride.duration), 0)} mins`, label: 'Total Time', color: 'purple' },
  ];

  return (
    <div className="fixed inset-0 bg-white z-30 overflow-auto animate-in slide-in-from-right">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={() => props.toggleRideHistory(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">Ride History</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-8 space-y-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className={`p-4 bg-${stat.color}-50 rounded-xl text-center`}>
              <stat.icon className={`w-8 h-8 text-${stat.color}-600 mx-auto mb-2`} />
              <div className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          {['all', 'week', 'month', 'year', 'rated'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full capitalize ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f === 'rated' ? '⭐ Rated' : f}
            </button>
          ))}
        </div>

        {/* Ride List */}
        <div className="space-y-6">
          {rides.map((ride) => (
            <div key={ride.id} className="border rounded-xl overflow-hidden">
              {/* Ride Summary */}
              <div
                className="p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => setExpandedRide(expandedRide === ride.id ? null : ride.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">{ride.date}</span>
                      <span className="text-gray-500">{ride.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Car className="w-5 h-5" />
                      <span>{ride.car}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">${ride.fare.toFixed(2)}</div>
                    <div className="flex items-center gap-1 text-sm text-yellow-600">
                      <Star className="w-4 h-4 fill-yellow-400" />
                      {ride.rating}
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedRide === ride.id && (
                <div className="border-t p-4 space-y-6 bg-gray-50">
                  {/* Route Map */}
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={ride.routeImage}
                      alt="Route map"
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center gap-2">
                        <Navigation className="w-5 h-5" />
                        <span className="font-medium">{ride.distance}</span>
                      </div>
                      <div className="text-sm">{ride.duration} duration</div>
                    </div>
                  </div>

                  {/* Detailed Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="text-xs text-gray-500">From</div>
                          <div className="font-medium">{ride.from}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-red-600" />
                        <div>
                          <div className="text-xs text-gray-500">To</div>
                          <div className="font-medium">{ride.to}</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-purple-600" />
                        <div>
                          <div className="text-xs text-gray-500">Payment</div>
                          <div className="font-medium">{ride.payment}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-600" />
                        <div>
                          <div className="text-xs text-gray-500">Your Rating</div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(ride.rating) ? 'fill-yellow-400' : ''}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg">
                      <Receipt className="w-5 h-5" />
                      Download Receipt
                    </button>
                    <button className="flex items-center gap-2 text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg">
                      Rate Again
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-8 border-t text-center text-sm text-gray-500">
          {rides.length} rides shown • Updated just now
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

export default RideHistory;