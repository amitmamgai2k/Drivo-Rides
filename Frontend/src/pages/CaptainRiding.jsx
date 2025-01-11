import React ,{ useState ,useRef,useEffect} from 'react'
import { ChevronDown} from 'lucide-react';

import FinishRide from '../components/FinishRide';
import { gsap } from "gsap";
function CaptainRiding(props) {
    const [finishRidePanel, setfinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null);
    useEffect(() => {
        if (finishRidePanel) {
          gsap.to(finishRidePanelRef.current, {
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          });
        } else {
          gsap.to(finishRidePanelRef.current, {
            y: "100%",
            duration: 0.5,
            ease: "power3.in",
          });
        }
      }, [finishRidePanel]);


  return (

 <div className="h-screen bg-yellow-400 relative overflow-hidden">
      {/* Header Section */}
      <div className="absolute  top-5 left-5 z-10">
        <img
          className="w-16 mb-10"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="Uber Logo"
        />
      </div>

      <div className="h-4/5">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map background"
          className="w-full h-full object-cover"
        />
      </div>
        <div className=" bg-yellow-400">
              <button
                onClick={() => setfinishRidePanel(true)}
                className="flex px-[50%] mb-2  items-center justify-center space-x-2  p-2 rounded-full transition-colors cursor-pointer"
              >
                < ChevronDown   className="w-6  h-6" />

              </button>
            </div>
          <div className='bg-yellow-400 flex gap-4  items-center justify-between px-4' onClick={() => setfinishRidePanel(true)}>

          <h4 className="text-xl font-semibold">4.2 Km away</h4>
          <button
          className=" bg-red-600 px-5 text-white py-3 rounded-lg font-semibold hover:bg-red-800 transition-colors duration-200 cursor-pointer"
        >
          Complete Ride
        </button>
        </div>
        <div
        ref={finishRidePanelRef}
        className="fixed w-full h-auto bottom-0 bg-white px-4 py-6 z-50 transform translate-y-full shadow-lg"
      >
        <FinishRide setfinishRidePanel={setfinishRidePanel}/>


      </div>
        </div>

  )
}

export default CaptainRiding
