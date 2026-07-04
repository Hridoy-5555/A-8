
export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center gap-4">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="text-sm font-medium tracking-wide text-neutral-500">Fetching Data... Please wait.</p>
    </div>
  );
}
// src/app/login/page.tsx
"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Check if user needs redirection back to a protected course details path
  const redirectTo = searchParams.get("redirectTo") || "/";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await authClient.signIn.email({ email, password });

    setLoading(false);
    if (error) {
      toast.error(error.message || "Invalid credentials provided.");
    } else {
      toast.success("Logged in successfully!");
      router.push(redirectTo);
      router.refresh();
    }
  };

  return (
    <div class="flex min-h-[80vh] items-center justify-center p-4">
      <div class="card w-full max-w-md border bg-base-100 p-8 shadow-xl">
        <h2 class="text-center text-3xl font-bold text-primary">Login</h2>
        <form onSubmit={handleLogin} class="mt-6 space-y-4">
          <div class="form-control">
            <label class="label"><span class="label-text font-medium">Email</span></label>
            <input type="email" required class="input input-bordered" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-medium">Password</span></label>
            <input type="password" required class="input input-bordered" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" disabled={loading} class="btn btn-primary w-full mt-4">
            {loading ? <span class="loading loading-spinner"></span> : "Login"}
          </button>
        </form>
        <div class="divider">OR</div>
        <button onClick={() => authClient.signIn.social({ provider: "google", callbackURL: redirectTo })} class="btn btn-outline btn-secondary w-full">
          Sign In with Google
        </button>
        <p class="text-center text-sm mt-4 text-base-content/70">New to the platform? <a href="/register" class="link link-primary font-semibold">Register here</a></p>
      </div>
    </div>
  );
}