import React from 'react'

const RidePopup = ({setRidePopupPanel, setConfirmRidePopupPanel, ride, confirmRide}) => {
  return (
    <div>
      <h5
        className="p-1 w-[93%] text-center absolute top-0"
        onClick={() => setRidePopupPanel(false)}
      >
        <i className="ri-arrow-down-wide-fill text-3xl text-gray-300"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-4">New Ride Available</h3>
      <div className='flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg'>
        <div className='flex items-center gap-3'>
            <img className="h-12 w-12 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Yf92meLNpAnVV99uCNLOxFznGt-VaSuWwQ&s" alt="random-img" />
            <h2 className='text-lg font-medium'>{ride?.user.fullname.firstname + " " +ride?.user.fullname.firstname }</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 Km</h5>
      </div>
      <div className="flex flex-col justify-between items-center gap-2">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
            <i className="ri-map-pin-user-line text-lg"></i>
            <div className="">
              <h3 className="text-lg font-medium">562/11 -A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
            <i className="ri-map-pin-2-line text-lg"></i>
            <div className="">
              <h3 className="text-lg font-medium">562/11 -A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line text-lg"></i>
            <div className="">
              <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Cash Cash
              </p>
            </div>
          </div>
        </div>
        <div className='w-full flex items-center justify-between'>
        <button className="mt-1 bg-gray-300 text-black font-semibold p-3 px-10 rounded-lg"
                onClick={() => setRidePopupPanel(false)}
            >
            Ignore
            </button>
            <button className="mt-1 bg-green-600 text-white font-semibold p-3 px-10 rounded-lg"
                onClick={() => {
                  setConfirmRidePopupPanel(true)
                  confirmRide()
                }}
            >
            Accept
            </button>
            
        </div>
      </div>
    </div>
  )
}

export default RidePopup