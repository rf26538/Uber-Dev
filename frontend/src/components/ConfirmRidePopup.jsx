import { useState } from "react";
import { Link } from "react-router-dom";

const ConfirmRidePopup = ({ setConfirmRidePopupPanel, setRidePopupPanel }) => {
  const [otp, setOtp] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h5
        className="p-1 w-[93%] text-center absolute top-0"
        onClick={() => setRidePopupPanel(false)}
      >
        <i className="ri-arrow-down-wide-fill text-3xl text-gray-300"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-4">
        Confirm this ride to Start
      </h3>
      <div className="flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Yf92meLNpAnVV99uCNLOxFznGt-VaSuWwQ&s"
            alt="random-img"
          />
          <h2 className="text-lg font-medium">Harshi Patelia</h2>
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
              <h3 className="text-lg font-medium">₹193.20</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Cash Cash
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 w-full">
          <form onSubmit={(e) => submitHandler(e)}>
            <input
              className="bg-[#eee] px-6 py-4 font-mono text-base rounded-lg w-full mb-3"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Link
              to="/captain-riding"
              className="w-full mt-1 flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg"
            >
              {" "}
              Confirm{" "}
            </Link>
            <button
              className="w-full mt-1 bg-red-600 text-white font-semibold p-3 rounded-lg"
              onClick={() => {
                setRidePopupPanel(false);
                setConfirmRidePopupPanel(false);
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopup;
