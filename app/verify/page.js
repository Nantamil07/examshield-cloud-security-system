"use client";

import { useState } from "react";
import Link from "next/link";

import { verifyQuestionPaper } from "../../utils/verify";

import {
  ShieldCheck,
  ShieldAlert,
  Upload,
  CheckCircle2,
  ArrowLeft,
  FileCheck,
} from "lucide-react";

export default function VerifyPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  async function handleVerify() {
    if (!file) {
      alert("Please select a PDF file.");
      return;
    }

    setLoading(true);

    try {
      const response = await verifyQuestionPaper(file);
      setResult(response);
    } catch (err) {
      alert(err.message);
      setResult(null);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}

        <Link
          href="/exam-center"
          className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium mb-6"
        >
          <ArrowLeft size={18} />
          Back to Exam Center Dashboard
        </Link>

        {/* Header */}

        <div className="bg-white rounded-2xl shadow-sm border p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FileCheck className="text-blue-700" size={30} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-blue-800">
                Question Paper Integrity Verification
              </h1>

              <p className="text-gray-500 mt-1">
                Verify the authenticity of a downloaded question paper using its
                SHA-256 integrity hash.
              </p>
            </div>
          </div>

          {/* Upload */}

          <div className="mt-8">
            <label className="block text-sm font-medium mb-2">
              Select Downloaded PDF
            </label>

            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full border border-gray-300 rounded-lg p-3 file:mr-4 file:rounded file:border-0 file:bg-blue-700 file:px-4 file:py-2 file:text-white hover:file:bg-blue-800"
            />
          </div>

          {file && (
            <div className="mt-5 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="font-medium text-blue-700">Selected File</p>

              <p className="mt-2 text-gray-700">{file.name}</p>

              <p className="text-sm text-gray-500 mt-1">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}

          <button
            onClick={handleVerify}
            disabled={loading}
            className="mt-6 bg-blue-700 hover:bg-blue-800 disabled:bg-blue-300 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition"
          >
            <Upload size={18} />

            {loading ? "Verifying..." : "Verify Integrity"}
          </button>
        </div>

        {/* Result */}

        {result && (
          <div className="space-y-6">
            {/* Verification Status */}

            <div
              className={`rounded-2xl border p-6 ${
                result.verified
                  ? "bg-green-50 border-green-300"
                  : "bg-red-50 border-red-300"
              }`}
            >
              <div className="flex items-center gap-3">
                {result.verified ? (
                  <CheckCircle2
                    className="text-green-600"
                    size={34}
                  />
                ) : (
                  <ShieldAlert
                    className="text-red-600"
                    size={34}
                  />
                )}

                <div>
                  <h2
                    className={`text-2xl font-bold ${
                      result.verified
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {result.verified
                      ? "Verified Successfully"
                      : "Hash Mismatch Detected"}
                  </h2>

                  <p className="text-gray-600 mt-1">
                    {result.verified
                      ? "The downloaded question paper is authentic and has not been modified."
                      : "The uploaded PDF does not match the original stored integrity hash."}
                  </p>
                </div>
              </div>
            </div>

            {/* Paper Details */}

            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-blue-800 mb-5">
                Question Paper Details
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Subject</p>
                  <p className="font-semibold">{result.subject}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-semibold">{result.department}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Semester</p>
                  <p className="font-semibold">{result.semester}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Examination</p>
                  <p className="font-semibold">{result.exam_name}</p>
                </div>
              </div>
            </div>

            {/* Hash Information */}

            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-blue-800 mb-5">
                SHA-256 Integrity Details
              </h2>

              <div className="space-y-5">
                <div>
                  <p className="text-sm text-gray-500 mb-2">
                    Calculated SHA-256 Hash
                  </p>

                  <div className="bg-gray-100 rounded-lg p-3 text-sm break-all font-mono">
                    {result.calculated_hash}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">
                    Stored SHA-256 Hash
                  </p>

                  <div className="bg-gray-100 rounded-lg p-3 text-sm break-all font-mono">
                    {result.stored_hash}
                  </div>
                </div>
              </div>
            </div>

            {/* Security Message */}

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="text-blue-700" size={28} />

                <h3 className="text-lg font-bold text-blue-800">
                  Security Verification Summary
                </h3>
              </div>

              <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                <li>
                  SHA-256 ensures the question paper has not been modified.
                </li>

                <li>
                  The downloaded PDF is compared against the original hash stored
                  during upload.
                </li>

                <li>
                  Any mismatch indicates the file may have been altered or
                  corrupted.
                </li>

                <li>
                  Every successful download is protected with a watermark for
                  traceability.
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}