"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

import ProtectedRoute from "../../components/ProtectedRoute";
import PageLayout from "../../components/PageLayout";
import StatsCard from "../../components/StatsCard";
import StatusBadge from "../../components/StatusBadge";

import { approvePaper, rejectPaper } from "../../utils/review";

import {
  FileClock,
  CheckCircle,
  XCircle,
  MessageSquare,
  FileCheck,
} from "lucide-react";

export default function ReviewerPage() {
  const [user, setUser] = useState(null);
  const [papers, setPapers] = useState([]);
  const [comments, setComments] = useState({});
  const [loadingId, setLoadingId] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  // ---------------- USER ----------------

  async function loadUser() {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  }

  // ---------------- LOAD PAPERS ----------------

  async function loadPendingPapers() {
    const { data } = await supabase
      .from("question_papers")
      .select("*")
      .order("created_at", { ascending: false });

    setPapers(data || []);
    setPageLoading(false);
  }

  // ---------------- APPROVE ----------------

  async function handleApprove(id) {
    setLoadingId(id);

    try {
      await approvePaper(id, user);
      await loadPendingPapers();
      alert("Question paper approved successfully.");
    } catch (err) {
      alert(err.message);
    }

    setLoadingId(null);
  }

  // ---------------- REJECT ----------------

  async function handleReject(id) {
    const comment = comments[id] || "";

    if (!comment.trim()) {
      alert("Please enter a rejection comment.");
      return;
    }

    setLoadingId(id);

    try {
      await rejectPaper(id, comment, user);
      await loadPendingPapers();
      alert("Question paper rejected successfully.");
    } catch (err) {
      alert(err.message);
    }

    setLoadingId(null);
  }

  useEffect(() => {
    loadUser();
    loadPendingPapers();
  }, []);

  if (pageLoading) {
    return (
      <ProtectedRoute allowedRole="reviewer">
        <PageLayout
          role="reviewer"
          title="Reviewer Dashboard"
          user={user}
        >
          <div className="flex justify-center items-center h-96">
            <p className="text-blue-700 font-medium text-lg">
              Loading dashboard...
            </p>
          </div>
        </PageLayout>
      </ProtectedRoute>
    );
  }

  const pendingCount = papers.filter((p) => p.status === "Pending").length;
  const approvedCount = papers.filter((p) => p.status === "Approved").length;
  const rejectedCount = papers.filter((p) => p.status === "Rejected").length;

  return (
    <ProtectedRoute allowedRole="reviewer">
      <PageLayout
        role="reviewer"
        title="Reviewer Dashboard"
        user={user}
      >
        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Pending Review"
            value={pendingCount}
            color="#EA580C"
            icon={FileClock}
          />

          <StatsCard
            title="Approved Papers"
            value={approvedCount}
            color="#16A34A"
            icon={CheckCircle}
          />

          <StatsCard
            title="Rejected Papers"
            value={rejectedCount}
            color="#DC2626"
            icon={XCircle}
          />
        </div>

        {/* Pending Papers */}

        <div className="bg-white rounded-xl border shadow-sm">
          <div className="border-b px-6 py-5 flex items-center gap-3">
            <FileCheck className="text-blue-700" />

            <div>
              <h2 className="text-xl font-bold text-blue-800">
                Pending Question Papers
              </h2>

              <p className="text-sm text-gray-500">
                Review uploaded papers before scheduling.
              </p>
            </div>
          </div>

          {pendingCount === 0 ? (
            <div className="text-center py-16 text-gray-500">
              No pending papers available for review.
            </div>
          ) : (
            <div className="space-y-6 p-6">
              {papers
                .filter((paper) => paper.status === "Pending")
                .map((paper) => (
                  <div
                    key={paper.id}
                    className="border rounded-xl p-5 bg-gray-50"
                  >
                    {/* Paper Info */}

                    <div className="grid md:grid-cols-2 gap-4 mb-5">
                      <div>
                        <p className="text-sm text-gray-500">Subject</p>
                        <p className="font-semibold">{paper.subject}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Department</p>
                        <p className="font-semibold">{paper.department}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Semester</p>
                        <p className="font-semibold">{paper.semester}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Exam</p>
                        <p className="font-semibold">{paper.exam_name}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <StatusBadge status={paper.status} />
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Uploaded On</p>
                        <p className="font-semibold">
                          {new Date(paper.created_at).toLocaleDateString(
                            "en-IN"
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Comment */}

                    <div className="mb-5">
                      <label className="flex items-center gap-2 text-sm font-medium mb-2">
                        <MessageSquare size={16} />
                        Reviewer Comment (Required for Rejection)
                      </label>

                      <textarea
                        rows={3}
                        placeholder="Enter review comments..."
                        value={comments[paper.id] || ""}
                        onChange={(e) =>
                          setComments({
                            ...comments,
                            [paper.id]: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-600 outline-none resize-none"
                      />
                    </div>

                    {/* Buttons */}

                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={() => handleApprove(paper.id)}
                        disabled={loadingId === paper.id}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white px-5 py-2 rounded-lg font-medium transition"
                      >
                        {loadingId === paper.id
                          ? "Approving..."
                          : "Approve"}
                      </button>

                      <button
                        onClick={() => handleReject(paper.id)}
                        disabled={loadingId === paper.id}
                        className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white px-5 py-2 rounded-lg font-medium transition"
                      >
                        {loadingId === paper.id
                          ? "Rejecting..."
                          : "Reject"}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Review History */}

        <div className="bg-white rounded-xl shadow-sm border mt-10">
          <div className="border-b px-6 py-5">
            <h2 className="text-xl font-bold text-blue-800">
              Review History
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Approved and rejected papers.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="px-5 py-3 text-left">Subject</th>
                  <th className="px-5 py-3 text-left">Exam</th>
                  <th className="px-5 py-3 text-left">Status</th>
                  <th className="px-5 py-3 text-left">Reviewer Comment</th>
                </tr>
              </thead>

              <tbody>
                {papers
                  .filter((p) => p.status !== "Pending")
                  .map((paper) => (
                    <tr
                      key={paper.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-5 py-4 font-medium">
                        {paper.subject}
                      </td>

                      <td className="px-5 py-4">
                        {paper.exam_name}
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={paper.status} />
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {paper.reviewer_comment || "-"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </PageLayout>
    </ProtectedRoute>
  );
}