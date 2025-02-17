import React, { useState } from 'react';
import { User, ArrowLeft, BadgePercent, SendHorizontal } from 'lucide-react';
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

    // Discount rates for valid coupons (handled on frontend)
    const discountRates = {
        'SAVE50': 0.5,  // 50% off
        'SAVE20': 0.2   // 20% off
    };

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
        console.log("fareKey",props.fare[fareKey]);
        const couponCode = couponCodes[fareKey].trim().toUpperCase();

        if (!couponCode) {
            toast.error('Please enter a coupon code');
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/miscellaneous/validate-coupon-code`,
                { couponCodes: couponCode,
                  fare: props.fare[fareKey]
                 },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );

            if (response.status === 200) {
                toast.success('Coupon code applied successfully');

                if (!discountApplied[fareKey]) {
                      const discountedFare = response.data.discountedFare;;

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

        // Reset error when user starts typing again
        setError((prevErrors) => ({
            ...prevErrors,
            [vehicleFareKey]: ''
        }));
    };

    // Confirm Ride & Proceed to Next Step
    const handleConfirm = (vehicle) => {
        const fareKey = vehicle.fareKey;




        if (discountApplied[fareKey] || !couponCodes[fareKey]) {
            // ✅ Proceed to next step only if discount is applied OR no coupon is entered
            props.setVehicleType(fareKey);
            props.setConfirmRidePanel(true);
            props.setVehiclePanel(false);
        } else {
            toast.error('Please apply a valid coupon code first!');
        }
    };

    return (
        <div className="flex flex-col gap-4 p-4 mb-10 w-full">
            <ArrowLeft onClick={() => props.setVehiclePanel(false)} />
            <h1 className="font-bold text-2xl">Choose a Vehicle</h1>

            {vehiclesData.map((vehicle, index) => (
                <div
                    key={index}
                    className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between shadow-md"
                >
                    <img
                        src={vehicle.image}
                        alt={vehicle.type}
                        className="h-14 w-20 object-cover rounded-md"
                    />
                    <div className="ml-2 w-1/2">
                        <h4 className="font-medium text-base">
                            {vehicle.type} <span><User className="inline-block" size={16} /> {vehicle.seats}</span>
                        </h4>
                        <h5 className="font-medium text-sm">{vehicle.time}</h5>
                        <p className="font-normal text-xs text-gray-600">{vehicle.para}</p>

                        {/* Coupon Input */}
                        <div className="flex gap-3 items-center justify-between">
                            <BadgePercent size={36} className='mt-1' />
                            <input
                                type="text"
                                placeholder="Enter Code"
                                value={couponCodes[vehicle.fareKey]}
                                onChange={(e) => handleCouponChange(vehicle.fareKey, e.target.value)}
                                className="border border-gray-600 rounded-md px-2 py-1 mt-2 w-full"
                            />
                            <button onClick={() => validateCouponCode(vehicle)}>
                                <SendHorizontal size={36} className='mt-2 bg-blue-100 text-blue-600 p-2 rounded-lg' />
                            </button>
                        </div>

                        {/* Display error message if invalid coupon */}
                        {error[vehicle.fareKey] && (
                            <p className="text-red-500 text-xs mt-1">{error[vehicle.fareKey]}</p>
                        )}
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        <h2 className="font-medium text-base">
                            ₹{props.fare?.[vehicle.fareKey] || 'N/A'}
                        </h2>
                        <button
                            onClick={() => handleConfirm(vehicle)}
                            className="bg-white text-green-600 border-2 border-green-500 border-solid mt-9 px-4 py-2 rounded-lg"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VehiclesAvailable;
