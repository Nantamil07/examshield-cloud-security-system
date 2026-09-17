"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("setter");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,
        },
      },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage("Account created successfully. Please login.");

    setTimeout(() => {
      router.replace("/login");
    }, 1500);

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-8">
        {/* Logo */}

        <div className="flex justify-center mb-5">
          <img
            src="/logo.png"
            alt="ExamShield"
            className="w-20 h-20 rounded-full bg-blue-50 p-2"
          />
        </div>

        <h1 className="text-3xl font-bold text-center text-blue-800">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Register for ExamShield Cloud
        </p>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Full Name
            </label>

            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          {/* Email */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          {/* Role */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Select Role
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-600 outline-none"
            >
              <option value="setter">Question Setter</option>
              <option value="reviewer">Reviewer</option>
              <option value="admin">Administrator</option>
              <option value="exam_center">Exam Center</option>
            </select>
          </div>

          {/* Password */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          {message && (
            <div
              className={`rounded-lg p-3 text-sm ${
                message.includes("successfully")
                  ? "bg-green-50 border border-green-300 text-green-700"
                  : "bg-red-50 border border-red-300 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold transition disabled:bg-blue-300"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Login Link */}

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?
          </p>

          <Link
            href="/login"
            className="text-blue-700 font-medium hover:underline"
          >
            Login Here
          </Link>
        </div>
      </div>
    </main>
  );
}