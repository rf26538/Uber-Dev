import { useState, useRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopup from "../components/RidePopup";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);
  const [ride, setRide] = useState(null)
  
  useEffect(() => {
    if (!socket || !captain?._id) return;
  
    socket.emit("join", {
      userType: "captain",
      userId: captain._id,
    });
  
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location :  {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
        });
      }
    };
  
    updateLocation(); // initial update
    const locationInterval = setInterval(updateLocation, 5000);
  
    return () => clearInterval(locationInterval);
  }, [socket, captain]);
  
  socket.on("new-ride", (data) => {
    console.log("here",data);
    setRide(data);
    setRidePopupPanel(true);
  })

  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ridePopupPanel]);

  useGSAP(() => {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePopupPanel]);

  const confirmRide = async () => {
    const responce = await fetch(`${import.meta.env.VITE_API_URL}/rides/confirm/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        rideId : ride._id,
        captainId : captain._id
      }) 
    });
    if (responce.ok) {
      setRidePopupPanel(false);
      setConfirmRidePopupPanel(true);
    }
  };

  return (
    <div>
      <div className="h-screen">
        <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
          <img
            className="w-16"
            src="/assets/images/uber-logo-black.png"
            alt="Home"
          />
          <Link
            to="/captain-home"
            className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
          >
            <i className="ri-logout-box-r-line text-lg font-medium"></i>
          </Link>
        </div>
        <div className="h-3/5">
          {/* image for temporary use */}
          <img
            className="h-full w-full object-cover"
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          />
        </div>
        <div className="h-2/5 p-6">
          <CaptainDetails />
        </div>
        <div
          ref={ridePopupPanelRef}
          className="fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12 translate-y-full"
        >
          <RidePopup
            ride={ride}
            setRidePopupPanel={setRidePopupPanel}
            setConfirmRidePopupPanel={setConfirmRidePopupPanel}
            confirmRide={confirmRide}
          />
        </div>
        <div
          ref={confirmRidePopupPanelRef}
          className="fixed w-full h-screen z-10 bottom-0 bg-white px-3 py-10 pt-12 translate-y-full"
        >
          <ConfirmRidePopup
            setConfirmRidePopupPanel={setConfirmRidePopupPanel}
            setRidePopupPanel={setRidePopupPanel}
          />
        </div>
      </div>
    </div>
  );
};

export default CaptainHome;
