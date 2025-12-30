import { useNavigate } from "react-router-dom";

const FinishRide = ({ setFinishRidePanel , rideData}) => {
  const navigate = useNavigate();

  const endRide = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/rides/finish-ride`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          rideId: rideData?._id,
        }),
      }); 
       
      if(response.status === 200){
        const data = await response.json();       
        console.log("Ride finished:", data);
        setFinishRidePanel(false);
        navigate("/captain-home");
      }
    } catch (error) {
      console.error("Error finishing ride:", error);
    }
  };

  return (
    <div>
      <h5
        className="p-1 w-[93%] text-center absolute top-0"
        onClick={() => setFinishRidePanel(false)}
      >
        <i className="ri-arrow-down-wide-fill text-3xl text-gray-300"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-4">
        Finish this Ride
      </h3>
      <div className="flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Yf92meLNpAnVV99uCNLOxFznGt-VaSuWwQ&s"
            alt="random-img"
          />
          <h2 className="text-lg font-medium">{rideData?.user?.fullname?.firstname + " " + rideData?.user?.fullname?.lastname}</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 Km</h5>
      </div>
      <div className="flex flex-col justify-between items-center gap-2">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
            <i className="ri-map-pin-user-line text-lg"></i>
            <div className="">
              <h3 className="text-lg font-medium">562/11 -A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {rideData?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
            <i className="ri-map-pin-2-line text-lg"></i>
            <div className="">
              <h3 className="text-lg font-medium">562/11 -A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {rideData?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line text-lg"></i>
            <div className="">
              <h3 className="text-lg font-medium">₹{rideData?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Cash Cash
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 w-full">
            <button
              onClick={endRide}
              className="w-full mt-1 flex text-lg justify-center bg-green-600 text-white font-semibold p-3 rounded-lg"
            >Finish Ride
            </button>
            <p className="text-red-500 mt-3 text-sm">click on finish ride button if you have completed the ride.</p>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
