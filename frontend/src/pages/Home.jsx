import React, { useState, useRef, useEffect, useContext} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { useLocationSuggestions } from "../hooks/useLocation";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState("");
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState("");
  const [ride, setRide] = useState(null);

  const { user } = useContext(UserDataContext);
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket || !user?._id) return;

    socket.emit("join", {
      userType: "user",
      userId: user._id,
    });
  }, [socket, user]);

  socket.on("ride-confirmed", (data) => {
    setRide(data);
    setVehicleFound(false);
    setWaitingForDriver(true);
  });

  socket.on("ride-started", (data) => {
    setWaitingForDriver(false);
    navigate("/riding", {state: { ride: data }});
  });

  useLocationSuggestions(pickup, setPickupSuggestions);
  useLocationSuggestions(destination, setDestinationSuggestions);

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: 24,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        padding: 0,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePanelOpen]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingForDriver]);

  async function getFareEstimation(pickup, destination) {    
    try {
      setPanelOpen(false);
      setVehiclePanelOpen(true);
      const response = await fetch( `${import.meta.env.VITE_API_URL}/rides/fare-estimate?pickup=${encodeURIComponent(
        pickup
      )}&destination=${encodeURIComponent(destination)}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      setFare(data);
    } catch (error) {
      console.error("Error fetching fare estimation:", error);
    }
  }

  async function createRide() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/rides/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          pickup,
          destination,
          vehicleType
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error creating ride:", error);
    }
  }

  return (
    <div className="h-screen relative overflow-hidden">
      <img className="w-16 absolute left-5 top-5" src="/assets/images/uber-logo-black.png" alt="Home"/>
      <div className="h-screen w-screen">
        {/* image for temporary use */}
        <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="test-img"/>
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[35%] bg-white p-6 relative">
          <h5
            ref={panelCloseRef}
            className="absolute top-3 right-6 text-2xl opacity-0"
            onClick={() => setPanelOpen(false)}
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Plan your trip</h4>
          <form className="relative py-3" onSubmit={(e) => e.preventDefault()}>
            <div className="line absolute h-13 w-1 top-[32%] left-[22.1px] bg-gray-700 rounded-full"></div>
            <i className="ri-circle-fill absolute w-3 h-3 left-4 top-[25%]"></i>
            <i className="ri-square-fill absolute w-3 h-3 left-4 top-[65%]"></i>
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Add a pickup location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
            />
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destinationPoint");
              }}
            />
          </form>
          <button className="bg-black text-white px-6 py-2 rounded-lg w-full"
          onClick={() => getFareEstimation(pickup, destination)}
          >Find Trip</button>
        </div>
        <div ref={panelRef} className="h-0 bg-white">
          <LocationSearchPanel
            suggestions={ activeField === "pickup" ? pickupSuggestions : destinationSuggestions }
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-10 translate-y-full pt-12"
      >
        <VehiclePanel
          setVehicleType={setVehicleType}
         setConfirmRidePanel={setConfirmRidePanel} setVehiclePanelOpen={setVehiclePanelOpen} fare={fare} />
      </div>
      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-10 translate-y-full pt-12"
      >
        <ConfirmRide 
        createRide={createRide}
        pickup={pickup} destination={destination} fare={fare} vehicleType={vehicleType}
        setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>
      <div
      ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-10 translate-y-full pt-12"
      >
        <LookingForDriver 
        setVehicleFound={setVehicleFound} pickup={pickup} destination={destination} fare={fare} vehicleType={vehicleType}/>
      </div>
      <div
      ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-10 translate-y-full pt-12"
      >
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver} ride={ride}/>
      </div>
    </div>
  );
};

export default Home;
