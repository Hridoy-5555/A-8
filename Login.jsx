import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (email && password) {
      const mockUser = {
        name: "Alex Mercer",
        email: email,
        image: "https://i.pravatar.cc/150?img=33"
      };
      localStorage.setItem("skillsphere_user", JSON.stringify(mockUser));
      setUser(mockUser);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } else {
      toast.error("Please fill out all credentials.");
    }
  };

  const handleGoogleLogin = () => {
    const googleUser = {
      name: "Google Student",
      email: "googleuser@gmail.com",
      image: "https://i.pravatar.cc/150?img=12"
    };
    localStorage.setItem("skillsphere_user", JSON.stringify(googleUser));
    setUser(googleUser);
    toast.success("Google Sign-In Successful!");
    navigate("/", { replace: true });
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 border rounded-xl shadow bg-base-100">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="form-control">
          <label className="label"><span className="label-text">Email</span></label>
          <input type="email" className="input input-bordered" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Password</span></label>
          <input type="password" className="input input-bordered" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary w-full">Login</button>
      </form>
      <div className="divider">OR</div>
      <button onClick={handleGoogleLogin} className="btn btn-outline btn-block">Continue with Google</button>
      <p className="text-sm text-center mt-4">
        Need an account? <Link to="/register" className="text-primary link">Register here</Link>
      </p>
    </div>
  );
}