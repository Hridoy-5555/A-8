"use html"
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth";
import toast from "react-hot-toast";

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Successfully logged out");
    router.push("/login");
  };

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-4 md:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-2">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/courses">Courses</Link></li>
            {session && <li><Link href="/my-profile">My Profile</Link></li>}
          </ul>
        </div>
        <Link href="/" className="text-xl font-black tracking-tight text-primary">
          🎓 SkillSphere
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4 font-medium">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/courses">Courses</Link></li>
          {session && <li><Link href="/my-profile">My Profile</Link></li>}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {!isPending && (
          session ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-primary">
                <div className="w-10 rounded-full">
                  <img alt="User profile image avatar" src={session.user.image || "https://placehold.co/150"} />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li className="px-4 py-2 font-semibold text-gray-500 border-b mb-1">{session.user.name}</li>
                <li><Link href="/my-profile">View Profile</Link></li>
                <li><button onClick={handleLogout} className="text-error font-medium">Logout</button></li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/login" className="btn btn-outline btn-primary btn-sm md:btn-md normal-case">Login</Link>
              <Link href="/register" className="btn btn-primary btn-sm md:btn-md normal-case">Register</Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}