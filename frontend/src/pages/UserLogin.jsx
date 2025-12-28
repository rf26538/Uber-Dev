import React, {useState, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
      const userData = { 
        email : email, 
        password : password
      };

      const response =  await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.status === 200) {
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }

    setEmail("");
    setPassword("");
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
