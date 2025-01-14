import React from 'react';
import { User } from 'lucide-react'; // Importing the User icon from lucide-react

const VehiclesAvailable = (props) => {
    console.log('props.fare:', props.fare);

    const vehiclesData = [
        {
            type: 'UberGo',
            seats: 4,
            time: '2 mins away',
            para: 'Affordable car rides for everyday use',
            image: 'https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg',
            fareKey: 'car',
        },
        {
            type: 'Moto',
            seats: 1,
            time: '3 mins away',
            para: 'Affordable bike rides for everyday use',
            image: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png',
            fareKey: 'motorcycle',
        },
        {
            type: 'UberAuto',
            seats: 3,
            time: '5 mins away',
            para: 'Affordable auto rides for everyday use',
            image: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png',
            fareKey: 'auto',
        },
    ];

    return (
        <div className="flex flex-col gap-4 p-4 mb-10 w-full">
            <h1 className="font-bold text-2xl">Choose a Vehicle</h1>
            {vehiclesData.map((vehicle, index) => (
                <div
                    key={index}
                    onClick={() => {
                        props.setConfirmRidePanel(true);

                        props.vehicleType(vehicle.fareKey);
                    }}
                    className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between shadow-md"
                >
                    <img src={vehicle.image} alt={vehicle.type} className="h-10 w-20 object-cover rounded-md" />
                    <div className="ml-2 w-1/2">
                        <h4 className="font-medium text-base">
                            {vehicle.type} <span><User className="inline-block" size={16} /> {vehicle.seats}</span>
                        </h4>
                        <h5 className="font-medium text-sm">{vehicle.time}</h5>
                        <p className="font-normal text-xs text-gray-600">{vehicle.para}</p>
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
