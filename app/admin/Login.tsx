"use client";

import { useState } from "react";
import { ArrowRight } from "@/components/Icons";

export function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Kirib bo'lmadi.");
        setBusy(false);
        return;
      }
      window.location.reload();
    } catch {
      setError("Tarmoqda xatolik. Qaytadan urinib ko'ring.");
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form onSubmit={submit} className="glass w-full max-w-sm rounded-[28px] p-8">
        <h1 className="t-h3">Boshqaruv paneli</h1>
        <p className="t-item mt-2" style={{ color: "var(--text-3)" }}>
          Davom etish uchun parolni kiriting.
        </p>

        <label className="mt-7 block">
          <span className="t-micro">Parol</span>
          <input
            type="password"
            value={password}
            autoFocus
            onChange={(e) => setPassword(e.target.value)}
            className="admin-input mt-2"
            aria-invalid={error ? true : undefined}
          />
        </label>

        {error && (
          <p
            role="alert"
            className="t-item mt-3"
            style={{ color: "var(--pink)" }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy || password.length === 0}
          className="pill pill-primary mt-6 w-full justify-between disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span>{busy ? "Tekshirilmoqda…" : "Kirish"}</span>
          <ArrowRight size={16} className="pill-icon" />
        </button>
      </form>
    </main>
  );
}
