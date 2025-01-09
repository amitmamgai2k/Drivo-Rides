import React from 'react'
import car from '../assets/car.png';
import bike from '../assets/bike.png';
import auto from '../assets/auto.png';
import 'remixicon/fonts/remixicon.css'
function VehiclesAvailable(props) {
    const vehiclesData = [

      { type: 'UberGo', price: '₹100', seats: 4, image: car, time:'2 mins away',para:'Affordable car rides for everyday use'},
      { type: 'Moto', price: '₹50', seats: 2, image: bike , time:'5 mins away',para:'Affordable bike rides for everyday use'},
      { type: 'UberAuto ', price: '₹40', seats: 3, image: auto, time:'10 mins away',para:'Affordable auto  rides for everyday use'},

]
return (
    <div className="  flex flex-col  gap-4 p-4 w-full">
        <h1 className='font-bold text-2xl'>Choose a Vehicle</h1>
        {vehiclesData.map((vehicle, index) => (
            <div onClick={() => {props.setConfirmRidePanel(true)}}  key={index} className="flex border-2  active:border-black flex-row shadow-md rounded-lg overflow-hidden w-full">
                <img src={vehicle.image} alt={vehicle.type} className="vehicle-image w-30 h-20 bg-transparent object-cover" />

                <div className=" flex flex-col justify-end pl-2 pb-2 ">
                <div className='flex   flex-row w-[100%]  px-2 ' >
                    <div className="flex flex-col gap-2">
                    <div className='flex flex-row gap-2 '>
                    <h3 className="text-xl font-semibold">{vehicle.type}</h3>
                    <p className="text-gray-600 font-bold "><i class="ri-user-3-fill"></i> {vehicle.seats}</p></div>
                    <p className=' text-base'>{vehicle.time}</p>
                    <p className='text-sm text-gray-700'>{vehicle.para}</p>
                    <p></p>
                    </div>
                    <div><p className="text-gray-600 text-xl font-semibold"> {vehicle.price}</p></div>
                    </div>


                </div>
            </div>
        ))}
    </div>
)
}

export default VehiclesAvailable
