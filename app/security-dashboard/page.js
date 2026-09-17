"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

import ProtectedRoute from "../../components/ProtectedRoute";
import PageLayout from "../../components/PageLayout";
import StatsCard from "../../components/StatsCard";

import {
  ShieldCheck,
  FileUp,
  CalendarClock,
  Download,
  Activity,
} from "lucide-react";

export default function SecurityDashboardPage() {
  const [user, setUser] = useState(null);
  const [logs, setLogs] = useState([]);
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------------- USER ----------------

  async function loadUser() {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  }

  // ---------------- AUDIT LOGS ----------------

  async function loadAuditLogs() {
    const { data } = await supabase
      .from("audit_logs")
      .select("*")
      .order("created_at", { ascending: false });

    setLogs(data || []);
  }

  // ---------------- QUESTION PAPERS ----------------

  async function loadPapers() {
    const { data } = await supabase
      .from("question_papers")
      .select("*");

    setPapers(data || []);
  }

  useEffect(() => {
    async function initialize() {
      await loadUser();
      await loadAuditLogs();
      await loadPapers();
      setLoading(false);
    }

    initialize();
  }, []);

  if (loading) {
    return (
      <ProtectedRoute allowedRole="admin">
        <PageLayout
          role="admin"
          title="Security Dashboard"
          user={user}
        >
          <div className="flex justify-center items-center h-96">
            <p className="text-blue-700 text-lg font-medium">
              Loading security dashboard...
            </p>
          </div>
        </PageLayout>
      </ProtectedRoute>
    );
  }

  // Statistics

  const uploaded = papers.length;
  const scheduled = papers.filter(
    (p) => p.status === "Scheduled"
  ).length;
  const released = papers.filter(
    (p) => p.status === "Released"
  ).length;
  const downloads = logs.filter((log) =>
    log.action?.toLowerCase().includes("download")
  ).length;

  return (
    <ProtectedRoute allowedRole="admin">
      <PageLayout
        role="admin"
        title="Security Monitoring Dashboard"
        user={user}
      >
        {/* Statistics Cards */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Uploaded Papers"
            value={uploaded}
            color="#2563EB"
            icon={FileUp}
          />

          <StatsCard
            title="Scheduled Releases"
            value={scheduled}
            color="#7C3AED"
            icon={CalendarClock}
          />

          <StatsCard
            title="Released Papers"
            value={released}
            color="#16A34A"
            icon={ShieldCheck}
          />

          <StatsCard
            title="Download Events"
            value={downloads}
            color="#EA580C"
            icon={Download}
          />
        </div>

        {/* Security Status */}

        <div className="bg-white rounded-xl border shadow-sm p-6 mb-8">
          <div className="flex items-center gap-3 mb-5">
            <Activity className="text-blue-700" size={26} />

            <div>
              <h2 className="text-xl font-bold text-blue-800">
                Security Status Overview
              </h2>

              <p className="text-sm text-gray-500">
                Current status of the secure examination system.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h3 className="font-semibold text-green-700 mb-2">
                Encryption
              </h3>

              <p className="text-gray-700 text-sm">
                AES-256 encryption is applied before storing question papers in
                Supabase Cloud Storage.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <h3 className="font-semibold text-blue-700 mb-2">
                Integrity Verification
              </h3>

              <p className="text-gray-700 text-sm">
                SHA-256 hashes are generated during upload and verified before
                paper download validation.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
              <h3 className="font-semibold text-purple-700 mb-2">
                Access Control
              </h3>

              <p className="text-gray-700 text-sm">
                Only authenticated users with appropriate roles can access
                protected dashboards.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
              <h3 className="font-semibold text-orange-700 mb-2">
                Audit Monitoring
              </h3>

              <p className="text-gray-700 text-sm">
                Every upload, review, scheduling and download event is recorded
                in the audit log.
              </p>
            </div>
          </div>
        </div>

        {/* Audit Logs */}

        <div className="bg-white rounded-xl shadow-sm border">
          <div className="border-b px-6 py-5">
            <h2 className="text-xl font-bold text-blue-800">
              Security Audit Logs
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Complete history of security-related events.
            </p>
          </div>

          {logs.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              No audit logs available.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-blue-700 text-white">
                  <tr>
                    <th className="px-5 py-3 text-left">Action</th>
                    <th className="px-5 py-3 text-left">Description</th>
                    <th className="px-5 py-3 text-left">User</th>
                    <th className="px-5 py-3 text-left">Date & Time</th>
                  </tr>
                </thead>

                <tbody>
                  {logs.map((log) => (
                    <tr
                      key={log.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-5 py-4 font-medium">
                        {log.action}
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {log.description}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {log.user_id || "System"}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {new Date(log.created_at).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        •{" "}
                        {new Date(log.created_at).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Info */}

        <div className="mt-8 bg-gray-50 border rounded-xl p-5">
          <p className="text-sm text-gray-600">
            <strong>Security Note:</strong> This dashboard is accessible only to
            administrators and provides monitoring for uploads, approvals,
            scheduling, downloads, encryption events, and audit activity.
          </p>
        </div>
      </PageLayout>
    </ProtectedRoute>
  );
}