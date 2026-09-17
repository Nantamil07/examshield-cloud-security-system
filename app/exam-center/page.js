"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

import ProtectedRoute from "../../components/ProtectedRoute";
import PageLayout from "../../components/PageLayout";
import StatsCard from "../../components/StatsCard";
import StatusBadge from "../../components/StatusBadge";
import CountdownTimer from "../../components/CountdownTimer";

import { downloadQuestionPaper } from "../../utils/download";

import {
  Download,
  FileCheck,
  Clock3,
  ShieldCheck,
} from "lucide-react";

export default function ExamCenterPage() {
  const [user, setUser] = useState(null);
  const [papers, setPapers] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);

  // ---------------- USER ----------------

  async function loadUser() {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  }

  // ---------------- LOAD PAPERS ----------------

  async function loadPapers() {
    const { data } = await supabase
      .from("question_papers")
      .select("*")
      .order("release_time", { ascending: true });

    setPapers(data || []);
    setPageLoading(false);
  }

  // ---------------- DOWNLOAD ----------------

  async function handleDownload(paper) {
    try {
      setDownloadingId(paper.id);

      await downloadQuestionPaper(paper, user);

      alert("Watermarked question paper downloaded successfully.");
    } catch (err) {
      alert(err.message);
    }

    setDownloadingId(null);
  }

  // ---------------- INIT ----------------

  useEffect(() => {
    loadUser();
    loadPapers();
  }, []);

  if (pageLoading) {
    return (
      <ProtectedRoute allowedRole="exam_center">
        <PageLayout
          role="exam_center"
          title="Exam Center Dashboard"
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

  // Statistics

  const releasedCount = papers.filter(
    (p) => p.status === "Released"
  ).length;

  const scheduledCount = papers.filter(
    (p) => p.status === "Scheduled"
  ).length;

  const totalCount = papers.length;

  return (
    <ProtectedRoute allowedRole="exam_center">
      <PageLayout
        role="exam_center"
        title="Exam Center Dashboard"
        user={user}
      >
        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Released Papers"
            value={releasedCount}
            color="#2563EB"
            icon={FileCheck}
          />

          <StatsCard
            title="Scheduled Papers"
            value={scheduledCount}
            color="#7C3AED"
            icon={Clock3}
          />

          <StatsCard
            title="Total Papers"
            value={totalCount}
            color="#16A34A"
            icon={ShieldCheck}
          />
        </div>

        {/* Verify Button */}

        <div className="flex justify-end mb-6">
          <Link href="/verify">
            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-medium transition flex items-center gap-2">
              <ShieldCheck size={18} />
              Verify Paper Integrity
            </button>
          </Link>
        </div>

        {/* Question Papers */}

        <div className="bg-white rounded-xl shadow-sm border">
          <div className="border-b px-6 py-5">
            <h2 className="text-xl font-bold text-blue-800">
              Available Question Papers
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Download is enabled only after the scheduled release time.
            </p>
          </div>

          {papers.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              No question papers available.
            </div>
          ) : (
            <div className="space-y-6 p-6">
              {papers.map((paper) => (
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
                      <p className="text-sm text-gray-500">
                        Scheduled Release
                      </p>

                      <p className="font-semibold">
                        {paper.release_time
                          ? new Date(
                              paper.release_time
                            ).toLocaleString("en-IN")
                          : "Not Scheduled"}
                      </p>
                    </div>
                  </div>

                  {/* Countdown */}

                  {paper.status === "Scheduled" &&
                    paper.release_time && (
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-5">
                        <div className="flex items-center gap-2 text-purple-700 font-medium mb-2">
                          <Clock3 size={18} />
                          Countdown to Release
                        </div>

                        <CountdownTimer
                          releaseTime={paper.release_time}
                        />
                      </div>
                    )}

                  {/* Released Message */}

                  {paper.status === "Released" && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-5 text-green-700 font-medium">
                      This paper has been released and is ready for secure
                      download.
                    </div>
                  )}

                  {/* Download Button */}

                  {paper.status === "Released" ? (
                    <button
                      onClick={() => handleDownload(paper)}
                      disabled={downloadingId === paper.id}
                      className="bg-blue-700 hover:bg-blue-800 disabled:bg-blue-300 text-white px-5 py-2 rounded-lg font-medium flex items-center gap-2 transition"
                    >
                      <Download size={18} />

                      {downloadingId === paper.id
                        ? "Preparing Download..."
                        : "Download Watermarked PDF"}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="bg-gray-300 text-gray-600 px-5 py-2 rounded-lg font-medium cursor-not-allowed"
                    >
                      Available After Release Time
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Instructions */}

        <div className="mt-10 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-blue-800 mb-3">
            Download Instructions
          </h3>

          <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
            <li>
              Download is enabled only after the administrator releases the paper.
            </li>

            <li>
              Every downloaded PDF contains a unique watermark for the exam center.
            </li>

            <li>
              Use the Verify Integrity page to verify that the downloaded paper has
              not been modified.
            </li>
          </ul>
        </div>
      </PageLayout>
    </ProtectedRoute>
  );
}