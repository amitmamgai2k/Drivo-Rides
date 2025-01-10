import React from 'react'

function CaptainDetails() {
  return (

   <div className="flex items-center justify-between gap-4 bg-gray-100 rounded-md p-4 ">
          <div className="text-center ">
          <i className="text-2xl  ri-time-line"></i>
          <h4 className="text-lg font-medium">10.2</h4>
          <p className="text-sm text-gray-600">Hours Online</p>
          </div>
          <div className="text-center ">
          <i className="text-2xl font-extralight  ri-speed-up-fill"></i>
          <h4 className="text-lg font-medium">300Km</h4>
          <p className="text-sm text-gray-600">Distance Covered</p>
          </div>
          <div className="text-center ">
          <i className="text-2xl font-extralight  ri-booklet-line"></i>
          <h4 className="text-lg font-medium">10.2</h4>
          <p className="text-sm text-gray-600">Hours Online</p>
          </div>
        </div>

  )
}

export default CaptainDetails
