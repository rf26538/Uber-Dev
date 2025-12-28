import { useState , useContext } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainLogin = () => {

  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {captain, setCaptain} = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      email,
      password,
    };

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/captains/login`,
      {
      method: "POST",
      headers: {  
        "Content-Type": "application/json",
      },
      body: JSON.stringify(captainData),
    });

    const data = await response.json();

    if (response.status === 200) {  
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    setEmail("");
    setPassword("");

  }

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div className="">
        <img
          src="/assets/images/uber-logo-driver.png"
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
          <p className="text-center ">Join a fleet? <Link to="/captain-signup" className="text-center text-blue-600">Register as a Captain</Link></p> 
      </div>
      <div className="">
        <Link to="/login" className="bg-[#d5622d] flex flex-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-sm">Sign in as User</Link>
      </div>
    </div>
  );
}

export default CaptainLogin