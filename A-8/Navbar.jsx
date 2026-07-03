import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("skillsphere_user");
    setUser(null);
    toast.success("Logged out clean.");
    navigate("/login");
  };

  return (
    <nav className="navbar bg-base-100 shadow-md px-4 md:px-8">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl font-bold text-primary">
          SkillSphere
        </Link>
      </div>
      <div className="flex-none gap-4">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          {user && <li><Link to="/profile">My Profile</Link></li>}
        </ul>

        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.image || "https://placehold.co/100"} alt="Avatar" />
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li><button onClick={handleLogout} className="text-error">Logout</button></li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
            <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}