"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import coursesData from "@/data/courses.json";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  // Simulated Authorization Guard Check (Change to real session parsing context as needed)
  const isLoggedIn = true; 

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Authentication check failed. Route access restricted.");
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  const course = coursesData.find(c => c.id === Number(id));

  if (!course) {
    return (
      <div className="text-center py-24">
        <h2 className="text-2xl font-bold text-error">Target Data Entity ID Not Found</h2>
        <Link href="/courses" className="btn btn-primary mt-4">Return to Main Course Registry</Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-6">
        <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden shadow-lg">
          <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold">{course.title}</h1>
        <p className="text-gray-600 text-lg leading-relaxed">{course.description}</p>

        {/* Static Static Curriculum Component Array */}
        <div className="bg-base-200 p-6 rounded-2xl">
          <h3 className="text-xl font-bold mb-4">📦 Program Architecture Curriculum</h3>
          <div className="join join-vertical w-full bg-base-100">
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="my-accordion-4" defaultChecked />
              <div className="collapse-title text-md font-bold">Module 1: Initialization & Fundamentals</div>
              <div className="collapse-content text-sm text-gray-500">System infrastructure deployment parameters and structural syntax overview.</div>
            </div>
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-md font-bold">Module 2: Structural Design Framework Patterns</div>
              <div className="collapse-content text-sm text-gray-500">Advanced dynamic state handling configurations.</div>
            </div>
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-md font-bold">Module 3: Production Builds & Deployment optimization</div>
              <div className="collapse-content text-sm text-gray-500">Edge distribution networks configuration runtime checks.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Meta Sidebar Wrapper */}
      <div className="card bg-base-100 border shadow-xl p-6 h-fit space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm"><span className="text-gray-400">Instructor:</span><strong>{course.instructor}</strong></div>
          <div className="flex justify-between text-sm"><span className="text-gray-400">Total Duration:</span><strong>{course.duration}</strong></div>
          <div className="flex justify-between text-sm"><span className="text-gray-400">Skill Tier Level:</span><strong>{course.level}</strong></div>
          <div className="flex justify-between text-sm"><span className="text-gray-400">Current Rating:</span><strong className="text-amber-500">⭐ {course.rating}</strong></div>
        </div>
        <button onClick={() => toast.success("Successfully registered for course track updates!")} className="btn btn-primary btn-block mt-4">
          Enroll Now
        </button>
      </div>
    </div>
  );


}

"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "hridoy@gmail.com" && password === "password123") {
      toast.success("Welcome back, Hridoy!");
      router.push("/");
    } else {
      toast.error("Invalid credentials setup profile configuration error.");
    }
  };

  const handleGoogleLogin = () => {
    toast.success("Logged in with Google Secure Client Pipeline!");
    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto card bg-base-100 shadow-2xl border border-gray-100 p-8 mt-12">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Account Login</h2>
      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div className="form-control">
          <label className="label font-semibold text-sm">Email Address</label>
          <input type="email" placeholder="name@domain.com" className="input input-bordered input-primary" required value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-control">
          <label className="label font-semibold text-sm">Password</label>
          <input type="password" placeholder="••••••••" className="input input-bordered input-primary" required value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary btn-block mt-4">Sign In</button>
      </form>
      <div className="divider text-xs text-gray-400 my-6">OR CONTINUE WITH</div>
      <button onClick={handleGoogleLogin} className="btn btn-outline btn-block gap-2 border-gray-300 hover:bg-gray-50">
        Google Sync Authentication
      </button>
      <p className="text-center text-sm text-gray-500 mt-6">
        New to the platform? <Link href="/register" className="link link-primary font-semibold">Create an account</Link>
      </p>
    </div>
  );
}
"use client";
import { useState } from "react";
import Link from "next/next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(name && email && password) {
      toast.success("Account constructed successfully!");
      router.push("/login");
    } else {
      toast.error("Form parsing constraints processing verification breakdown.");
    }
  };

  return (
    <div className="max-w-md mx-auto card bg-base-100 shadow-2xl border border-gray-100 p-8 mt-4">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">User Registration</h2>
      <form onSubmit={handleRegisterSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label font-semibold text-sm">Full Name</label>
          <input type="text" placeholder="John Doe" className="input input-bordered input-primary" required value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="form-control">
          <label className="label font-semibold text-sm">Email Address</label>
          <input type="email" placeholder="name@domain.com" className="input input-bordered input-primary" required value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-control">
          <label className="label font-semibold text-sm">Profile Avatar Image Link URL</label>
          <input type="url" placeholder="https://image-bucket.com/avatar.png" className="input input-bordered input-primary" value={photoUrl} onChange={e => setPhotoUrl(e.target.value)} />
        </div>
        <div className="form-control">
          <label className="label font-semibold text-sm">Password Secure Token</label>
          <input type="password" placeholder="••••••••" className="input input-bordered input-primary" required value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary btn-block mt-4">Register System Account</button>
      </form>
      <div className="divider text-xs text-gray-400 my-4">OR USE</div>
      <button onClick={() => { toast.success("Authenticated with Google Sync!"); router.push("/"); }} className="btn btn-outline btn-block gap-2">
        Google OAuth Enrollment
      </button>
      <p className="text-center text-sm text-gray-500 mt-4">
        Already possess an account entry? <Link href="/login" className="link link-primary font-semibold">Access Login</Link>
      </p>
    </div>
  );
}
import Link from "next/link";

export default function ProfilePage() {
  // Static context instance mimicking data configuration elements mapping
  const activeUser = {
    name: "Hridoy",
    email: "hridoy@gmail.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
  };

  return (
    <div className="max-w-2xl mx-auto bg-base-100 border shadow-xl rounded-3xl p-8 mt-12 text-center">
      <div className="avatar mb-4">
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={activeUser.avatar} alt="User Avatar" />
        </div>
      </div>
      <h2 className="text-3xl font-extrabold">{activeUser.name}</h2>
      <p className="text-sm text-gray-400 mt-1">{activeUser.email}</p>
      
      <div className="divider my-6">System Privileges Dashboard</div>
      
      <div className="grid grid-cols-2 gap-4 text-left mb-6">
        <div className="bg-base-200 p-4 rounded-xl text-center"><span className="block text-xs text-gray-400 uppercase">Courses Status</span><strong className="text-xl text-primary">3 Enrolled</strong></div>
        <div className="bg-base-200 p-4 rounded-xl text-center"><span className="block text-xs text-gray-400 uppercase">System Tier</span><strong className="text-xl text-secondary">Premium Learner</strong></div>
      </div>

      <Link href="/my-profile/update" className="btn btn-primary btn-block">
        Update Profile Details
      </Link>
    </div>
  );
}
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("Hridoy");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Logic aligns explicitly with Better-Auth integration documentation:
      // await authClient.updateUser({ name, image: imageUrl });
      
      toast.success("Profile variables adjusted successfully!");
      router.push("/my-profile");
    } catch (err) {
      toast.error("Profile context compilation error execution aborted.");
    }
  };

  return (
    <div className="max-w-md mx-auto card bg-base-100 border shadow-xl p-8 mt-12">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Modify System Identity Info</h3>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="form-control">
          <label className="label font-semibold text-sm">Updated Account Name</label>
          <input type="text" className="input input-bordered input-primary" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="form-control">
          <label className="label font-semibold text-sm">Updated Display Avatar URL Link</label>
          <input type="url" className="input input-bordered input-primary" value={imageUrl} onChange={e => setImageUrl(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-secondary btn-block mt-4">
          Save Profile Updates
        </button>
      </form>
    </div>
  );
}