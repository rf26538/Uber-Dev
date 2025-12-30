import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { SocketContext } from "../context/SocketContext";

const Riding = () => {
  const location = useLocation();
  const ride = location.state?.ride;
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);

  socket.on("ride-ended", (data) => {
    navigate("/home");
  });


  return (
    <div className="h-screen">
        <Link to="/home" className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full">
        <i className="ri-home-4-line text-lg font-medium"></i>
        </Link>
      <div className="h-1/2">
        {/* image for temporary use */}
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        />
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-10"
            src="/assets/images/uber-car.webp"
            alt="uber-car"
          />
          <div className="text-right">
            <h2 className="text-lg font-medium">{ride?.captain?.fullname?.firstname}</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride?.captain?.vehicle?.plate}</h4>
            <p className="font-sm text-gray-600">Maruti Suzuki Alto</p>
          </div>
        </div>
        <div className="flex flex-col justify-between items-center gap-2">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
              <i className="ri-map-pin-2-line text-lg"></i>
              <div className="">
                <h3 className="text-lg font-medium">562/11 -A</h3>
                <p className="text-sm -mt-1 text-gray-600">
                  {ride?.pickup}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3">
              <i className="ri-currency-line text-lg"></i>
              <div className="">
                <h3 className="text-lg font-medium">562/11 -A</h3>
                <p className="text-sm -mt-1 text-gray-600">
                  {ride?.destination} 
                </p>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">Make a Payment</button>
      </div>
    </div>
  );
};

export default Riding;
