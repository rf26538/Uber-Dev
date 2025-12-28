import React from 'react'

const VehiclePanel = ({ setConfirmRidePanel, setVehiclePanelOpen, fare, setVehicleType}) => {

  if (!fare || !fare.car) return null;
  
  const vehicleInfo = [
    {
      vehicleType : "UberGo",
      vehicleVal : "car",
      vehicleIcon : "uber-car.webp",
      distance : "2 mins away",
      price : fare.car,
      capacity : 4,
      msg : "Affordable, compact rides"
    },
    {
      vehicleType : "Moto",
      vehicleVal : "bike",
      vehicleIcon : "uber-bike.webp",
      distance : "2 mins away",
      price : fare.bike,
      capacity : 1,
      msg : "Affordable, bike rides"
    },
    {
      vehicleType : "UberAuto",
      vehicleVal : "auto",
      vehicleIcon : "uber-auto.webp",
      distance : "3 mins away",
      price : fare.auto,
      capacity : 3,
      msg : "Affordable, auto rides"
    },
  ];

  return (
    <div>
      <h5 className="p-1 w-[93%] text-center absolute top-0"
        onClick={() => setVehiclePanelOpen(false)}
      ><i className="ri-arrow-down-wide-fill text-3xl text-gray-300"></i></h5>
      <h3 className="text-2xl font-semibold mb-4">Available Rides</h3>
        {
          vehicleInfo.map((vehicle, index) => (
          <div onClick={() => {
            setConfirmRidePanel(true)
            setVehicleType(vehicle.vehicleVal)
          }} key={`vehicle-${index}`} className="flex w-full items-center justify-between p-3 border-2 border-gray-300 active:border-black rounded-xl mb-2">
            <img
              className="h-10"
              src={`/assets/images/${vehicle.vehicleIcon}`}
              alt="uber-car"
            />
            <div className="ml-2 w-1/2">
              <h4 className="font-medium text-base">{vehicle.vehicleType}<span><i className="ri-user-3-fill"></i>{vehicle.capacity}</span></h4>
              <h5 className="font-medium text-sm">{vehicle.distance}</h5>
              <p className="font-normal text-xs text-gray-600">{vehicle.msg}</p>
            </div>
            <h2 className="text-lg font-semibold">₹{vehicle.price}</h2>
          </div>
          ))
        }
    </div>
  )
}

export default VehiclePanel