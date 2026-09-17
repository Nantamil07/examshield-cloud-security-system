"use client";

import { useEffect, useState } from "react";

import { supabase } from "../../lib/supabase";
import ProtectedRoute from "../../components/ProtectedRoute";
import UploadCard from "../../components/UploadCard";
import StatusBadge from "../../components/StatusBadge";
import CountdownTimer from "../../components/CountdownTimer";
import { downloadQuestionPaper } from "../../utils/download";

export default function ExamCenterPage() {

  const [user, setUser] = useState(null);
const [papers, setPapers] = useState([]);
const [loading, setLoading] = useState(true);
const [userLoading, setUserLoading] = useState(true);

async function getExamCenter() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.log(error.message);
    setUserLoading(false);
    return;
  }

  if (data.session?.user) {
    setUser(data.session.user);
  }

  setUserLoading(false);
}

  async function loadAvailablePapers() {
    const { data, error } = await supabase
      .from("question_papers")
      .select("*")
      .in("status", ["Scheduled", "Released"])
      .order("release_time", { ascending: true });

    if (error) {
      console.log(error.message);
      return;
    }

    setPapers(data);
    setLoading(false);
  }

  async function handleDownload(paper) {
  // Make sure user information has loaded
  if (!user) {
    alert("User information is still loading. Please try again.");
    return;
  }

  try {
    await downloadQuestionPaper(paper, user);

    alert("Question paper downloaded successfully!");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

useEffect(() => {
  async function initialize() {
    await getExamCenter();
    await loadAvailablePapers();
  }

  initialize();
}, []);
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-100 p-8">
        <UploadCard>

          <h1 className="text-3xl font-bold text-indigo-700 mb-3">
            Exam Center Dashboard
          </h1>

          <p className="mb-6">
            Download question papers only after the scheduled release time.
          </p>

          {userLoading ? (
  <div className="bg-yellow-50 border rounded-lg p-4 mb-6">
    Loading user information...
  </div>
) : user ? (
  <div className="bg-indigo-50 border rounded-lg p-4 mb-6">
    <p><strong>Name:</strong> {user.user_metadata?.name}</p>
    <p><strong>Email:</strong> {user.email}</p>
    <p><strong>Role:</strong> {user.user_metadata?.role}</p>
  </div>
) : (
  <div className="bg-red-50 border rounded-lg p-4 mb-6">
    User not logged in.
  </div>
)}

          <h2 className="text-xl font-semibold mb-4">
            Scheduled / Released Question Papers
          </h2>

          {loading ? (
            <p>Loading papers...</p>
          ) : papers.length === 0 ? (
            <p>No scheduled question papers available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300">
                <thead className="bg-indigo-100">
                  <tr>
                    <th className="border p-3">Subject</th>
                    <th className="border p-3">Exam Name</th>
                    <th className="border p-3">Status</th>
                    <th className="border p-3">Release Time</th>
                    <th className="border p-3">Countdown</th>
                    <th className="border p-3">Download</th>
                  </tr>
                </thead>

                <tbody>
                  {papers.map((paper) => (
                    <tr key={paper.id} className="text-center">
                      <td className="border p-3">{paper.subject}</td>

                      <td className="border p-3">{paper.exam_name}</td>

                      <td className="border p-3">
                        <StatusBadge status={paper.status} />
                      </td>

                      <td className="border p-3">
                        {new Date(paper.release_time).toLocaleString()}
                      </td>

                      <td className="border p-3">
                        <CountdownTimer releaseTime={paper.release_time} />
                      </td>

                     <td className="border p-3">
  {paper.status === "Released" ? (
    <button
      onClick={() => handleDownload(paper)}
      disabled={userLoading || !user}
      className={`px-4 py-2 rounded text-white ${
        userLoading || !user
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {userLoading ? "Loading User..." : "Download PDF"}
    </button>
  ) : (
    <button
      disabled
      className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
    >
      🔒 Locked Until Release
    </button>
  )}
</td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </UploadCard>
      </main>
    </ProtectedRoute>
  );
}