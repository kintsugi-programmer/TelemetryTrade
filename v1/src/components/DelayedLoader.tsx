// components/DelayedLoader.tsx
"use client";

import React, { useState, useEffect } from "react";
import Loading from "@/app/loading";
type DelayedLoaderProps = {
  children: React.ReactNode;
};

export default function DelayedLoader({ children }: DelayedLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
}