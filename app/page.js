import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Clock,
  FileCheck,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    title: "AES-256 Encryption",
    description:
      "Question papers are encrypted before storing in cloud storage.",
    icon: Lock,
  },
  {
    title: "Role-Based Access",
    description:
      "Different dashboards for Setter, Reviewer, Admin and Exam Center.",
    icon: ShieldCheck,
  },
  {
    title: "Controlled Release",
    description:
      "Question papers remain inaccessible until scheduled examination time.",
    icon: Clock,
  },
  {
    title: "SHA-256 Integrity Verification",
    description:
      "Downloaded papers can be verified to detect any modification.",
    icon: FileCheck,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navbar */}

      <nav className="bg-blue-900 text-white px-10 py-5 flex justify-between items-center shadow">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="ExamShield Logo"
            className="w-10 h-10 rounded-full bg-white p-1"
          />

          <div>
            <h1 className="font-bold text-lg">
              ExamShield Cloud
            </h1>

            <p className="text-xs text-blue-200">
              Secure Question Paper Management System
            </p>
          </div>
        </div>

        <Link href="/login">
          <button className="bg-white text-blue-900 px-5 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
            Login
          </button>
        </Link>
      </nav>

      {/* Hero Section */}

      <section className="max-w-6xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-5xl font-bold text-blue-900 leading-tight">
            Secure Cloud-Based Question Paper Management System
          </h1>

          <p className="text-gray-600 mt-6 leading-8">
            ExamShield Cloud is a secure examination management portal
            designed to prevent unauthorized access, modification and
            leakage of government competitive examination question papers
            before the scheduled examination.
          </p>

          <div className="flex gap-4 mt-8">
            <Link href="/login">
              <button className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 flex items-center gap-2 transition">
                Login Portal <ArrowRight size={18} />
              </button>
            </Link>

            <Link href="/verify">
              <button className="border border-blue-700 text-blue-700 px-6 py-3 rounded-lg hover:bg-blue-50 transition">
                Verify Integrity
              </button>
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src="/logo.png"
            alt="ExamShield Logo"
            className="w-64 h-64 rounded-full bg-blue-50 p-8 shadow-md"
          />
        </div>
      </section>

      {/* Security Features */}

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">
            Core Security Features
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="border rounded-xl p-6 flex gap-5 hover:shadow transition bg-gray-50"
                >
                  <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center">
                    <Icon className="text-blue-700" size={28} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg text-blue-800">
                      {feature.title}
                    </h3>

                    <p className="text-gray-600 mt-2 text-sm leading-6">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow */}

      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">
            Secure Workflow
          </h2>

          <div className="grid md:grid-cols-5 gap-5 text-center">
            {[
              "Setter Uploads Paper",
              "Reviewer Approves Paper",
              "Admin Schedules Release",
              "Countdown Until Exam Time",
              "Exam Center Downloads Watermarked PDF",
            ].map((step, index) => (
              <div
                key={step}
                className="bg-white rounded-xl p-5 shadow-sm"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-lg mb-4">
                  {index + 1}
                </div>

                <p className="text-sm text-gray-700 leading-6">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}

      <footer className="bg-blue-900 text-white py-10 text-center">
        <h3 className="font-bold text-lg">
          ExamShield Cloud
        </h3>

        <p className="text-blue-200 mt-2 text-sm">
          Secure Cloud-Based Question Paper Management System
        </p>

        <p className="text-xs text-blue-300 mt-4">
          Developed for Cloud Computing Microproject • Coimbatore Institute of Technology
        </p>
      </footer>
    </main>
  );
}