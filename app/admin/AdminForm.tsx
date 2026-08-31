"use client";

import { useState, useCallback } from "react";
import { Plus, Check, ArrowRight } from "@/components/Icons";
import type {
  Content,
  FaqItem,
  Package,
  ProofShot,
  Testimonial,
  VideoTestimonial,
} from "@/lib/types";

/* ---------- kichik yordamchilar ---------------------------------------- */

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

/** ISO → <input type="datetime-local"> qiymati (mahalliy vaqtda). */
function toLocalInput(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}`;
}

function fromLocalInput(v: string): string | null {
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="glass rounded-[26px] p-6 sm:p-8">
      <h2 className="t-h3">{title}</h2>
      {hint && (
        <p className="t-item mt-1.5" style={{ color: "var(--text-3)" }}>
          {hint}
        </p>
      )}
      <div className="mt-6 flex flex-col gap-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="t-micro">{label}</span>
      {children}
      {hint && (
        <span
          className="mt-1.5 block t-item"
          style={{ color: "var(--text-3)", fontSize: "0.8125rem" }}
        >
          {hint}
        </span>
      )}
    </label>
  );
}

/** Rasm yuklovchi — yuklangach yo'lni qaytaradi. */
function Upload({
  kind,
  value,
  onChange,
}: {
  kind: "portrait" | "proof" | "poster";
  value: string | null;
  onChange: (path: string | null) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("kind", kind);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? "Yuklanmadi.");
      else onChange(data.path);
    } catch {
      setError("Tarmoqda xatolik.");
    }
    setBusy(false);
    e.target.value = "";
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          className="rounded-xl object-cover"
          style={{
            width: 56,
            height: 70,
            border: "1px solid rgba(255,255,255,.16)",
          }}
        />
      )}
      <label className="pill pill-quiet pill-sm" style={{ cursor: "pointer" }}>
        <span>{busy ? "Yuklanmoqda…" : value ? "Almashtirish" : "Rasm yuklash"}</span>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={pick}
          disabled={busy}
        />
      </label>
      {value && (
        <button
          type="button"
          onClick={() => onChange(null)}
          className="t-item underline underline-offset-4"
          style={{ color: "var(--text-3)" }}
        >
          O&apos;chirish
        </button>
      )}
      {error && (
        <span className="t-item" style={{ color: "var(--pink)" }}>
          {error}
        </span>
      )}
    </div>
  );
}

function AddButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="pill pill-quiet pill-sm self-start"
    >
      <span>{children}</span>
      <Plus size={16} className="pill-icon" />
    </button>
  );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="t-item underline underline-offset-4"
      style={{ color: "var(--text-3)" }}
    >
      O&apos;chirish
    </button>
  );
}

/* ---------- asosiy forma ------------------------------------------------ */

export function AdminForm({ initial }: { initial: Content }) {
  const [c, setC] = useState<Content>(initial);
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  const patch = useCallback((p: Partial<Content>) => {
    setC((prev) => ({ ...prev, ...p }));
    setState("idle");
  }, []);

  function patchPackage(id: string, p: Partial<Package>) {
    patch({
      packages: c.packages.map((x) => (x.id === id ? { ...x, ...p } : x)),
    });
  }

  async function save() {
    setState("saving");
    setError(null);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(c),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Saqlanmadi.");
        setState("error");
        return;
      }
      setState("saved");
    } catch {
      setError("Tarmoqda xatolik.");
      setState("error");
    }
  }

  async function logout() {
    await fetch("/api/auth", { method: "DELETE" });
    window.location.reload();
  }

  const campaignOn = c.campaign !== null;

  return (
    <main className="mx-auto w-full max-w-3xl px-5 pb-40 pt-10 sm:px-8">
      <header className="mb-9 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="t-h2" style={{ fontSize: "clamp(1.6rem,4vw,2.2rem)" }}>
            Boshqaruv paneli
          </h1>
          <p className="t-item mt-1.5" style={{ color: "var(--text-3)" }}>
            O&apos;zgartirib, pastdagi &laquo;Saqlash&raquo; tugmasini bosing.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="t-item underline underline-offset-4"
            style={{ color: "var(--text-2)" }}
          >
            Saytni ko&apos;rish
          </a>
          <button
            type="button"
            onClick={logout}
            className="t-item underline underline-offset-4"
            style={{ color: "var(--text-3)" }}
          >
            Chiqish
          </button>
        </div>
      </header>

      <div className="flex flex-col gap-4">
        {/* ---------------- Zapusk ---------------- */}
        <Section
          title="Chegirma va vaqt"
          hint="Chegirma tugash vaqti o'tishi bilan sayt o'zi asl narxga qaytadi va taymer yo'qoladi."
        >
          <div className="flex flex-wrap gap-3">
            {[
              { v: "max", l: "Eng katta chegirma" },
              { v: "standard", l: "Standard chegirma" },
              { v: "off", l: "Chegirmasiz (asl narx)" },
            ].map((opt) => {
              const active = opt.v === "off" ? !campaignOn : c.campaign?.mode === opt.v;
              return (
                <button
                  key={opt.v}
                  type="button"
                  onClick={() =>
                    patch({
                      campaign:
                        opt.v === "off"
                          ? null
                          : {
                              mode: opt.v as "max" | "standard",
                              endsAt: c.campaign?.endsAt ?? null,
                              label:
                                opt.v === "max"
                                  ? "Eng katta chegirma"
                                  : "Standard chegirma",
                            },
                    })
                  }
                  className="admin-choice"
                  data-active={active || undefined}
                >
                  {active && <Check size={15} />}
                  {opt.l}
                </button>
              );
            })}
          </div>

          {campaignOn && (
            <>
              <Field
                label="Chegirma tugash vaqti"
                hint="Bo'sh qoldirsangiz chegirma amal qiladi, lekin taymer ko'rinmaydi."
              >
                <input
                  type="datetime-local"
                  className="admin-input mt-2"
                  value={toLocalInput(c.campaign!.endsAt)}
                  onChange={(e) =>
                    patch({
                      campaign: {
                        ...c.campaign!,
                        endsAt: fromLocalInput(e.target.value),
                      },
                    })
                  }
                />
              </Field>

              <Field label="Taymer ustidagi yozuv">
                <input
                  className="admin-input mt-2"
                  value={c.campaign!.label}
                  onChange={(e) =>
                    patch({
                      campaign: { ...c.campaign!, label: e.target.value },
                    })
                  }
                />
              </Field>
            </>
          )}

          <Field label="Kurs boshlanish sanasi" hint="Ixtiyoriy.">
            <input
              type="datetime-local"
              className="admin-input mt-2"
              value={toLocalInput(c.courseStart)}
              onChange={(e) =>
                patch({ courseStart: fromLocalInput(e.target.value) })
              }
            />
          </Field>
        </Section>

        {/* ---------------- Aloqa ---------------- */}
        <Section title="Aloqa havolalari">
          <Field
            label="Telegram manager"
            hint="Knopka bosilganda shu hisobga tayyor xabar bilan o'tadi."
          >
            <input
              className="admin-input mt-2"
              value={c.telegramUsername}
              onChange={(e) => patch({ telegramUsername: e.target.value })}
            />
          </Field>
          <Field
            label="Telegram kanal"
            hint="Sizning O'Z kanalingiz — surat ostidagi belgi shunga olib boradi. Bo'sh qoldirsangiz ko'rinmaydi."
          >
            <input
              className="admin-input mt-2"
              placeholder="https://t.me/..."
              value={c.telegramChannelUrl}
              onChange={(e) => patch({ telegramChannelUrl: e.target.value })}
            />
          </Field>
          <Field label="Instagram havolasi" hint="Bo'sh qoldirsangiz ko'rinmaydi.">
            <input
              className="admin-input mt-2"
              placeholder="https://instagram.com/..."
              value={c.instagramUrl}
              onChange={(e) => patch({ instagramUrl: e.target.value })}
            />
          </Field>
          {/* YouTube HOZIRCHA HECH QAYERDA CHIQMAYDI. Uning yagona
              o'rni `/bepul-darslik` dagi obuna qatori edi va u qator
              2026-08-31 da olib tashlandi; hero dagi ikkita belgi esa
              2026-08-16 da qotirilgan va unga tegilmadi.

              Maydon SHU SABABLI turibdi: havola saqlanib qoladi va
              obuna qatori qaytarilsa, uni qaytadan yozib chiqish shart
              emas. Izoh esa haqiqatni aytadi — nimanidir boshqaraman
              deb turgan, aslida hech narsani boshqarmaydigan maydon
              maydon yo'qligidan ham yomon. */}
          <Field
            label="YouTube havolasi"
            hint="Hozircha saytda ko'rinmaydi — obuna qatori olib tashlangan."
          >
            <input
              className="admin-input mt-2"
              placeholder="https://youtube.com/@..."
              value={c.youtubeUrl}
              onChange={(e) => patch({ youtubeUrl: e.target.value })}
            />
          </Field>
        </Section>

        {/* ---------------- Paketlar ---------------- */}
        <Section
          title="Paketlar va narxlar"
          hint="Uchala narx ham shu yerda. Sayt qaysi birini ko'rsatishini yuqoridagi chegirma bosqichi hal qiladi."
        >
          {c.packages.map((p) => (
            <div
              key={p.id}
              className="rounded-[20px] p-5"
              style={{
                background: "rgba(255,255,255,.035)",
                border: "1px solid rgba(255,255,255,.1)",
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <input
                  className="admin-input"
                  style={{
                    maxWidth: 160,
                    fontWeight: 800,
                    textTransform: "uppercase",
                  }}
                  value={p.name}
                  onChange={(e) => patchPackage(p.id, { name: e.target.value })}
                />
                <label className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    className="admin-check"
                    checked={p.featured}
                    onChange={(e) =>
                      patch({
                        packages: c.packages.map((x) => ({
                          ...x,
                          featured: x.id === p.id ? e.target.checked : false,
                        })),
                      })
                    }
                  />
                  {/* Yorliq sahifadagi belgi bilan BIR XIL nomlanadi
                      (2026-08-17 da "Bestseller" → "TOP"): admin panelida
                      bir nom, sahifada boshqasi turgani chalkashtirardi. */}
                  <span className="t-item">TOP (ajratib ko&apos;rsatish)</span>
                </label>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {(
                  [
                    ["max", "Eng katta chegirma"],
                    ["standard", "Standard chegirma"],
                    ["original", "Asl narx"],
                  ] as const
                ).map(([key, label]) => (
                  <Field key={key} label={label}>
                    <input
                      type="number"
                      min={0}
                      className="admin-input mt-2"
                      value={p.prices[key]}
                      onChange={(e) =>
                        patchPackage(p.id, {
                          prices: {
                            ...p.prices,
                            [key]: Number(e.target.value),
                          },
                        })
                      }
                    />
                  </Field>
                ))}
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Qamrov">
                  <input
                    className="admin-input mt-2"
                    value={p.scope}
                    onChange={(e) => patchPackage(p.id, { scope: e.target.value })}
                  />
                </Field>
                <Field label="Kirish muddati">
                  <input
                    className="admin-input mt-2"
                    value={p.access}
                    onChange={(e) => patchPackage(p.id, { access: e.target.value })}
                  />
                </Field>
              </div>

              <Field label="Bir qatorlik izoh">
                <input
                  className="admin-input mt-2"
                  value={p.tagline}
                  onChange={(e) => patchPackage(p.id, { tagline: e.target.value })}
                />
              </Field>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Asosiy bandlar" hint="Har bir band — alohida qator.">
                  <textarea
                    rows={5}
                    className="admin-input mt-2"
                    value={p.base.join("\n")}
                    onChange={(e) =>
                      patchPackage(p.id, {
                        base: e.target.value.split("\n").filter(Boolean),
                      })
                    }
                  />
                </Field>
                <Field
                  label="Qo'shimcha bandlar (+)"
                  hint="Faqat shu paketda bor imkoniyatlar."
                >
                  <textarea
                    rows={5}
                    className="admin-input mt-2"
                    value={p.extras.join("\n")}
                    onChange={(e) =>
                      patchPackage(p.id, {
                        extras: e.target.value.split("\n").filter(Boolean),
                      })
                    }
                  />
                </Field>
              </div>
            </div>
          ))}
        </Section>

        {/* ---------------- Raqamlar ---------------- */}
        <Section
          title="Raqamlar"
          hint="Bo'sh qoldirilgan raqam saytda umuman ko'rinmaydi."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Bitiruvchilar soni" hint="Masalan: 340+">
              <input
                className="admin-input mt-2"
                value={c.stats.graduates}
                onChange={(e) =>
                  patch({ stats: { ...c.stats, graduates: e.target.value } })
                }
              />
            </Field>
            <Field label="Video darslar soni">
              <input
                className="admin-input mt-2"
                value={c.stats.lessons}
                onChange={(e) =>
                  patch({ stats: { ...c.stats, lessons: e.target.value } })
                }
              />
            </Field>
          </div>
        </Section>

        {/* ---------------- Daromad skrinshotlari ---------------- */}
        <Section
          title="Daromad skrinshotlari"
          hint="Talabalarning to'lov/daromad skrinlari. 3:4 nisbat eng yaxshi ko'rinadi."
        >
          {c.proof.shots.map((s: ProofShot) => (
            <div
              key={s.id}
              className="flex flex-col gap-3 rounded-[18px] p-4"
              style={{
                background: "rgba(255,255,255,.035)",
                border: "1px solid rgba(255,255,255,.1)",
              }}
            >
              <Upload
                kind="proof"
                value={s.src || null}
                onChange={(path) =>
                  patch({
                    proof: {
                      ...c.proof,
                      shots: c.proof.shots.map((x) =>
                        x.id === s.id ? { ...x, src: path ?? "" } : x,
                      ),
                    },
                  })
                }
              />
              <div className="flex items-end gap-3">
                <Field label="Izoh">
                  <input
                    className="admin-input mt-2"
                    placeholder="Masalan: 2-oyda $1200"
                    value={s.caption}
                    onChange={(e) =>
                      patch({
                        proof: {
                          ...c.proof,
                          shots: c.proof.shots.map((x) =>
                            x.id === s.id ? { ...x, caption: e.target.value } : x,
                          ),
                        },
                      })
                    }
                  />
                </Field>
                <RemoveButton
                  onClick={() =>
                    patch({
                      proof: {
                        ...c.proof,
                        shots: c.proof.shots.filter((x) => x.id !== s.id),
                      },
                    })
                  }
                />
              </div>
            </div>
          ))}
          <AddButton
            onClick={() =>
              patch({
                proof: {
                  ...c.proof,
                  shots: [...c.proof.shots, { id: uid(), src: "", caption: "" }],
                },
              })
            }
          >
            Skrinshot qo&apos;shish
          </AddButton>
        </Section>

        {/* ---------------- Video otzivlar ---------------- */}
        <Section
          title="Video otzivlar"
          hint="Instagram yoki YouTube havolasi. Poster rasm ixtiyoriy."
        >
          {c.proof.videos.map((v: VideoTestimonial) => (
            <div
              key={v.id}
              className="flex flex-col gap-3 rounded-[18px] p-4"
              style={{
                background: "rgba(255,255,255,.035)",
                border: "1px solid rgba(255,255,255,.1)",
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Ism">
                  <input
                    className="admin-input mt-2"
                    value={v.name}
                    onChange={(e) =>
                      patch({
                        proof: {
                          ...c.proof,
                          videos: c.proof.videos.map((x) =>
                            x.id === v.id ? { ...x, name: e.target.value } : x,
                          ),
                        },
                      })
                    }
                  />
                </Field>
                <Field label="Natija">
                  <input
                    className="admin-input mt-2"
                    placeholder="1-oyda $250"
                    value={v.result}
                    onChange={(e) =>
                      patch({
                        proof: {
                          ...c.proof,
                          videos: c.proof.videos.map((x) =>
                            x.id === v.id ? { ...x, result: e.target.value } : x,
                          ),
                        },
                      })
                    }
                  />
                </Field>
              </div>
              <Field label="Video havolasi">
                <input
                  className="admin-input mt-2"
                  placeholder="https://..."
                  value={v.url}
                  onChange={(e) =>
                    patch({
                      proof: {
                        ...c.proof,
                        videos: c.proof.videos.map((x) =>
                          x.id === v.id ? { ...x, url: e.target.value } : x,
                        ),
                      },
                    })
                  }
                />
              </Field>
              <div className="flex items-center justify-between gap-3">
                <Upload
                  kind="poster"
                  value={v.poster}
                  onChange={(path) =>
                    patch({
                      proof: {
                        ...c.proof,
                        videos: c.proof.videos.map((x) =>
                          x.id === v.id ? { ...x, poster: path } : x,
                        ),
                      },
                    })
                  }
                />
                <RemoveButton
                  onClick={() =>
                    patch({
                      proof: {
                        ...c.proof,
                        videos: c.proof.videos.filter((x) => x.id !== v.id),
                      },
                    })
                  }
                />
              </div>
            </div>
          ))}
          <AddButton
            onClick={() =>
              patch({
                proof: {
                  ...c.proof,
                  videos: [
                    ...c.proof.videos,
                    { id: uid(), url: "", name: "", result: "", poster: null },
                  ],
                },
              })
            }
          >
            Video otziv qo&apos;shish
          </AddButton>
        </Section>

        {/* ---------------- Matnli otzivlar ---------------- */}
        <Section title="Matnli otzivlar">
          {c.proof.testimonials.map((t: Testimonial) => (
            <div
              key={t.id}
              className="flex flex-col gap-3 rounded-[18px] p-4"
              style={{
                background: "rgba(255,255,255,.035)",
                border: "1px solid rgba(255,255,255,.1)",
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Ism">
                  <input
                    className="admin-input mt-2"
                    value={t.name}
                    onChange={(e) =>
                      patch({
                        proof: {
                          ...c.proof,
                          testimonials: c.proof.testimonials.map((x) =>
                            x.id === t.id ? { ...x, name: e.target.value } : x,
                          ),
                        },
                      })
                    }
                  />
                </Field>
                <Field label="Natija">
                  <input
                    className="admin-input mt-2"
                    placeholder="1-oyda $250"
                    value={t.result}
                    onChange={(e) =>
                      patch({
                        proof: {
                          ...c.proof,
                          testimonials: c.proof.testimonials.map((x) =>
                            x.id === t.id ? { ...x, result: e.target.value } : x,
                          ),
                        },
                      })
                    }
                  />
                </Field>
              </div>
              <div className="flex items-end gap-3">
                <Field label="Otziv matni">
                  <textarea
                    rows={3}
                    className="admin-input mt-2"
                    value={t.text}
                    onChange={(e) =>
                      patch({
                        proof: {
                          ...c.proof,
                          testimonials: c.proof.testimonials.map((x) =>
                            x.id === t.id ? { ...x, text: e.target.value } : x,
                          ),
                        },
                      })
                    }
                  />
                </Field>
                <RemoveButton
                  onClick={() =>
                    patch({
                      proof: {
                        ...c.proof,
                        testimonials: c.proof.testimonials.filter(
                          (x) => x.id !== t.id,
                        ),
                      },
                    })
                  }
                />
              </div>
            </div>
          ))}
          <AddButton
            onClick={() =>
              patch({
                proof: {
                  ...c.proof,
                  testimonials: [
                    ...c.proof.testimonials,
                    { id: uid(), name: "", result: "", text: "" },
                  ],
                },
              })
            }
          >
            Otziv qo&apos;shish
          </AddButton>
        </Section>

        {/* ---------------- Men haqimda ---------------- */}
        <Section title="Men haqimda">
          <Field label="Portret rasm" hint="Vertikal, 4:5 nisbat eng yaxshi.">
            <div className="mt-2">
              <Upload
                kind="portrait"
                value={c.about.photo}
                onChange={(path) => patch({ about: { ...c.about, photo: path } })}
              />
            </div>
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Tajriba" hint="Masalan: 6 yil">
              <input
                className="admin-input mt-2"
                value={c.about.experience}
                onChange={(e) =>
                  patch({ about: { ...c.about, experience: e.target.value } })
                }
              />
            </Field>
            <Field
              label="Shaxsiy daromad natijasi"
              hint="Masalan: $4,000/oy. Bo'sh qoldirsangiz ko'rinmaydi."
            >
              <input
                className="admin-input mt-2"
                value={c.about.income}
                onChange={(e) =>
                  patch({ about: { ...c.about, income: e.target.value } })
                }
              />
            </Field>
          </div>

          <Field label="Qisqacha matn">
            <textarea
              rows={4}
              className="admin-input mt-2"
              value={c.about.bio}
              onChange={(e) => patch({ about: { ...c.about, bio: e.target.value } })}
            />
          </Field>
        </Section>

        {/* ---------------- Savol-javob ---------------- */}
        <Section
          title="Eng ko'p uchraydigan savollar"
          hint="Savol ham, javob ham to'ldirilgan qatorgina sahifada ko'rinadi. Birorta savol qo'shilmasa, bo'lim umuman chizilmaydi."
        >
          {c.faq.map((f: FaqItem) => (
            <div
              key={f.id}
              className="flex flex-col gap-3 rounded-[18px] p-4"
              style={{
                background: "rgba(255,255,255,.035)",
                border: "1px solid rgba(255,255,255,.1)",
              }}
            >
              <Field label="Savol">
                <input
                  className="admin-input mt-2"
                  placeholder="Kursni qanday to'lasam bo'ladi?"
                  value={f.question}
                  onChange={(e) =>
                    patch({
                      faq: c.faq.map((x) =>
                        x.id === f.id ? { ...x, question: e.target.value } : x,
                      ),
                    })
                  }
                />
              </Field>

              <div className="flex items-end gap-3">
                <Field
                  label="Javob"
                  hint="Qatorni bo'lish uchun Enter bosing — sahifada ham shunday ko'rinadi."
                >
                  <textarea
                    rows={3}
                    className="admin-input mt-2"
                    value={f.answer}
                    onChange={(e) =>
                      patch({
                        faq: c.faq.map((x) =>
                          x.id === f.id ? { ...x, answer: e.target.value } : x,
                        ),
                      })
                    }
                  />
                </Field>
                <RemoveButton
                  onClick={() =>
                    patch({ faq: c.faq.filter((x) => x.id !== f.id) })
                  }
                />
              </div>
            </div>
          ))}

          <AddButton
            onClick={() =>
              patch({
                faq: [...c.faq, { id: uid(), question: "", answer: "" }],
              })
            }
          >
            Savol qo&apos;shish
          </AddButton>
        </Section>
      </div>

      {/* Saqlash paneli */}
      <div className="admin-save">
        <div className="glass flex items-center justify-between gap-4 rounded-full py-2 pl-6 pr-2">
          <span
            className="t-item"
            style={{
              color:
                state === "error"
                  ? "var(--pink)"
                  : state === "saved"
                    ? "var(--green)"
                    : "var(--text-3)",
            }}
            role={state === "error" ? "alert" : undefined}
          >
            {state === "saving"
              ? "Saqlanmoqda…"
              : state === "saved"
                ? "Saqlandi"
                : state === "error"
                  ? error
                  : "O'zgarishlar saqlanmagan"}
          </span>
          <button
            type="button"
            onClick={save}
            disabled={state === "saving"}
            className="pill pill-primary pill-sm disabled:opacity-60"
          >
            <span>Saqlash</span>
            <ArrowRight size={15} className="pill-icon" />
          </button>
        </div>
      </div>
    </main>
  );
}
