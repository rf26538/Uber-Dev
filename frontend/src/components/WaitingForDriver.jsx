import React from "react";

const WaitingForDriver = ({ setWaitingForDriver, ride }) => {
  return (
    <div>
      <h5
        className="p-1 w-[93%] text-center absolute top-0"
        onClick={() => setWaitingForDriver(false)}
      >
        <i className="ri-arrow-down-wide-fill text-3xl text-gray-300"></i>
      </h5>
      <div className="flex items-center justify-between">
        <img
          className="h-10"
          src="/assets/images/uber-car.webp"
          alt="uber-car"
        />
        <div className="text-right">
          <h2 className="text-lg font-medium">{ride?.captain?.fullname?.firstname + " " + ride?.captain?.fullname?.lastname}</h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">MP04 AB 1234</h4>
          <p className="font-sm text-gray-600">Maruti Suzuki Alto</p>
        </div>
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
              <h3 className="text-lg font-medium">₹ {ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Cash Cash
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
