import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Fingerprint,
  Cloud,
  FileKey,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Lock,
      title: "AES-256 Encryption",
      description:
        "Question papers are encrypted before cloud storage to ensure confidentiality.",
    },
    {
      icon: Fingerprint,
      title: "SHA-256 Integrity Verification",
      description:
        "Every uploaded question paper is hashed to detect unauthorized modifications.",
    },
    {
      icon: ShieldCheck,
      title: "Role-Based Access Control",
      description:
        "Separate dashboards for Setter, Reviewer, Admin and Exam Center.",
    },
    {
      icon: Clock,
      title: "Controlled Release",
      description:
        "Question papers remain locked until the scheduled examination time.",
    },
    {
      icon: Cloud,
      title: "Secure Cloud Storage",
      description:
        "Encrypted papers are stored securely inside Supabase Cloud Storage.",
    },
    {
      icon: FileKey,
      title: "Audit Monitoring",
      description:
        "Every upload, approval, release and download is recorded in audit logs.",
    },
  ];

  const roles = [
    {
      title: "Question Setter",
      link: "/setter",
      color: "bg-blue-700",
    },
    {
      title: "Reviewer",
      link: "/reviewer",
      color: "bg-green-700",
    },
    {
      title: "Administrator",
      link: "/admin",
      color: "bg-purple-700",
    },
    {
      title: "Exam Center",
      link: "/exam-center",
      color: "bg-orange-600",
    },
  ];

  return (
    <main className="bg-gray-50 min-h-screen">

      {/* Navbar */}

      <nav className="bg-blue-900 text-white px-10 py-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            className="w-11 h-11 rounded-full bg-white p-1"
          />

          <div>
            <h1 className="text-xl font-bold">
              ExamShield Cloud
            </h1>

            <p className="text-xs text-blue-200">
              Secure Question Paper Management Portal
            </p>
          </div>
        </div>

        <Link href="/login">
          <button className="bg-white text-blue-900 px-5 py-2 rounded-lg font-semibold hover:bg-gray-200">
            Login
          </button>
        </Link>
      </nav>

      {/* Hero */}

      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white px-12 py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Government Secure Cloud-Based
              Question Paper Management System
            </h1>

            <p className="text-lg text-blue-100 mb-8 leading-8">
              ExamShield Cloud prevents unauthorized access,
              leakage, modification and early release of
              government competitive examination question papers
              using encryption, authentication, cloud storage,
              access control and integrity verification.
            </p>

            <div className="flex gap-4">
              <Link href="/login">
                <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold flex items-center gap-2">
                  Login Portal <ArrowRight size={18}/>
                </button>
              </Link>

              <Link href="/verify">
                <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-900 transition">
                  Verify Integrity
                </button>
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src="/logo.png"
              className="w-72 h-72 bg-white rounded-full p-8 shadow-2xl"
            />
          </div>

        </div>
      </section>

      {/* Security Features */}

      <section className="max-w-7xl mx-auto py-20 px-8">

        <h2 className="text-4xl font-bold text-center text-blue-800 mb-4">
          Core Security Features
        </h2>

        <p className="text-center text-gray-600 mb-12">
          Designed to satisfy confidentiality, integrity,
          authentication, monitoring and controlled release.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow p-7 hover:shadow-lg transition"
              >
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-5">
                  <Icon className="text-blue-700" size={28}/>
                </div>

                <h3 className="text-xl font-bold mb-3 text-blue-800">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Workflow */}

      <section className="bg-white py-20 px-8">

        <h2 className="text-4xl font-bold text-center text-blue-800 mb-12">
          Secure Workflow
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-6 text-center">

          {[
            "Question Setter Uploads Encrypted Paper",
            "Reviewer Approves or Rejects",
            "Admin Schedules Release Time",
            "Countdown Until Exam Time",
            "Exam Center Downloads Watermarked Paper",
          ].map((step, index) => (
            <div key={index}>
              <div className="w-16 h-16 mx-auto rounded-full bg-blue-700 text-white flex items-center justify-center text-xl font-bold mb-4">
                {index + 1}
              </div>

              <p className="text-sm font-medium leading-6">
                {step}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* Role Cards */}

      <section className="max-w-7xl mx-auto py-20 px-8">

        <h2 className="text-4xl font-bold text-center text-blue-800 mb-12">
          Secure Access Portals
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          {roles.map((role) => (
            <div
              key={role.title}
              className="bg-white rounded-2xl shadow p-6 text-center"
            >
              <ShieldCheck
                className="mx-auto text-blue-700 mb-4"
                size={42}
              />

              <h3 className="font-bold text-xl mb-5">
                {role.title}
              </h3>

              <Link href={role.link}>
                <button
                  className={`${role.color} w-full text-white py-3 rounded-lg hover:opacity-90`}
                >
                  Open Portal
                </button>
              </Link>
            </div>
          ))}

        </div>

      </section>

      {/* Technologies */}

      <section className="bg-blue-50 py-20 px-8">

        <h2 className="text-4xl font-bold text-center text-blue-800 mb-12">
          Technology Stack
        </h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

          {[
            "Next.js 16",
            "React + Tailwind CSS",
            "Supabase Authentication",
            "Supabase PostgreSQL Database",
            "Supabase Cloud Storage",
            "AES-256 Encryption (CryptoJS)",
            "SHA-256 Hashing",
            "PDF Watermarking using pdf-lib",
          ].map((tech) => (
            <div
              key={tech}
              className="bg-white rounded-xl p-5 shadow flex items-center gap-3"
            >
              <CheckCircle className="text-green-600"/>

              <span className="font-medium">{tech}</span>
            </div>
          ))}

        </div>

      </section>

      {/* Footer */}

      <footer className="bg-blue-900 text-blue-100 py-10 text-center">
        <h3 className="text-xl font-bold text-white mb-2">
          ExamShield Cloud
        </h3>

        <p>
          Secure Cloud-Based Question Paper Management System
        </p>

        <p className="text-sm mt-3 text-blue-300">
          Developed as a Cloud Computing Microproject
        </p>
      </footer>

    </main>
  );
}