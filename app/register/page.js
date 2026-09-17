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

  async function register(e) {
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

    setMessage("Account created successfully.");

    setTimeout(() => {
      router.replace("/login");
    }, 1500);

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl border shadow-lg w-full max-w-lg p-8">
        <div className="flex justify-center">
          <img
            src="/logo.png"
            className="w-20 h-20 rounded-full bg-blue-50 p-2"
            alt="Logo"
          />
        </div>

        <h1 className="text-3xl font-bold text-center text-blue-900 mt-5">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Register for ExamShield Cloud
        </p>

        <form onSubmit={register} className="space-y-5">
          <div>
            <label className="text-sm font-medium">Full Name</label>

            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
            />
          </div>

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
            <label className="text-sm font-medium">Select Role</label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="setter">Question Setter</option>
              <option value="reviewer">Reviewer</option>
              <option value="admin">Administrator</option>
              <option value="exam_center">Exam Center</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>

            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
            />
          </div>

          {message && (
            <div
              className={`rounded-lg p-3 text-sm ${
                message.includes("success")
                  ? "bg-green-50 border border-green-300 text-green-700"
                  : "bg-red-50 border border-red-300 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold disabled:bg-blue-300"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="border-t mt-8 pt-5 text-center text-sm">
          <p className="text-gray-600">
            Already have an account?
          </p>

          <Link
            href="/login"
            className="text-blue-700 font-semibold hover:underline"
          >
            Login Here
          </Link>
        </div>
      </div>
    </main>
  );
}