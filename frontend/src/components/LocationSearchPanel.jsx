
const LocationSearchPanel = ({ setPanelOpen, setVehiclePanelOpen , suggestions, setPickup, setDestination, activeField}) => {

  const handleSuggestionClick = (location) => {

    if (activeField === "pickup") {
      setPickup(location);
    } else if (activeField === "destinationPoint") {
      setDestination(location);
    }
    // setPanelOpen(false);
    // setVehiclePanelOpen(true);
  };

  return (
    <div>
      {suggestions && suggestions.map((location, index) => (
        <div
          key={"location" + index}
          className="flex items-center justify-start gap-4 my-4 border-2 border-gray-100 active:border-black p-3 rounded-xl"
          onClick={() => handleSuggestionClick(location)}
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
