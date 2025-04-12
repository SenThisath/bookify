"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 blur-xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-30 animate-pulse"></div>
          <div className="relative bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl">
            <div className="space-y-6">
              <div className="flex items-center justify-center">
                <h1 className="text-8xl font-black text-slate-800 dark:text-white animate-bounce">
                  4<span className="text-blue-500">0</span>4
                </h1>
              </div>
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold text-slate-700 dark:text-slate-200">
                  Lost in Space
                </h2>
                <p className="text-slate-500 dark:text-slate-400">
                  The page you&apos;re looking for has floated away into the void
                </p>
              </div>
              <div className="flex justify-center">
                <Button onClick={() => router.push(`/dashboard/`)}>
                  Take Me To Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
