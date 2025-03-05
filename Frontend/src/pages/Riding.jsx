import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { load } from "@cashfreepayments/cashfree-js";
import axios from "axios";
import MapBackground from "../components/MapBackGround";
import { MapPin, Navigation, Home, CreditCard, Car } from 'lucide-react';
import logo from '../assets/logo.png';
import {toast }from 'react-hot-toast'

const Riding = (props) => {
    const location = useLocation();
    const { ride } = location.state || {};
    const { socket } = useContext(SocketContext);
    const navigate = useNavigate();
    console.log("Ride Details:", ride._id);


    const [orderId, setOrderId] = useState("");
    const [cashfree, setCashfree] = useState(null);
    const [paymentInitiated, setPaymentInitiated] = useState(false);

    // Initialize Cashfree SDK
    const initializeSDK = async () => {
        const cfInstance = await load({ mode: "sandbox" });
        setCashfree(cfInstance);
    };

    useEffect(() => {
        initializeSDK();
    }, []);

    const getSessionId = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/payment/payment`,{
                price:ride.price
            });
            if (res.data && res.data.payment_session_id) {
                setOrderId(res.data.order_id);
                return res.data.payment_session_id;
            }
        } catch (error) {
            console.error(error);
        }
    };

    const verifyPayment = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/payment/verify`, {
                orderId,rideId: ride._id
            });
            console.log("Payment Verification Response:", res.data);

            if (res.data) {
                console.log("Payment verified successfully!");

            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        if (orderId && paymentInitiated) {
            verifyPayment();
        }
    }, [orderId, paymentInitiated]);
    const handlePayment = async (e) => {
        e.preventDefault();
        if (!cashfree) {
            console.error("Cashfree SDK is not initialized yet.");
            toast.error("Payment gateway not ready. Please try again.");
            return;
        }
        try {
            const sessionId = await getSessionId();
            console.log("Session ID:", sessionId);

            const checkoutOptions = {
                paymentSessionId: sessionId,
                redirectTarget: "_modal",
            };

            cashfree.checkout(checkoutOptions).then(() => {
                setPaymentInitiated(true);

            });
            console.log("Payment started successfully!");

        } catch (error) {
            console.error(error);
        }
    };
    socket.on("ride-ended", () => {
        navigate("/home");
    });

    useEffect(() => {
        socket.on("payment-success", () => {
            toast.success("Payment successful, redirecting rider...");
            navigate("/home");
        });

        return () => {
            socket.off("payment-success");
        };
    }, []);


    return (
        <div className="h-screen bg-gray-50">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-center">
                <img
                    className="object-contain"
                    src={logo}
                    alt="Uber Logo"
                    height={80}
                    width={150}
                />
                <Link
                    to="/home"
                    className="h-10 w-10 bg-white shadow-md flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors"
                >
                    <Home className="w-5 h-5" />
                </Link>
            </div>

            {/* Map Section */}
            <div className="h-1/2 w-full relative shadow-lg">
                <MapBackground />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Navigation className="w-4 h-4" />
                        <span>On the way to {ride.destinationText}</span>
                    </div>
                </div>
            </div>

            {/* Ride Details Section */}
            <div className="h-1/2 bg-white rounded-t-3xl -mt-6 p-6 shadow-lg">
                {/* Driver Info */}
                <div className="flex items-center justify-between bg-gray-50 px-4  rounded-xl mb-6">
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-full bg-gray-200 overflow-hidden">
                            <img
                                className="h-full w-full object-cover"
                                src={ride.captain.ProfilePicture }
                                alt="Vehicle"
                            />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold capitalize">
                                {ride.captain.fullname.firstname} {ride.captain.fullname.lastname}
                            </h2>
                            <div className="flex items-center gap-2">
                                <Car className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-600">{ride.captain.vehicle.plate}</span>
                            </div>
                            <p className="text-sm text-gray-500">{ride.captain.vehicle.model || "Unknown Model"}</p>
                        </div>
                    </div>
                </div>

                {/* Ride Details */}
                <div className="">
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                        <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-medium text-gray-900">{ride.originText}</h3>
                            <p className="text-sm text-gray-600">{ride.destinationText}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <CreditCard className="w-5 h-5 text-green-500" />
                        <div>
                            <h3 className="font-medium text-gray-900">₹{ride.price}</h3>
                            <p className="text-sm text-gray-600">Cash Payment</p>
                        </div>
                    </div>
                </div>

                {/* Payment Button */}
                <button
                    className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-md transition-colors duration-200"
                    onClick={handlePayment}
                >
                    Make Payment
                </button>
            </div>
        </div>
    );
};

export default Riding;
