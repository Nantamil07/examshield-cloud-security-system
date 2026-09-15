"use client";

import { useState, useEffect } from "react";

import { supabase } from "../../lib/supabase";

import ProtectedRoute from "../../components/ProtectedRoute";

import UploadCard from "../../components/UploadCard";

import FileInfoCard from "../../components/FileInfoCard";

import StatusBadge from "../../components/StatusBadge";

import { uploadQuestionPaper } from "../../utils/upload";
export default function SetterPage() {
const [user, setUser] = useState(null);

const [loading, setLoading] = useState(false);

const [papers, setPapers] = useState([]);

const [file, setFile] = useState(null);

const [meta, setMeta] = useState({

    subject: "",

    department: "",

    semester: "",

    exam_name: ""

});
async function getLoggedInUser() {

    const { data, error } = await supabase.auth.getUser();

    if (error) {

        console.log(error.message);

        return;

    }

    setUser(data.user);

}
async function loadUploadedPapers() {

    const { data, error } = await supabase

        .from("question_papers")

        .select("*")

        .order("created_at", {

            ascending: false

        });

    if (error) {

        console.log(error.message);

        return;

    }

    setPapers(data);

}
useEffect(() => {

    getLoggedInUser();

    loadUploadedPapers();

}, []);

function validateForm() {

  if (!meta.subject.trim()) {
    alert("Please enter the Subject.");
    return false;
  }

  if (!meta.department.trim()) {
    alert("Please enter the Department.");
    return false;
  }

  if (!meta.semester.trim()) {
    alert("Please enter the Semester.");
    return false;
  }

  if (!meta.exam_name.trim()) {
    alert("Please enter the Exam Name.");
    return false;
  }

  if (!file) {
    alert("Please select a PDF question paper.");
    return false;
  }

  return true;
}

async function submitQuestionPaper() {
  if (!validateForm()) return;

  setLoading(true);

  try {
    const result = await uploadQuestionPaper(
      file,
      meta,
      user
    );

    alert("Question Paper Uploaded Successfully!");

    console.log(result);

    // Refresh uploaded papers table
    loadUploadedPapers();

    // Reset form
    setMeta({
      subject: "",
      department: "",
      semester: "",
      exam_name: "",
    });

    setFile(null);
  } catch (error) {
    alert(error.message);
  }

  setLoading(false);
}

return (
  <ProtectedRoute>
    <main className="min-h-screen bg-gray-100 p-8">
      <UploadCard>
        <h1 className="text-3xl font-bold text-blue-700 mb-3">
          Question Setter Dashboard
        </h1>

        <p className="mb-4">
          Welcome to ExamShield Cloud
        </p>

        {user ? (
          <div className="bg-blue-50 p-4 rounded-lg border mb-6">
            <p><strong>Name:</strong> {user.user_metadata?.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.user_metadata?.role}</p>
          </div>
        ) : (
          <p>Loading user...</p>
        )}

        {/* Upload Form */}
        <h2 className="text-2xl font-semibold mt-6 mb-4">
          Upload New Question Paper
        </h2>

        <div className="space-y-4">
          <input
            className="w-full border rounded-lg p-3"
            placeholder="Subject"
            value={meta.subject}
            onChange={(e) =>
              setMeta({ ...meta, subject: e.target.value })
            }
          />

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Department"
            value={meta.department}
            onChange={(e) =>
              setMeta({ ...meta, department: e.target.value })
            }
          />

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Semester"
            value={meta.semester}
            onChange={(e) =>
              setMeta({ ...meta, semester: e.target.value })
            }
          />

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Exam Name"
            value={meta.exam_name}
            onChange={(e) =>
              setMeta({ ...meta, exam_name: e.target.value })
            }
          />
          {/* PDF Upload */}

<div className="mt-4">
  <label className="block text-gray-700 font-medium mb-2">
    Select Question Paper (PDF Only)
  </label>

  <input
    type="file"
    accept=".pdf"
    onChange={(e) => setFile(e.target.files[0])}
    className="w-full border rounded-lg p-3 bg-white"
  />
</div>
<FileInfoCard file={file} />
<button
  onClick={submitQuestionPaper}
  disabled={loading}
  className="mt-6 w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold transition"
>
  {loading ? "Encrypting & Uploading..." : "Upload Securely"}
</button>
        </div>
      </UploadCard>
    </main>
  </ProtectedRoute>
);
}