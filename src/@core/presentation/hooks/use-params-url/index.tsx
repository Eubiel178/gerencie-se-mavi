"use client";

import { useCallback } from "react";
import { useSearchParams } from "next/navigation";

export function useParamsUrl(defaultValue: string = "") {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return "?" + params.toString();
    },
    [searchParams]
  );

  // Retorna uma função 'get' que nunca retorna null
  const get = useCallback(
    (name: string) => searchParams.get(name) ?? defaultValue,
    [searchParams, defaultValue]
  );

  return { createQueryString, get };
}
