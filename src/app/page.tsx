"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LandingPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return null; // ou <> </> se preferir
};

export default LandingPage;
