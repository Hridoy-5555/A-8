import Link from "next/link";
import coursesData from "@/data/courses.json";

export default function HomePage() {
  // Logic: Popular = top 3 highest-rated
  const popularCourses = [...coursesData].sort((a, b) => b.rating - a.rating).slice(0, 3);
  // Requirement: Extra section showcasing Trending/New Releases
  const trendingCourses = [...coursesData].slice(3, 6);

  return (
    <div className="w-full space-y-20 pb-20">
      {/* 🎥 HERO SECTION */}
      <section className="hero min-h-[60vh] bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-b-3xl shadow-xl px-4">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">Upgrade Your Skills Today 🚀</h1>
            <p className="text-md md:text-lg opacity-90 font-medium mb-8">
              Learn from Industry Experts. Unlock access to deep development, creative design, and growth marketing systems.
            </p>
            <Link href="/courses" className="btn btn-neutral btn-lg normal-case border-none px-8 text-white shadow-lg shadow-neutral/40 hover:scale-105 transition-transform">
              Explore All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* 🔥 POPULAR COURSES SECTION */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">🔥 Popular Courses</h2>
          <p className="text-gray-500 mt-2">Our top-voted and highest-rated community specializations.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularCourses.map((course) => (
            <div key={course.id} className="card bg-base-100 shadow-xl border border-base-200">
              <figure className="px-4 pt-4"><img src={course.image} alt={course.title} className="rounded-xl h-48 w-full object-cover" /></figure>
              <div className="card-body">
                <span className="badge badge-secondary font-bold text-xs self-start mb-2">⭐ {course.rating}</span>
                <h3 className="card-title text-lg font-bold leading-snug">{course.title}</h3>
                <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
                <div className="card-actions justify-end mt-4">
                  <Link href={`/courses/${course.id}`} className="btn btn-primary btn-block normal-case">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 👉 EXTRA REQUIRED REQUIREMENT: TRENDING / NEW RELEASES */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl text-secondary">👉 New Releases & Trending</h2>
          <p className="text-gray-500 mt-2">Fresh courses added to the curriculum platform map this week.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trendingCourses.map((course) => (
            <div key={course.id} className="card bg-base-100 shadow-xl border border-base-200">
              <figure className="px-4 pt-4"><img src={course.image} alt={course.title} className="rounded-xl h-48 w-full object-cover" /></figure>
              <div className="card-body">
                <span className="badge badge-accent font-bold text-xs self-start mb-2">New Arrival</span>
                <h3 className="card-title text-lg font-bold ">{course.title}</h3>
                <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
                <div className="card-actions justify-end mt-4">
                  <Link href={`/courses/${course.id}`} className="btn btn-outline btn-secondary btn-block normal-case">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 📌 LEARNING TIPS SECTION */}
      <section className="bg-base-200 py-16 px-4 rounded-3xl max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">📌 Strategic Learning Blueprints</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="flex gap-4 items-start bg-base-100 p-6 rounded-2xl shadow-sm">
            <span className="text-3xl">⏱️</span>
            <div>
              <h3 className="text-lg font-bold mb-1">The Pomodoro Engine</h3>
              <p className="text-sm text-gray-500">Study intently for 25 continuous minutes, followed by a crisp 5-minute cognitive reset phase.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start bg-base-100 p-6 rounded-2xl shadow-sm">
            <span className="text-3xl">📝</span>
            <div>
              <h3 className="text-lg font-bold mb-1">Active Synthesis Mapping</h3>
              <p className="text-sm text-gray-500">Never consume documentation passively. Write small micro-applications to internalize programmatic logic blocks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🏆 TOP INSTRUCTORS SECTION */}
      <section className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">🏆 Lead System Architects</h2>
        <p className="text-gray-500 mb-10">Learn alongside enterprise mentors from global backgrounds.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {["John Doe", "Jane Smith", "Sarah Jenkins"].map((name, i) => (
            <div key={i} className="bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm flex flex-col items-center">
              <div className="avatar mb-4">
                <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={`https://i.pravatar.cc/150?img=${i + 12}`} alt={name} />
                </div>
              </div>
              <h3 className="font-bold text-lg">{name}</h3>
              <p className="text-xs text-primary font-semibold mt-1">Lead Instructor</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
"use html"
"use client";
import { useState } from "react";
import Link from "next/link";
import coursesData from "@/data/courses.json";

export default function AllCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = coursesData.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h1 className="text-3xl font-extrabold md:text-4xl mb-4">All Educational Curriculums</h1>
        <p className="text-gray-500 mb-6">Filter across our catalog instantly using our local indexing layer.</p>
        
        {/* 🔍 CHALLENGE 1 INPUT SECTION */}
        <div className="form-control w-full">
          <input
            type="text"
            placeholder="Search courses dynamically by title..."
            className="input input-bordered input-primary w-full shadow-inner text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center py-20 text-gray-400 font-medium">
          No matching course configurations found for "{searchQuery}".
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div key={course.id} className="card bg-base-100 shadow-md hover:shadow-xl border border-base-200 transition-all flex flex-col h-full">
              <figure><img src={course.image} alt={course.title} className="h-48 w-full object-cover" /></figure>
              <div className="card-body flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="badge badge-neutral text-xs font-bold">{course.category}</span>
                    <span className="text-xs text-gray-500 font-semibold">{course.level}</span>
                  </div>
                  <h2 className="card-title text-lg font-bold leading-snug mb-1">{course.title}</h2>
                  <p className="text-xs text-gray-400 mb-2">By {course.instructor} • {course.duration}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
                </div>
                <div className="card-actions mt-6">
                  <Link href={`/courses/${course.id}`} className="btn btn-primary btn-block normal-case">
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
"use html"
"use client";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth";
import coursesData from "@/data/courses.json";
import toast from "react-hot-toast";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CourseDetailsPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const { data: session, isPending } = authClient.useSession();

  const course = coursesData.find((c) => c.id === parseInt(id));

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Authentication required! Redirecting to login...");
      router.push(`/login?redirectTo=/courses/${id}`);
    }
  }, [session, isPending, router, id]);

  if (isPending || !session) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-20 font-bold text-xl">
        Requested Course Profile Configuration Not Found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2 space-y-6">
          <img src={course.image} alt={course.title} className="w-full h-72 md:h-96 object-cover rounded-3xl shadow-md" />
          <h1 className="text-3xl font-black">{course.title}</h1>
          <p className="text-gray-600 leading-relaxed text-md">{course.description}</p>
          
          <div className="divider"></div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">📚 Course Curriculum (Static Array Roadmap)</h2>
            <div className="bg-base-200 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-base-300 pb-2">
                <span className="font-semibold text-sm">Module 1: Fundamental Conceptual Onboarding</span>
                <span className="badge badge-outline badge-sm">Static Assets</span>
              </div>
              <div className="flex justify-between items-center border-b border-base-300 pb-2">
                <span className="font-semibold text-sm">Module 2: Advanced Core Methodologies</span>
                <span className="badge badge-outline badge-sm">Static Assets</span>
              </div>
              <div className="flex justify-between items-center border-b border-base-300 pb-2">
                <span className="font-semibold text-sm">Module 3: Optimization & Deployments Architecture</span>
                <span className="badge badge-outline badge-sm">Static Assets</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl border border-base-200 p-6 space-y-4">
          <h3 className="text-lg font-bold border-b pb-2">Course Metrics</h3>
          <div className="space-y-2 text-sm font-medium">
            <p className="flex justify-between"><span>Instructor:</span> <span className="text-gray-500">{course.instructor}</span></p>
            <p className="flex justify-between"><span>Duration:</span> <span className="text-gray-500">{course.duration}</span></p>
            <p className="flex justify-between"><span>Rating:</span> <span className="text-warning">★ {course.rating}</span></p>
            <p className="flex justify-between"><span>Level:</span> <span className="text-gray-500">{course.level}</span></p>
          </div>
          <button onClick={() => toast.success("Enrollment mechanism sequence updated successfully!")} className="btn btn-primary btn-block normal-case mt-4">
            Enroll In Course
          </button>
        </div>
      </div>
    </div>
  );
}
"use html"
"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await authClient.signIn.email({ email, password });
      if (error) throw new Error(error.message);
      
      toast.success("Welcome back to SkillSphere!");
      router.push(redirectTo);
    } catch (err: any) {
      toast.error(err.message || "Invalid credentials execution frame.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectTo
      });
      toast.success("Redirecting via Google Authentication Ecosystem...");
    } catch (err: any) {
      toast.error("Google Auth interface connection failed.");
    }
  };

  return (
    <div className="min-h-[75vh] flex justify-center items-center px-4 py-12">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-200 p-8">
        <h2 className="text-2xl font-black text-center text-neutral mb-6">Log In This Application</h2>
        <form onSubmit={handleCredentialsLogin} className="space-y-4">
          <div className="form-control">
            <label className="label"><span className="label-text font-bold">Email Address</span></label>
            <input type="email" placeholder="you@domain.com" className="input input-bordered w-full" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text font-bold">Password</span></label>
            <input type="password" placeholder="••••••••" className="input input-bordered w-full" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary btn-block normal-case mt-4">
            {loading ? <span className="loading loading-spinner"></span> : "Log In"}
          </button>
        </form>

        <div className="divider text-xs text-gray-400 font-bold my-6">OR CONTINUE WITH</div>
        
        <button onClick={handleGoogleLogin} className="btn btn-outline btn-block border-gray-300 normal-case flex items-center justify-center gap-2">
          🌐 Sign in with Google
        </button>

        <p className="text-center text-xs text-gray-500 font-medium mt-6">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary link link-hover font-bold">Register here</Link>
        </p>
      </div>
    </div>
  );
}
"use html"
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        email,
        password,
        name,
        image: photoUrl || undefined,
      });

      if (error) throw new Error(error.message);

      toast.success("Registration completed successfully!");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.message || "Registration sequence encountered anomalies.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSocial = async () => {
    try {
      await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    } catch (err: any) {
      toast.error("Google Registration configuration failure.");
    }
  };

  return (
    <div className="min-h-[85vh] flex justify-center items-center px-4 py-12">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-200 p-8">
        <h2 className="text-2xl font-black text-center text-neutral mb-6">Create New Account</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="form-control">
            <label className="label"><span className="label-text font-bold">Full Name</span></label>
            <input type="text" placeholder="John Doe" className="input input-bordered w-full" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text font-bold">Email Address</span></label>
            <input type="email" placeholder="john@domain.com" className="input input-bordered w-full" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text font-bold">Photo URL Link</span></label>
            <input type="url" placeholder="https://i.postimg.cc/avatar.png" className="input input-bordered w-full" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text font-bold">Password</span></label>
            <input type="password" placeholder="••••••••" className="input input-bordered w-full" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary btn-block normal-case mt-4">
            {loading ? <span className="loading loading-spinner"></span> : "Register"}
          </button>
        </form>

        <div className="divider text-xs text-gray-400 font-bold my-6">OR REGISTER WITH</div>
        <button onClick={handleGoogleSocial} className="btn btn-outline btn-block border-gray-300 normal-case gap-2">
          🌐 Register with Google
        </button>

        <p className="text-center text-xs text-gray-500 font-medium mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary link link-hover font-bold">Login here</Link>
        </p>
      </div>
    </div>
  );
}
"use html"
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        email,
        password,
        name,
        image: photoUrl || undefined,
      });

      if (error) throw new Error(error.message);

      toast.success("Registration completed successfully!");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.message || "Registration sequence encountered anomalies.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSocial = async () => {
    try {
      await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    } catch (err: any) {
      toast.error("Google Registration configuration failure.");
    }
  };

  return (
    <div className="min-h-[85vh] flex justify-center items-center px-4 py-12">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-200 p-8">
        <h2 className="text-2xl font-black text-center text-neutral mb-6">Create New Account</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="form-control">
            <label className="label"><span className="label-text font-bold">Full Name</span></label>
            <input type="text" placeholder="John Doe" className="input input-bordered w-full" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text font-bold">Email Address</span></label>
            <input type="email" placeholder="john@domain.com" className="input input-bordered w-full" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text font-bold">Photo URL Link</span></label>
            <input type="url" placeholder="https://i.postimg.cc/avatar.png" className="input input-bordered w-full" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text font-bold">Password</span></label>
            <input type="password" placeholder="••••••••" className="input input-bordered w-full" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary btn-block normal-case mt-4">
            {loading ? <span className="loading loading-spinner"></span> : "Register"}
          </button>
        </form>

        <div className="divider text-xs text-gray-400 font-bold my-6">OR REGISTER WITH</div>
        <button onClick={handleGoogleSocial} className="btn btn-outline btn-block border-gray-300 normal-case gap-2">
          🌐 Register with Google
        </button>

        <p className="text-center text-xs text-gray-500 font-medium mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary link link-hover font-bold">Login here</Link>
        </p>
      </div>
    </div>
  );
}
"use html"
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient, updateUserProfile } from "@/lib/auth";
import toast from "react-hot-toast";

