"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

import ProtectedRoute from "../../components/ProtectedRoute";
import PageLayout from "../../components/PageLayout";
import UploadCard from "../../components/UploadCard";
import FileInfoCard from "../../components/FileInfoCard";
import StatusBadge from "../../components/StatusBadge";
import StatsCard from "../../components/StatsCard";
import Button from "../../components/Button";
import TableCard from "../../components/TableCard";
import EmptyState from "../../components/EmptyState";
import LoadingSpinner from "../../components/LoadingSpinner";
import Toast from "../../components/Toast";

import { uploadQuestionPaper } from "../../utils/upload";

import {
  Upload,
  ShieldCheck,
  FileClock,
  FileText,
} from "lucide-react";

export default function SetterPage() {
  const [user, setUser] = useState(null);
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const [file, setFile] = useState(null);

  const [meta, setMeta] = useState({
    subject: "",
    department: "",
    semester: "",
    exam_name: "",
  });

  // ---------------- USER ----------------

  async function getLoggedInUser() {
    const { data, error } = await supabase.auth.getUser();

    if (!error) {
      setUser(data.user);
    }
  }

  // ---------------- PAPERS ----------------

  async function loadUploadedPapers() {
    const { data, error } = await supabase
      .from("question_papers")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setPapers(data || []);
    }

    setPageLoading(false);
  }

  // ---------------- UPLOAD ----------------

async function handleUpload() {
  if (!file) {
    setToast({
      type: "error",
      message: "Please select a PDF file.",
    });
    return;
  }

  if (
    !meta.subject ||
    !meta.department ||
    !meta.semester ||
    !meta.exam_name
  ) {
    setToast({
      type: "error",
      message: "Please fill all required fields.",
    });
    return;
  }

  try {
    setLoading(true);

    await uploadQuestionPaper(file, meta, user);

    setToast({
      type: "success",
      message: "Question paper uploaded successfully.",
    });

    setFile(null);

    setMeta({
      subject: "",
      department: "",
      semester: "",
      exam_name: "",
    });

    await loadUploadedPapers();

    setTimeout(() => setToast(null), 3000);
  } catch (error) {
    setToast({
      type: "error",
      message: error.message,
    });

    setTimeout(() => setToast(null), 3000);
  } finally {
    setLoading(false);
  }
}

  // ---------------- INIT ----------------

  useEffect(() => {
    getLoggedInUser();
    loadUploadedPapers();
  }, []);

  if (pageLoading) {
  return (
    <ProtectedRoute allowedRole="setter">
      <PageLayout
        role="setter"
        title="Question Setter Dashboard"
        user={user}
      >
        <LoadingSpinner text="Loading Question Setter Dashboard..." />
      </PageLayout>
    </ProtectedRoute>
  );
}

  // ---------------- UI ----------------

  return (
    <ProtectedRoute allowedRole="setter">
      <PageLayout
        role="setter"
        title="Question Setter Dashboard"
        user={user}
      >
        {/* Statistics Cards */}
{toast && (
  <Toast
    type={toast.type}
    message={toast.message}
  />
)}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Uploaded Papers"
            value={papers.length}
            color="#2563EB"
            icon={Upload}
          />

          <StatsCard
            title="Encrypted Files"
            value={papers.length}
            color="#16A34A"
            icon={ShieldCheck}
          />

          <StatsCard
            title="Pending Review"
            value={papers.filter((p) => p.status === "Pending").length}
            color="#EA580C"
            icon={FileClock}
          />
        </div>

        {/* Upload Section */}

        <UploadCard>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-800">
              Upload Question Paper
            </h2>

            <p className="text-gray-500 mt-1">
              Upload the final PDF. The system encrypts the paper and stores it
              securely in cloud storage.
            </p>
          </div>

          {/* Form */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2">
                Subject
              </label>

              <input
                type="text"
                value={meta.subject}
                onChange={(e) =>
                  setMeta({ ...meta, subject: e.target.value })
                }
                placeholder="Cloud Computing"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Department
              </label>

              <input
                type="text"
                value={meta.department}
                onChange={(e) =>
                  setMeta({ ...meta, department: e.target.value })
                }
                placeholder="Computer Science Engineering"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Semester
              </label>

              <input
                type="text"
                value={meta.semester}
                onChange={(e) =>
                  setMeta({ ...meta, semester: e.target.value })
                }
                placeholder="Semester 5"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Examination Name
              </label>

              <input
                type="text"
                value={meta.exam_name}
                onChange={(e) =>
                  setMeta({ ...meta, exam_name: e.target.value })
                }
                placeholder="Mid Semester Examination"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>

          {/* File Upload */}

          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">
              Select PDF Question Paper
            </label>

            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full border border-gray-300 rounded-lg p-3 file:mr-4 file:rounded file:border-0 file:bg-blue-700 file:px-4 file:py-2 file:text-white hover:file:bg-blue-800"
            />
          </div>

          {file && (
            <div className="mt-5">
              <FileInfoCard file={file} />
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="mt-6 bg-blue-700 hover:bg-blue-800 disabled:bg-blue-300 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            {loading
              ? "Encrypting & Uploading..."
              : "Upload Question Paper"}
          </button>
        </UploadCard>

        {/* Uploaded Papers */}

        <TableCard
  title="Uploaded Question Papers"
  subtitle="Encrypted papers uploaded by the Question Setter."
  headers={[
    "Subject",
    "Department",
    "Semester",
    "Exam",
    "Status",
    "Uploaded On",
  ]}
>
  {papers.length === 0 ? (
    <tr>
      <td colSpan={6} className="p-0">
        <EmptyState
          title="No Question Papers Uploaded"
          description="Upload your first encrypted PDF to begin the secure review workflow."
        />
      </td>
    </tr>
  ) : (
    papers.map((paper) => (
      <tr
        key={paper.id}
        className="border-b hover:bg-blue-50 transition"
      >
        <td className="px-5 py-4 font-medium">{paper.subject}</td>

        <td className="px-5 py-4">{paper.department}</td>

        <td className="px-5 py-4">{paper.semester}</td>

        <td className="px-5 py-4">{paper.exam_name}</td>

        <td className="px-5 py-4">
          <StatusBadge status={paper.status} />
        </td>

        <td className="px-5 py-4 text-gray-600">
          {new Date(paper.created_at).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}

          {" • "}

          {new Date(paper.created_at).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </td>
      </tr>
    ))
  )}
</TableCard>
      </PageLayout>
    </ProtectedRoute>
  );
}