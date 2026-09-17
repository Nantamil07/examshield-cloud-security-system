"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    const { data } = await supabase.auth.getUser();

    if (data.user) {
      redirectByRole(data.user.user_metadata?.role);
    }
  }

  function redirectByRole(role) {
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

  async function handleLogin(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    redirectByRole(data.user.user_metadata?.role);
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <img
            src="/logo.png"
            alt="ExamShield"
            className="w-20 h-20 rounded-full bg-blue-50 p-2"
          />
        </div>

        <h1 className="text-3xl font-bold text-center text-blue-800">
          ExamShield Cloud
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Secure Question Paper Management Portal
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-600 outline-none"
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
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>
        <div className="text-center mt-5">
  <p className="text-sm text-gray-600 mb-2">
    Don't have an account?
  </p>

  <Link
    href="/register"
    className="text-blue-700 font-medium hover:underline"
  >
    Create Account
  </Link>
</div>

        <div className="mt-8 border-t pt-5 text-center text-sm text-gray-500">
          <p>Cloud Computing Microproject</p>
          <p>Coimbatore Institute of Technology</p>
        </div>

        <div className="text-center mt-5">
          <Link href="/" className="text-blue-700 hover:underline text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}