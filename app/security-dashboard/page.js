"use client";

import { useState, useEffect } from "react";

import { supabase } from "../../lib/supabase";

import ProtectedRoute from "../../components/ProtectedRoute";
import PageLayout from "../../components/PageLayout";
import StatsCard from "../../components/StatsCard";
import AuditTable from "../../components/AuditTable";

import {
  FileLock2,
  CheckCircle,
  CalendarClock,
  Download,
} from "lucide-react";

export default function SecurityDashboard() {
  const [user, setUser] = useState(null);

  const [papers, setPapers] = useState([]);
  const [logs, setLogs] = useState([]);

  async function loadUser() {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  }

  async function loadPapers() {
    const { data } = await supabase
      .from("question_papers")
      .select("*");

    setPapers(data || []);
  }

  async function loadAuditLogs() {
    const { data } = await supabase
      .from("audit_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(15);

    setLogs(data || []);
  }

  useEffect(() => {
    loadUser();
    loadPapers();
    loadAuditLogs();
  }, []);

  return (
    <ProtectedRoute allowedRole="admin">
      <PageLayout
        role="admin"
        title="Security Analytics Dashboard"
        user={user}
      >
        {/* Statistic Cards */}

        <div className="grid md:grid-cols-4 gap-5 mb-8">
          <StatsCard
            title="Uploaded Papers"
            value={papers.length}
            color="#2563EB"
            icon={FileLock2}
          />

          <StatsCard
            title="Approved Papers"
            value={
              papers.filter((p) => p.status === "Approved").length
            }
            color="#16A34A"
            icon={CheckCircle}
          />

          <StatsCard
            title="Scheduled Papers"
            value={
              papers.filter((p) => p.status === "Scheduled").length
            }
            color="#9333EA"
            icon={CalendarClock}
          />

          <StatsCard
            title="Downloads"
            value={
              logs.filter((l) => l.action === "DOWNLOAD").length
            }
            color="#EA580C"
            icon={Download}
          />
        </div>

        {/* Status Summary */}

        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-blue-700 mb-5">
            Question Paper Security Status
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
              <h3 className="font-semibold text-green-700">
                Released Papers
              </h3>

              <p className="text-3xl font-bold mt-2">
                {
                  papers.filter((p) => p.status === "Released")
                    .length
                }
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
              <h3 className="font-semibold text-yellow-700">
                Pending Review
              </h3>

              <p className="text-3xl font-bold mt-2">
                {
                  papers.filter((p) => p.status === "Pending")
                    .length
                }
              </p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-600 p-4 rounded">
              <h3 className="font-semibold text-purple-700">
                Scheduled Releases
              </h3>

              <p className="text-3xl font-bold mt-2">
                {
                  papers.filter((p) => p.status === "Scheduled")
                    .length
                }
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
              <h3 className="font-semibold text-red-700">
                Rejected Papers
              </h3>

              <p className="text-3xl font-bold mt-2">
                {
                  papers.filter((p) => p.status === "Rejected")
                    .length
                }
              </p>
            </div>
          </div>
        </div>

        {/* Audit Logs */}

        <AuditTable logs={logs} />
      </PageLayout>
    </ProtectedRoute>
  );
}