import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/userContext";

const UserSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname: {
        firstname : firstName,
        lastname : lastName,
      },
      email : email,
      password : password,
    };

    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const data = await response.json();
    if (response.status === 201) {
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    } 

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div className="">
        <img
          src="/assets/images/uber-logo-black.png"
          alt="Uber Logo"
          className="w-16 mb-10"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className="flex gap-4 mb-5">
            <input
              required
              type="text"
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <input
              required
              type="text"
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            type="email"
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
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
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className="bg-[#111] text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            type="submit"
          >
            Create account
          </button>
        </form>
        <p className="text-center ">
          Already have an account?
          <Link to="/login" className="text-center text-blue-600">
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
};

export default UserSignup;
