import React from "react";

const ConfirmRide = ({setConfirmRidePanel, setVehicleFound}) => {
  return (
    <div>
      <h5
        className="p-1 w-[93%] text-center absolute top-0"
        onClick={() => setConfirmRidePanel(false)}
      >
        <i className="ri-arrow-down-wide-fill text-3xl text-gray-300"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-4">Confirm your Ride</h3>
      <div className="flex flex-col justify-between items-center gap-2">
        <img
          className="h-20"
          src="/assets/images/uber-car.webp"
          alt="uber-car"
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
            <i className="ri-map-pin-user-line text-lg"></i>
            <div className="">
              <h3 className="text-lg font-medium">562/11 -A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Takiyan bankat, Gopalganj
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
            <i className="ri-map-pin-2-line text-lg"></i>
            <div className="">
              <h3 className="text-lg font-medium">562/11 -A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Takiyan bankat, Gopalganj
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line text-lg"></i>
            <div className="">
              <h3 className="text-lg font-medium">562/11 -A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Takiyan bankat, Gopalganj
              </p>
            </div>
          </div>
        </div>
        <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg"
            onClick={() => {
                setVehicleFound(true);
                setConfirmRidePanel(false);
            }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
