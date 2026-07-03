import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    toast.success("Registration Successful! Redirecting to login...");
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 border rounded-xl shadow bg-base-100">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <div className="form-control">
          <label className="label"><span className="label-text">Name</span></label>
          <input type="text" className="input input-bordered" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Email</span></label>
          <input type="email" className="input input-bordered" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Photo URL</span></label>
          <input type="url" className="input input-bordered" value={photoUrl} onChange={e => setPhotoUrl(e.target.value)} />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Password</span></label>
          <input type="password" className="input input-bordered" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary w-full">Register</button>
      </form>
      <p className="text-sm text-center mt-4">
        Have an account? <Link to="/login" className="text-primary link">Login here</Link>
      </p>
    </div>
  );
}