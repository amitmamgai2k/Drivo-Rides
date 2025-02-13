import React from 'react';
import { User,ArrowLeft } from 'lucide-react'; // Importing the User icon from lucide-react
import car from '../assets/car.png';
import bike from '../assets/bike.png';
import auto from '../assets/auto.png';

const VehiclesAvailable = (props) => {
    console.log('props.fare:', props.fare);

    const vehiclesData = [
        {
            type: 'UberGo',
            seats: 4,
            time: '2 mins away',
            para: 'Affordable car rides for everyday use',
            image:car,
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

    return (
        <div className="flex flex-col gap-4 p-4 mb-10 w-full">
            <ArrowLeft onClick={() => props.setVehiclePanel(false)}/>
            <h1 className="font-bold text-2xl">Choose a Vehicle</h1>
            {vehiclesData.map((vehicle, index) => (
                <div
                    key={index}
                    onClick={() => {
                        console.log("Vehicle type selected:", vehicle.fareKey);
                        props.setConfirmRidePanel(true);
                        props.setVehiclePanel(false);

                        props.setVehicleType(vehicle.fareKey);


                    }}
                    className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between shadow-md"
                >
                    <img src={vehicle.image} alt={vehicle.type} className="h-14 w-20 object-cover rounded-md" />
                    <div className="ml-2 w-1/2">
                        <h4 className="font-medium text-base">
                            {vehicle.type} <span><User className="inline-block" size={16} /> {vehicle.seats}</span>
                        </h4>
                        <h5 className="font-medium text-sm">{vehicle.time}</h5>
                        <p className="font-normal text-xs text-gray-600">{vehicle.para}</p>
                        <input type="text" placeholder='Enter Cupon Code' className="border border-gray-300 rounded-md px-2 py-1 mt-2 w-full" />
                    </div>

                    {/* Handle undefined fare by providing a fallback value */}
                    <h2 className="font-medium text-base">
                        ₹{props.fare?.[vehicle.fareKey] || 'N/A'}
                    </h2>
                </div>
            ))}
        </div>
    );
};

export default VehiclesAvailable;
