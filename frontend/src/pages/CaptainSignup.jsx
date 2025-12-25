import React, { useState, useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import { Link ,useNavigate } from 'react-router-dom';

const CaptainSignup = () => {
  const navigate = useNavigate();

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      fullname: {
        firstname : FirstName,
        lastname : LastName,
      },
      email : email,
      password : password,
      vehicle : {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        type: vehicleType,
      }
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/captains/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(captainData),
      }
    );

    const data = await response.json();

    if (response.status === 201) {
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleCapacity("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleType("");
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div className="">
        <img
          src="/assets/images/uber-logo-driver.png"
          alt="Uber Logo"
          className="w-16 mb-2"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's our Captain's name</h3>
          <div className="flex gap-4 mb-3">
            <input
              required
              type="text"
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
              placeholder="First Name"
              value={FirstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <input
              required
              type="text"
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
              placeholder="Last Name"
              value={LastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's our Captain's email</h3>
          <input
            required
            type="email"
            className="bg-[#eeeeee] mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            type="password"
            className="bg-[#eeeeee] mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
          <div className='flex gap-4 mb-1'>
            <input
              required
              type="text"
              className="bg-[#eeeeee] rounded-lg px-4 py-2 w-1/2 text-lg placeholder:text-base mb-5"
              placeholder="Vehicle Color"
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value);
              }}
            />
            <input
              required
              type="text"
              className="bg-[#eeeeee] rounded-lg px-4 py-2 w-1/2 text-lg placeholder:text-base mb-5"
              placeholder="Vehicle Plate"
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value);
              }}
            />
            </div>
          <div className='flex gap-4 mb-1'>
            <input
              required
              type="text"
              className="bg-[#eeeeee] rounded-lg px-4 py-2 w-1/2 text-lg placeholder:text-base mb-5"
              placeholder="Vehicle Capacity"
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value);
              }}
            />
            <select 
              required
              className="bg-[#eeeeee] rounded-lg px-4 py-2 w-1/2 text-lg placeholder:text-base mb-5"
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value);
              }}
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="bike">Bike</option>
            </select>
          </div>
          <button
            className="bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            type="submit"
          >
            Create Captain Account
          </button>
        </form>
        <p className="text-center mb-2">
          Already have an account?
          <Link to="/captain-login" className="text-center text-blue-600 ">
            Login here
          </Link>
        </p>
      </div>
      <div className="">
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the Google
          <Link to="#" className="text-blue-600 underline">
            Privacy Policy
          </Link>
          and
          <Link to="#" className="text-blue-600 underline">
            Terms of Service
          </Link>
          apply.
        </p>
      </div>
    </div>
  );
}

export default CaptainSignup