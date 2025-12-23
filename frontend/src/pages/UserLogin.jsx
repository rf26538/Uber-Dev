import React, {useState} from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({ email, password });
    setEmail("");
    setPassword("");
    console.log(userData);
  }

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div className="">
        <img
          src="/assets/images/uber-logo-black.png"
          alt="Uber Logo"
          className="w-16 mb-10"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-sm"
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-sm"
            placeholder="password"
          />
          <button
            className="bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-sm"
            type="submit"
          >
            Login
          </button>
        </form>
          <p className="text-center ">New here? <Link to="/signup" className="text-center text-blue-600">Create an account</Link></p> 
      </div>
      <div className="">
        <Link to="/captain-login" className="bg-[#10953e] flex flex-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-sm">Sign in as Captain</Link>
      </div>
    </div>
  );
};

export default UserLogin;
