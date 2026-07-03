import React from "react";
import { Link } from "react-router-dom";

export default function Profile({ user }) {
  return (
    <div className="max-w-md mx-auto my-12 p-6 border rounded-xl shadow-lg bg-base-100 text-center">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <div className="avatar mb-4">
        <div className="w-24 rounded-full">
          <img src={user?.image || "https://placehold.co/150"} alt="User profile" />
        </div>
      </div>
      <p className="text-lg font-medium">{user?.name}</p>
      <p className="text-gray-500 text-sm mb-6">{user?.email}</p>
      <Link to="/profile/update" className="btn btn-outline btn-primary btn-sm btn-block">
        Update Information
      </Link>
    </div>
  );
}