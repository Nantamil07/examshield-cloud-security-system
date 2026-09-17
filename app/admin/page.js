"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

import ProtectedRoute from "../../components/ProtectedRoute";
import PageLayout from "../../components/PageLayout";
import StatsCard from "../../components/StatsCard";
import StatusBadge from "../../components/StatusBadge";
import CountdownTimer from "../../components/CountdownTimer";

import { scheduleRelease } from "../../utils/admin";

import {
  CalendarClock,
  Clock3,
  CheckCircle2,
  FileCheck,
} from "lucide-react";

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [papers, setPapers] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  const [releaseTimes, setReleaseTimes] = useState({});

  async function loadUser() {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  }

  async function loadPapers() {
    const { data } = await supabase
      .from("question_papers")
      .select("*")
      .order("created_at", { ascending: false });

    setPapers(data || []);
    setPageLoading(false);
  }

  async function handleSchedule(id) {
    const releaseTime = releaseTimes[id];

    if (!releaseTime) {
      alert("Please select a release date and time.");
      return;
    }

    try {
      setLoadingId(id);

      await scheduleRelease(id, releaseTime, user);

      alert("Release scheduled successfully.");

      await loadPapers();
    } catch (err) {
      alert(err.message);
    }

    setLoadingId(null);
  }

  useEffect(() => {
    loadUser();
    loadPapers();
  }, []);

  if (pageLoading) {
    return (
      <ProtectedRoute allowedRole="admin">
        <PageLayout
          role="admin"
          title="Administrator Dashboard"
          user={user}
        >
          <div className="flex justify-center items-center h-96">
            <p className="text-blue-700 text-lg font-medium">
              Loading dashboard...
            </p>
          </div>
        </PageLayout>
      </ProtectedRoute>
    );
  }

  const approvedCount = papers.filter(
    (p) => p.status === "Approved"
  ).length;

  const scheduledCount = papers.filter(
    (p) => p.status === "Scheduled"
  ).length;

  const releasedCount = papers.filter(
    (p) => p.status === "Released"
  ).length;

  return (
    <ProtectedRoute allowedRole="admin">
      <PageLayout
        role="admin"
        title="Administrator Dashboard"
        user={user}
      >
        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Approved Papers"
            value={approvedCount}
            color="#16A34A"
            icon={CheckCircle2}
          />

          <StatsCard
            title="Scheduled Papers"
            value={scheduledCount}
            color="#7C3AED"
            icon={CalendarClock}
          />

          <StatsCard
            title="Released Papers"
            value={releasedCount}
            color="#2563EB"
            icon={FileCheck}
          />
        </div>

        {/* Schedule Section */}

        <div className="bg-white rounded-xl border shadow-sm">
          <div className="border-b px-6 py-5">
            <h2 className="text-xl font-bold text-blue-800">
              Schedule Question Paper Release
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Schedule approved papers for secure release.
            </p>
          </div>

          <div className="p-6 space-y-6">
            {papers.filter((p) => p.status === "Approved").length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No approved papers available for scheduling.
              </div>
            ) : (
              papers
                .filter((paper) => paper.status === "Approved")
                .map((paper) => (
                  <div
                    key={paper.id}
                    className="border rounded-xl p-5 bg-gray-50"
                  >
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
                    </div>

                    <label className="block text-sm font-medium mb-2">
                      Select Release Date & Time
                    </label>

                    <input
                      type="datetime-local"
                      value={releaseTimes[paper.id] || ""}
                      onChange={(e) =>
                        setReleaseTimes({
                          ...releaseTimes,
                          [paper.id]: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-600 outline-none"
                    />

                    <button
                      onClick={() => handleSchedule(paper.id)}
                      disabled={loadingId === paper.id}
                      className="mt-4 bg-purple-700 hover:bg-purple-800 disabled:bg-purple-300 text-white px-5 py-2 rounded-lg font-medium transition"
                    >
                      {loadingId === paper.id
                        ? "Scheduling..."
                        : "Schedule Release"}
                    </button>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Scheduled & Released */}

        <div className="bg-white rounded-xl shadow-sm border mt-10">
          <div className="border-b px-6 py-5">
            <h2 className="text-xl font-bold text-blue-800">
              Scheduled & Released Papers
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Countdown until release and released status.
            </p>
          </div>

          {papers.filter(
            (p) => p.status === "Scheduled" || p.status === "Released"
          ).length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No scheduled or released papers available.
            </div>
          ) : (
            <div className="space-y-6 p-6">
              {papers
                .filter(
                  (p) =>
                    p.status === "Scheduled" || p.status === "Released"
                )
                .map((paper) => (
                  <div
                    key={paper.id}
                    className="border rounded-xl p-5 bg-gray-50"
                  >
                    <div className="grid md:grid-cols-2 gap-4 mb-5">
                      <div>
                        <p className="text-sm text-gray-500">Subject</p>
                        <p className="font-semibold">{paper.subject}</p>
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
                        <p className="text-sm text-gray-500">Release Time</p>
                        <p className="font-semibold">
                          {paper.release_time
                            ? new Date(paper.release_time).toLocaleString(
                                "en-IN"
                              )
                            : "-"}
                        </p>
                      </div>
                    </div>

                    {paper.status === "Scheduled" && paper.release_time && (
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2 text-purple-700 font-semibold">
                          <Clock3 size={18} />
                          Release Countdown
                        </div>

                        <CountdownTimer releaseTime={paper.release_time} />
                      </div>
                    )}

                    {paper.status === "Released" && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700 font-medium">
                        This paper has been released and is now available to
                        Exam Centers.
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </PageLayout>
    </ProtectedRoute>
  );
}