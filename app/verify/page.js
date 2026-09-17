"use client";

import { useState } from "react";
import { verifyQuestionPaper } from "../../utils/verify";

export default function VerifyPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleVerify() {
    if (!file) {
      alert("Please choose a PDF.");
      return;
    }

    setLoading(true);

    try {
      const verification = await verifyQuestionPaper(file);
      setResult(verification);
    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">

        <h1 className="text-3xl font-bold text-blue-700 mb-2">
          Integrity Verification
        </h1>

        <p className="text-gray-600 mb-6">
          Verify whether a downloaded question paper has been modified.
        </p>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="border rounded-lg p-3 w-full"
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className="mt-5 bg-blue-700 hover:bg-blue-800 text-white px-5 py-3 rounded-lg"
        >
          {loading ? "Verifying..." : "Verify Integrity"}
        </button>

        {result && (
          <div className="mt-8 border rounded-xl p-5">

            <h2 className="text-xl font-semibold mb-3">
              Verification Result
            </h2>

            <p>
              <strong>Subject:</strong> {result.paper.subject}
            </p>

            <p>
              <strong>Exam:</strong> {result.paper.exam_name}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {result.valid ? (
                <span className="text-green-700 font-bold">
                  VERIFIED
                </span>
              ) : (
                <span className="text-red-700 font-bold">
                  HASH MISMATCH
                </span>
              )}
            </p>
            <p>
  <strong>Verified Against:</strong> {result.matchedHash}
</p>

            <div className="mt-4">
              <p className="font-semibold">Stored SHA-256</p>

              <p className="text-sm break-all bg-gray-100 p-2 rounded">
                {result.paper.hash}
              </p>

              <p className="font-semibold mt-3">Uploaded SHA-256</p>

              <p className="text-sm break-all bg-gray-100 p-2 rounded">
                {result.uploadHash}
              </p>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}