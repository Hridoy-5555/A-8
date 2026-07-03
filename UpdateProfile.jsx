import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function UpdateProfile({ user, setUser }) {
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, name, image };
    
    localStorage.setItem("skillsphere_user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    toast.success("Profile details updated successfully!");
    navigate("/profile");
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 border rounded-xl bg-base-100">
      <h2 className="text-xl font-bold mb-4">Update Student Information</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="form-control">
          <label className="label"><span className="label-text">Name</span></label>
          <input type="text" className="input input-bordered" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Image URL</span></label>
          <input type="url" className="input input-bordered" value={image} onChange={e => setImage(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary w-full">Save and Update Information</button>
      </form>
    </div>
  );
}