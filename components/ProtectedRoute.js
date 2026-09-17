"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function ProtectedRoute({
  allowedRole,
  children,
}) {
  const router = useRouter();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkAccess() {
      const { data } = await supabase.auth.getUser();

      const user = data.user;

      if (!user) {
        router.replace("/login");
        return;
      }

      const role = user.user_metadata?.role;

      if (role !== allowedRole) {
        switch (role) {
          case "setter":
            router.replace("/setter");
            break;

          case "reviewer":
            router.replace("/reviewer");
            break;

          case "admin":
            router.replace("/admin");
            break;

          case "exam_center":
            router.replace("/exam-center");
            break;

          default:
            router.replace("/");
        }

        return;
      }

      setChecking(false);
    }

    checkAccess();
  }, [allowedRole, router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-blue-700 font-medium">
            Verifying Access...
          </p>
        </div>
      </div>
    );
  }

  return children;
}