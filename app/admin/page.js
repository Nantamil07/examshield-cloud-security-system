"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import ProtectedRoute from "../../components/ProtectedRoute";
import UploadCard from "../../components/UploadCard";
import StatusBadge from "../../components/StatusBadge";import {
  scheduleRelease,
  releaseQuestionPaper,
} from "../../utils/admin";
import CountdownTimer from "../../components/CountdownTimer";

export default function AdminPage() {

  const [user, setUser] = useState(null);
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [releaseTimes, setReleaseTimes] = useState({});

  async function getAdmin() {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.log(error.message);
      return;
    }

    setUser(data.user);
  }

  async function loadApprovedPapers() {
  const { data, error } = await supabase
    .from("question_papers")
    .select("*")
    .in("status", ["Approved", "Scheduled", "Released"])
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
    return;
  }

  setPapers(data);
  setLoading(false);
}
  async function handleSchedule(paperId) {
  const releaseTime = releaseTimes[paperId];

  if (!releaseTime) {
    alert("Please choose a release date and time.");
    return;
  }

  try {
    await scheduleRelease(
      paperId,
      releaseTime,
      user.id
    );

    alert("Release scheduled successfully!");

    loadApprovedPapers();

  } catch (error) {
    alert(error.message);
  }
}

async function checkReleaseTimes() {
  const now = new Date();

  for (const paper of papers) {
    if (
      paper.status === "Scheduled" &&
      paper.release_time &&
      new Date(paper.release_time) <= now
    ) {
      try {
        await releaseQuestionPaper(paper.id);

        console.log(`${paper.subject} released.`);

        await loadApprovedPapers();
      } catch (err) {
        console.log(err.message);
      }
    }
  }
}

  useEffect(() => {
    getAdmin();
    loadApprovedPapers();
  }, []);
 useEffect(() => {
  const interval = setInterval(() => {
    checkReleaseTimes();
  }, 1000); // every second

  return () => clearInterval(interval);
}, [papers]);


  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-100 p-8">
        <UploadCard>

          <h1 className="text-3xl font-bold text-purple-700 mb-3">
            Admin Dashboard
          </h1>

          <p className="mb-6">
            Schedule approved question papers for secure release.
          </p>

          {user ? (
            <div className="bg-purple-50 border rounded-lg p-4 mb-6">
              <p><strong>Name:</strong> {user.user_metadata?.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.user_metadata?.role}</p>
            </div>
          ) : (
            <p>Loading admin...</p>
          )}

          <div className="bg-white border rounded-lg p-4 mb-6">
            <p className="text-lg font-semibold">
              Approved Question Papers
            </p>

            <p className="text-3xl font-bold text-purple-700 mt-2">
              {papers.length}
            </p>
          </div>

          <h2 className="text-xl font-semibold mb-4">
            Approved Papers Ready for Scheduling
          </h2>

          {loading ? (
            <p>Loading approved papers...</p>
          ) : papers.length === 0 ? (
            <p className="text-red-500">
              No approved question papers found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300">
                <thead className="bg-purple-100">
                  <tr>
                    <th className="border p-3">Subject</th>
                    <th className="border p-3">Department</th>
                    <th className="border p-3">Semester</th>
                    <th className="border p-3">Exam Name</th>
                    <th className="border p-3">Status</th>
                    <th className="border p-3">Approved Comment</th>
                    <th className="border p-3">Uploaded Date</th>
                    <th className="border p-3">Release Date & Time</th>
                    <th className="border p-3">Countdown</th>

<th className="border p-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {papers.map((paper) => (
                    <tr key={paper.id} className="text-center hover:bg-gray-50">
                      <td className="border p-3">{paper.subject}</td>

                      <td className="border p-3">{paper.department}</td>

                      <td className="border p-3">{paper.semester}</td>

                      <td className="border p-3">{paper.exam_name}</td>

                      <td className="border p-3">
                        <StatusBadge status={paper.status} />
                      </td>

                      <td className="border p-3">
                        {paper.reviewer_comment || "No comment"}
                      </td>

                      <td className="border p-3">
                        {new Date(paper.created_at).toLocaleString()}
                      </td>
                      <td className="border p-3">
  <div className="flex flex-col gap-2">
    {paper.release_time ? (
      <span className="text-green-700 text-sm">
        Scheduled: {new Date(paper.release_time).toLocaleString()}
      </span>
    ) : (
      <span className="text-red-500 text-sm">Not Scheduled</span>
    )}

    <input
      type="datetime-local"
      value={releaseTimes[paper.id] || ""}
      onChange={(e) =>
        setReleaseTimes({
          ...releaseTimes,
          [paper.id]: e.target.value,
        })
      }
      className="border rounded-lg p-2 w-full"
    />
  </div>
</td>

<td className="border p-3">
  {paper.release_time ? (
    <CountdownTimer releaseTime={paper.release_time} />
  ) : (
    "-"
  )}
</td>
<td className="border p-3">
  <button
    onClick={() => handleSchedule(paper.id)}
    className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg text-sm"
  >
    Schedule Release
  </button>
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