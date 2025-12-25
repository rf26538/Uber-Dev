import React from "react";

const LocationSearchPanel = ({ setPanelOpen, setVehiclePanelOpen }) => {
  // sample data for location search panel
  const locations = [
    "5/202, Near fit gym, laxminagar, new delhi",
    "10/45, MG road, Bengaluru, Karnataka",
    "221B Baker Street, London",
    "1600 Pennsylvania Ave NW, Washington, DC",
  ];

  return (
    <div>
      {locations.map((location, index) => (
        <div
          key={"location" + index}
          className="flex items-center justify-start gap-4 my-4 border-2 border-gray-100 active:border-black p-3 rounded-xl"
          onClick={() => {
            setPanelOpen(false);
            setVehiclePanelOpen(true);
          }}
        >
          <h2 className="bg-[#eee] h-8 w-8 flex items-center justify-center rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{location}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
