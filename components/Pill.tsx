import type { ReactNode } from "react";
import { ArrowRight } from "./Icons";

type Variant = "primary" | "quiet";

interface Props {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "sm";
  external?: boolean;
  className?: string;
}

/**
 * Harakat knopkasi — rangsiz shisha (muallif referensi, 2026-08-16).
 * Butun ko'rinishni qirra yorug'ligi yasaydi; qarang `globals.css` dagi
 * KNOPKALAR bo'limi.
 */
export function Pill({
  href,
  children,
  variant = "primary",
  size = "md",
  external = false,
  className = "",
}: Props) {
  const cls = [
    "pill",
    variant === "primary" ? "pill-primary" : "pill-quiet",
    size === "sm" ? "pill-sm" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      href={href}
      className={cls}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      <span>{children}</span>
      <ArrowRight size={size === "sm" ? 15 : 16} className="pill-icon" />
    </a>
  );
}
