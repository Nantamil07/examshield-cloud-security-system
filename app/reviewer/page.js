"use client";

import { useEffect, useState } from "react";

import { supabase } from "../../lib/supabase";
import ProtectedRoute from "../../components/ProtectedRoute";
import UploadCard from "../../components/UploadCard";
import StatusBadge from "../../components/StatusBadge";
import { updateQuestionPaperStatus } from "../../utils/reviewer";

export default function ReviewerPage() {

  const [user, setUser] = useState(null);
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState({});

  async function getReviewer() {

    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.log(error.message);
      return;
    }

    setUser(data.user);

  }

  async function loadPendingPapers() {

    const { data, error } = await supabase
      .from("question_papers")
      .select("*")
      .eq("status", "Pending")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error.message);
      return;
    }

    setPapers(data);
    setLoading(false);

  }

async function handleReview(paperId, status) {
  try {
    await updateQuestionPaperStatus(
      paperId,
      status,
      comments[paperId] || "",
      user.id
    );

    alert(`Question Paper ${status}!`);

    // Reload pending papers
    loadPendingPapers();
  } catch (error) {
    alert(error.message);
  }
}

  useEffect(() => {

    getReviewer();
    loadPendingPapers();

  }, []);

  return (

    <ProtectedRoute>

      <main className="min-h-screen bg-gray-100 p-8">

        <UploadCard>

          <h1 className="text-3xl font-bold text-green-700 mb-3">
            Reviewer Dashboard
          </h1>

          <p className="mb-6">
            Review uploaded question papers before releasing them.
          </p>

          {user ? (
            <div className="bg-green-50 p-4 rounded-lg border mb-6">
              <p><strong>Name:</strong> {user.user_metadata?.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.user_metadata?.role}</p>
            </div>
          ) : (
            <p>Loading reviewer...</p>
          )}

          <h2 className="text-xl font-semibold mb-4">
            Pending Question Papers ({papers.length})
          </h2>

          {loading ? (
  <p className="text-gray-500">Loading papers...</p>
) : papers.length === 0 ? (
  <p className="text-red-500">No pending question papers found.</p>
) : (
  <div className="overflow-x-auto">
    <table className="w-full border border-gray-300 rounded-lg">
      <thead className="bg-green-100">
        <tr>
          <th className="border p-3">Subject</th>
          <th className="border p-3">Department</th>
          <th className="border p-3">Semester</th>
          <th className="border p-3">Exam Name</th>
          <th className="border p-3">Status</th>
          <th className="border p-3">Uploaded Date</th>
          <th className="border p-3">Review Comment</th>

<th className="border p-3">Actions</th>
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
              {new Date(paper.created_at).toLocaleString()}
            </td>
            <td className="border p-3">
  <textarea
    rows={2}
    placeholder="Enter review comment..."
    value={comments[paper.id] || ""}
    onChange={(e) =>
      setComments({
        ...comments,
        [paper.id]: e.target.value,
      })
    }
    className="border rounded p-2 w-full text-sm"
  />
</td>
<td className="border p-3">
  <div className="flex gap-2 justify-center">
    <button
      onClick={() => handleReview(paper.id, "Approved")}
      className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm"
    >
      Approve
    </button>

    <button
      onClick={() => handleReview(paper.id, "Rejected")}
      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm"
    >
      Reject
    </button>
  </div>
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