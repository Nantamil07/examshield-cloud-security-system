"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    const { data } = await supabase.auth.getUser();

    if (data.user) {
      redirectUser(data.user.user_metadata.role);
    }
  }

  function redirectUser(role) {
    switch (role) {
      case "setter":
        router.replace("/setter");
        break;

      case "reviewer":
        router.replace("/reviewer");
        break;

      case "admin":
        router.replace("/admin");
        break;

      case "exam_center":
        router.replace("/exam-center");
        break;

      default:
        router.replace("/");
    }
  }

  async function login(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    redirectUser(data.user.user_metadata.role);
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border shadow-lg w-full max-w-md p-8">
        <div className="flex justify-center">
          <img
            src="/logo.png"
            className="w-20 h-20 rounded-full bg-blue-50 p-2"
            alt="Logo"
          />
        </div>

        <h1 className="text-3xl font-bold text-center text-blue-900 mt-5">
          Login Portal
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Secure access to ExamShield Cloud
        </p>

        <form onSubmit={login} className="space-y-5">
          <div>
            <label className="text-sm font-medium">Email Address</label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 rounded-lg p-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold disabled:bg-blue-300"
          >
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        <div className="border-t mt-8 pt-5 text-center text-sm">
          <p className="text-gray-600">
            Don't have an account?
          </p>

          <Link
            href="/register"
            className="text-blue-700 font-semibold hover:underline"
          >
            Create Account
          </Link>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-gray-500 hover:text-blue-700 text-sm"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}