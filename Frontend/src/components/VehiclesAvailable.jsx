import React, { useState } from 'react';
import { User, ArrowLeft, BadgePercent, SendHorizontal, X } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import car from '../assets/car.png';
import bike from '../assets/bike.png';
import auto from '../assets/auto.png';

const VehiclesAvailable = (props) => {
    const [couponCodes, setCouponCodes] = useState({
        car: '',
        motorcycle: '',
        auto: ''
    });

    const [error, setError] = useState({
        car: '',
        motorcycle: '',
        auto: ''
    });

    const [discountApplied, setDiscountApplied] = useState({
        car: false,
        motorcycle: false,
        auto: false
    });

    const vehiclesData = [
        {
            type: 'UberGo',
            seats: 4,
            time: '2 mins away',
            para: 'Affordable car rides for everyday use',
            image: car,
            fareKey: 'car',
        },
        {
            type: 'Moto',
            seats: 1,
            time: '3 mins away',
            para: 'Affordable bike rides for everyday use',
            image: bike,
            fareKey: 'motorcycle',
        },
        {
            type: 'UberAuto',
            seats: 3,
            time: '5 mins away',
            para: 'Affordable auto rides for everyday use',
            image: auto,
            fareKey: 'auto',
        },
    ];

    // Validate coupon with backend
    const validateCouponCode = async (vehicle) => {
        const fareKey = vehicle.fareKey;
        const couponCode = couponCodes[fareKey].trim().toUpperCase();

        if (!couponCode) {
            toast.error('Please enter a coupon code');
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/miscellaneous/validate-coupon-code`,
                {
                    couponCodes: couponCode,
                    fare: props.fare[fareKey]
                },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );

            if (response.status === 200) {
                toast.success('Coupon code applied successfully');

                if (!discountApplied[fareKey]) {
                    const discountedFare = response.data.discountedFare;

                    props.setfare((prevFare) => ({
                        ...prevFare,
                        [fareKey]: discountedFare
                    }));

                    setDiscountApplied((prev) => ({
                        ...prev,
                        [fareKey]: true
                    }));
                }
            }
        } catch (error) {
            toast.error('Invalid coupon code');
            setError((prevErrors) => ({
                ...prevErrors,
                [fareKey]: 'Invalid coupon code'
            }));
        }
    };

    // Handle input change for coupon
    const handleCouponChange = (vehicleFareKey, value) => {
        setCouponCodes((prevCodes) => ({
            ...prevCodes,
            [vehicleFareKey]: value
        }));

        setError((prevErrors) => ({
            ...prevErrors,
            [vehicleFareKey]: ''
        }));
    };

    // Confirm Ride & Proceed to Next Step
    const handleConfirm = (vehicle) => {
        const fareKey = vehicle.fareKey;

        if (discountApplied[fareKey] || !couponCodes[fareKey]) {
            toast.success('Vehicle selected successfully');
            props.setVehicleType(fareKey);
            props.setConfirmRidePanel(true);
            props.setVehiclePanel(false);
        } else {
            toast.error('Please apply a valid coupon code first!');
        }
    };

    return (
        <div className="bg-white w-full h-full flex flex-col max-h-[80vh] rounded-t-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white rounded-t-2xl">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => props.setVehiclePanel(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="font-bold text-xl">Choose a Vehicle</h1>
                </div>
                <button
                    onClick={() => props.setVehiclePanel(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Scrollable Vehicle List */}
            <div className="flex-1 overflow-y-auto bg-white">
                <div className="p-4 space-y-4">
                    {vehiclesData.map((vehicle, index) => (
                        <div
                            key={index}
                            className="flex border-2 hover:border-blue-300 active:border-blue-500 rounded-xl w-full p-4 items-start justify-between shadow-sm bg-white transition-all duration-200"
                        >
                            {/* Vehicle Image */}
                            <div className="flex-shrink-0">
                                <img
                                    src={vehicle.image}
                                    alt={vehicle.type}
                                    className="h-16 w-20 object-cover rounded-md"
                                />
                            </div>

                            {/* Vehicle Details */}
                            <div className="flex-1 ml-4 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold text-base text-gray-900">
                                        {vehicle.type}
                                    </h4>
                                    <div className="flex items-center gap-1 text-gray-600">
                                        <User size={14} />
                                        <span className="text-sm">{vehicle.seats}</span>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-600 mb-1">{vehicle.time}</p>
                                <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                                    {vehicle.para}
                                </p>

                                {/* Coupon Input Section */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <BadgePercent size={18} className="text-green-600 flex-shrink-0" />
                                        <div className="flex-1 flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Enter coupon code"
                                                value={couponCodes[vehicle.fareKey]}
                                                onChange={(e) => handleCouponChange(vehicle.fareKey, e.target.value)}
                                                className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            <button
                                                onClick={() => validateCouponCode(vehicle)}
                                                className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-lg transition-colors duration-200 flex-shrink-0"
                                            >
                                                <SendHorizontal size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Error Message */}
                                    {error[vehicle.fareKey] && (
                                        <p className="text-red-500 text-xs ml-5">
                                            {error[vehicle.fareKey]}
                                        </p>
                                    )}

                                    {/* Success Indicator */}
                                    {discountApplied[vehicle.fareKey] && (
                                        <p className="text-green-600 text-xs ml-5 font-medium">
                                            ✓ Discount applied successfully
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Price and Confirm Button */}
                            <div className="flex flex-col items-end gap-3 ml-4 flex-shrink-0">
                                <div className="text-right">
                                    <h2 className="font-bold text-lg text-gray-900">
                                        ₹{props.fare?.[vehicle.fareKey] || 'N/A'}
                                    </h2>
                                    {discountApplied[vehicle.fareKey] && (
                                        <p className="text-xs text-green-600 font-medium">
                                            Discounted
                                        </p>
                                    )}
                                </div>

                                <button
                                    onClick={() => handleConfirm(vehicle)}
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 text-sm whitespace-nowrap"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VehiclesAvailable;