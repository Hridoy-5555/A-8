"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Navbar() {
  const router = useRouter();
  
  // Simulated Auth States for testing layouts (Connect to authClient hook in production)
  const user = { name: "Hridoy", avatar: "https://placehold.co/100" }; 
  const isLoggedIn = true; 

  const handleLogout = () => {
    toast.success("Successfully logged out!");
    router.push("/");
  };

  return (
    <div className="navbar bg-base-200 shadow-md px-4 sm:px-8">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl font-bold text-primary tracking-wide">
          SkillSphere
        </Link>
      </div>
      <div className="flex-none gap-4">
        <ul className="menu menu-horizontal px-1 gap-2 font-medium">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/courses">Courses</Link></li>
        </ul>

        {isLoggedIn ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-primary">
              <div className="w-10 rounded-full">
                <img alt="User profile" src={user.avatar} />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl">
              <li><Link href="/my-profile">My Profile</Link></li>
              <li><button onClick={handleLogout} className="text-red-500 font-bold">Logout</button></li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link href="/login" className="btn btn-outline btn-primary btn-sm sm:btn-md">Login</Link>
            <Link href="/register" className="btn btn-primary btn-sm sm:btn-md">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
}