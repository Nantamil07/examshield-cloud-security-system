import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Clock3,
  FileCheck2,
  Cloud,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  const features = [
    {
      title: "AES-256 Encryption",
      desc: "Question papers are encrypted before cloud storage using AES-256.",
      icon: Lock,
    },
    {
      title: "Role-Based Access",
      desc: "Separate dashboards for Setter, Reviewer, Administrator and Exam Center.",
      icon: ShieldCheck,
    },
    {
      title: "Scheduled Release",
      desc: "Question papers remain inaccessible until the configured examination time.",
      icon: Clock3,
    },
    {
      title: "SHA-256 Integrity Verification",
      desc: "Every downloaded paper can be verified to detect tampering or corruption.",
      icon: FileCheck2,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navbar */}

      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              className="w-12 h-12 rounded-full bg-blue-50 p-2"
              alt="ExamShield Logo"
            />

            <div>
              <h2 className="font-bold text-blue-900 text-lg">
                ExamShield Cloud
              </h2>

              <p className="text-xs text-gray-500">
                Secure Question Paper Management System
              </p>
            </div>
          </div>

          <Link href="/login">
            <button className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg font-medium">
              Login
            </button>
          </Link>
        </div>
      </header>

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            <Cloud size={18} />
            Cloud Computing Microproject
          </div>

          <h1 className="text-5xl font-bold text-blue-900 leading-tight mt-6">
            Secure Cloud-Based Question Paper Distribution Platform
          </h1>

          <p className="text-gray-600 mt-6 text-lg leading-8">
            ExamShield Cloud securely manages examination question papers using
            encryption, role-based access control, scheduled release, watermarking,
            audit logs, and integrity verification.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Link href="/login">
              <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg flex items-center gap-2">
                Login Portal
                <ArrowRight size={18} />
              </button>
            </Link>

            <Link href="/verify">
              <button className="border border-blue-700 text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-lg">
                Verify Integrity
              </button>
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src="/logo.png"
            className="w-80 h-80 rounded-full bg-white shadow-xl p-8"
            alt="ExamShield Logo"
          />
        </div>
      </section>

      {/* Security Features */}

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-4">
            Security Features
          </h2>

          <p className="text-center text-gray-500 mb-12">
            End-to-end protection throughout the examination workflow.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="border rounded-xl p-6 hover:border-blue-300 transition"
                >
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Icon className="text-blue-700" size={28} />
                  </div>

                  <h3 className="font-semibold text-xl text-blue-900 mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 leading-7">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow */}

      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
            Secure Examination Workflow
          </h2>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              "Setter Uploads Encrypted Paper",
              "Reviewer Approves Paper",
              "Administrator Schedules Release",
              "Countdown Until Exam Time",
              "Exam Center Downloads Watermarked PDF",
            ].map((step, index) => (
              <div
                key={step}
                className="bg-white rounded-xl p-5 text-center shadow-sm border"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-blue-700 text-white flex items-center justify-center font-bold mb-4">
                  {index + 1}
                </div>

                <p className="text-gray-700 text-sm leading-6">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}

      <footer className="bg-blue-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h3 className="text-xl font-bold">
            ExamShield Cloud
          </h3>

          <p className="text-blue-200 mt-2">
            Secure Question Paper Management System
          </p>

          <p className="text-blue-300 text-sm mt-5">
            Developed as a Cloud Computing Microproject • Coimbatore Institute of Technology
          </p>
        </div>
      </footer>
    </main>
  );
}