export default function ProfileUpdatePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!isPending) {
      if (!session) {
        router.push("/login");
      } else {
        setName(session.user.name || "");
        setPhotoUrl(session.user.image || "");
      }
    }
  }, [session, isPending, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      // Executes precisely the code required by the better-auth concepts update parameters documentation link:
      const { data, error } = await updateUserProfile(name, photoUrl);
      
      if (error) throw new Error(error.message);

      toast.success("Profile records updated successfully!");
      router.push("/my-profile");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "An error occurred while running the profile write function mapping.");
    } finally {
      setUpdating(false);
    }
  };

  if (isPending || !session) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="card bg-base-100 shadow-2xl border border-base-200 p-8 rounded-3xl">
        <h2 className="text-xl font-black mb-2 text-neutral">Modify Account Credentials</h2>
        <p className="text-xs text-gray-400 mb-6">Update your user identity properties inside the authorization database layer.</p>
        
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="form-control">
            <label className="label"><span className="label-text font-bold">Display Profile Name</span></label>
            <input type="text" className="input input-bordered w-full" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text font-bold">New Photo URL Link Target</span></label>
            <input type="url" className="input input-bordered w-full" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} required />
          </div>
          <div className="flex gap-2 pt-4">
            <button type="button" onClick={() => router.push("/my-profile")} className="btn btn-outline flex-1 normal-case">
              Cancel
            </button>
            <button type="submit" disabled={updating} className="btn btn-primary flex-1 normal-case">
              {updating ? <span className="loading loading-spinner loading-xs"></span> : "Update Information"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { localProvider, googleProvider } from "better-auth/providers"; 
// Note: Adjust imports based on your specific database adapter setup (Prisma/Drizzle)

export const auth = betterAuth({
    database: {}, // Your chosen DB adapter goes here
    emailAndPassword: {
        enabled: true,
        autoSignIn: false // Requirement: Navigate to login after registration
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }
    }
});
// src/lib/auth-client.ts
import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
    baseUrl: process.env.NEXT_PUBLIC_APP_URL // Matches BETTER_AUTH_URL
});
// src/app/register/page.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", photoUrl: "", password: "" });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await authClient.signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      image: formData.photoUrl,
    });

    setLoading(false);
    if (error) {
      toast.error(error.message || "Registration failed.");
    } else {
      toast.success("Registration successful! Please log in.");
      router.push("/login"); // Mandatory workflow path requirement
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({ provider: "google", callbackURL: "/" });
  };

  return (
    <div class="flex min-h-[80vh] items-center justify-center p-4">
      <div class="card w-full max-w-md border bg-base-100 p-8 shadow-xl">
        <h2 class="text-center text-3xl font-bold text-primary">Create Account</h2>
        <form onSubmit={handleRegister} class="mt-6 space-y-4">
          <div class="form-control">
            <label class="label"><span class="label-text font-medium">Name</span></label>
            <input type="text" required class="input input-bordered" placeholder="John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-medium">Email</span></label>
            <input type="email" required class="input input-bordered" placeholder="john@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-medium">Photo-url(link)</span></label>
            <input type="url" required class="input input-bordered" placeholder="https://example.com/photo.jpg" value={formData.photoUrl} onChange={e => setFormData({...formData, photoUrl: e.target.value})} />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-medium">Password</span></label>
            <input type="password" required class="input input-bordered" placeholder="••••••••" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>
          <button type="submit" disabled={loading} class="btn btn-primary w-full mt-2">
            {loading ? <span class="loading loading-spinner"></span> : "Register"}
          </button>
        </form>
        <div class="divider">OR</div>
        <button onClick={handleGoogleLogin} class="btn btn-outline btn-secondary w-full">
          <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/></svg>
          Continue with Google
        </button>
        <p class="text-center text-sm mt-4 text-base-content/70">Already have an account? <a href="/login" class="link link-primary font-semibold">Login</a></p>
      </div>
    </div>
  );
}
// src/app/my-profile/page.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function MyProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <div class="text-center py-20"><span class="loading loading-spinner loading-lg text-primary"></span></div>;
  if (!session) {
    router.push("/login?redirectTo=/my-profile");
    return null;
  }

  return (
    <div class="max-w-md mx-auto my-12 p-6 card bg-base-100 border shadow-xl text-center">
      <h2 class="text-2xl font-bold mb-6">Student Profile Data</h2>
      <div class="avatar justify-center mb-4">
        <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={session.user.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"} alt="Avatar" />
        </div>
      </div>
      <h3 class="text-xl font-bold">{session.user.name}</h3>
      <p class="text-sm text-base-content/60 mb-6">{session.user.email}</p>
      <button onClick={() => router.push("/my-profile/update")} class="btn btn-secondary w-full">
        Update Information
      </button>
    </div>
  );
}
// src/app/my-profile/update/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name);
      setImage(session.user.image || "");
    }
  }, [session]);

  if (isPending) return <div class="text-center py-20"><span class="loading loading-spinner loading-lg text-primary"></span></div>;
  if (!session) {
    router.push("/login");
    return null;
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    // EXACT BETTER-AUTH IMPLEMENTATION KEY METHOD REQUIRED:
    const { error } = await authClient.updateUser({
      name: name,
      image: image,
    });

    setUpdating(false);
    if (error) {
      toast.error(error.message || "Failed to update information.");
    } else {
      toast.success("Profile information synchronized successfully!");
      router.push("/my-profile");
      router.refresh();
    }
  };

  return (
    <div class="max-w-md mx-auto my-12 p-6 card bg-base-100 border shadow-xl">
      <h2 class="text-2xl font-bold text-center mb-6">Modify Core Records</h2>
      <form onSubmit={handleProfileUpdate} class="space-y-4">
        <div class="form-control">
          <label class="label"><span class="label-text font-medium">Full Name</span></label>
          <input type="text" required class="input input-bordered" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div class="form-control">
          <label class="label"><span class="label-text font-medium">Image URL Link</span></label>
          <input type="url" required class="input input-bordered" value={image} onChange={e => setImage(e.target.value)} />
        </div>
        <div class="flex gap-4 pt-4">
          <button type="button" onClick={() => router.push("/my-profile")} class="btn btn-ghost flex-1">Cancel</button>
          <button type="submit" disabled={updating} class="btn btn-primary flex-1">
            {updating ? <span class="loading loading-spinner"></span> : "Update Information"}
          </button>
        </div>
      </form>
    </div>
  );
}