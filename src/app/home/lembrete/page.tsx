"use client";
import { Lembrete } from "@/@core/presentation/lembrete";
import { Suspense } from "react";

export default function LembretePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Lembrete />
    </Suspense>
  );
}
