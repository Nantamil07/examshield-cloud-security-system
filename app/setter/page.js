"use client";

import { useState, useEffect } from "react";

import { supabase } from "../../lib/supabase";
import ProtectedRoute from "../../components/ProtectedRoute";
import PageLayout from "../../components/PageLayout";
import UploadCard from "../../components/UploadCard";
import FileInfoCard from "../../components/FileInfoCard";
import StatusBadge from "../../components/StatusBadge";
import StatsCard from "../../components/StatsCard";

import { uploadQuestionPaper } from "../../utils/upload";

import {
  Upload,
  ShieldCheck,
  FileLock2,
} from "lucide-react";

export default function SetterPage() {
  const [user, setUser] = useState(null);
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);

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

    if (error) {
      console.log(error.message);
      return;
    }

    setUser(data.user);
  }

  // ---------------- PAPERS ----------------

  async function loadUploadedPapers() {
    const { data, error } = await supabase
      .from("question_papers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error.message);
      return;
    }

    setPapers(data);
  }

  // ---------------- UPLOAD ----------------

  async function handleUpload() {
    if (!file) {
      alert("Please choose a PDF.");
      return;
    }

    if (
      !meta.subject ||
      !meta.department ||
      !meta.semester ||
      !meta.exam_name
    ) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      await uploadQuestionPaper(file, meta, user);

      alert("Question paper uploaded successfully.");

      setFile(null);

      setMeta({
        subject: "",
        department: "",
        semester: "",
        exam_name: "",
      });

      loadUploadedPapers();
    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
  }

  // ---------------- INIT ----------------

  useEffect(() => {
    getLoggedInUser();
    loadUploadedPapers();
  }, []);

  // ---------------- UI ----------------

  return (
    <ProtectedRoute allowedRole="setter">
      <PageLayout
        role="setter"
        title="Question Setter Dashboard"
        user={user}
      >
        {/* Statistics Cards */}

        <div className="grid md:grid-cols-3 gap-6 mb-8">
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
            value={
              papers.filter((p) => p.status === "Pending").length
            }
            color="#EA580C"
            icon={FileLock2}
          />
        </div>

        {/* Upload Card */}

        <UploadCard>
          <h2 className="text-2xl font-bold text-blue-700 mb-5">
            Upload New Question Paper
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-5">
            <input
              type="text"
              placeholder="Subject"
              value={meta.subject}
              onChange={(e) =>
                setMeta({ ...meta, subject: e.target.value })
              }
              className="border rounded-lg p-3"
            />

            <input
              type="text"
              placeholder="Department"
              value={meta.department}
              onChange={(e) =>
                setMeta({ ...meta, department: e.target.value })
              }
              className="border rounded-lg p-3"
            />

            <input
              type="text"
              placeholder="Semester"
              value={meta.semester}
              onChange={(e) =>
                setMeta({ ...meta, semester: e.target.value })
              }
              className="border rounded-lg p-3"
            />

            <input
              type="text"
              placeholder="Exam Name"
              value={meta.exam_name}
              onChange={(e) =>
                setMeta({ ...meta, exam_name: e.target.value })
              }
              className="border rounded-lg p-3"
            />
          </div>

          {/* File Picker */}

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-4"
          />

          {file && <FileInfoCard file={file} />}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="mt-5 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium"
          >
            {loading
              ? "Encrypting & Uploading..."
              : "Upload Question Paper"}
          </button>
        </UploadCard>

        {/* Uploaded Papers Table */}

        <div className="bg-white rounded-xl shadow mt-10 p-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-5">
            Uploaded Question Papers
          </h2>

          {papers.length === 0 ? (
            <p className="text-gray-500">
              No uploaded question papers yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-blue-700 text-white">
                  <tr>
                    <th className="px-4 py-3">Subject</th>
                    <th className="px-4 py-3">Department</th>
                    <th className="px-4 py-3">Semester</th>
                    <th className="px-4 py-3">Exam</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Uploaded On</th>
                  </tr>
                </thead>

                <tbody>
                  {papers.map((paper) => (
                    <tr
                      key={paper.id}
                      className="hover:bg-blue-50 border-b"
                    >
                      <td className="px-4 py-3">{paper.subject}</td>

                      <td className="px-4 py-3">
                        {paper.department}
                      </td>

                      <td className="px-4 py-3">{paper.semester}</td>

                      <td className="px-4 py-3">
                        {paper.exam_name}
                      </td>

                      <td className="px-4 py-3">
                        <StatusBadge status={paper.status} />
                      </td>

                      <td className="px-4 py-3">
                        {new Date(
                          paper.created_at
                        ).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </PageLayout>
    </ProtectedRoute>
  );
}