import { Telegram, Instagram } from "../Icons";
import { telegramLink } from "@/lib/content";
import type { Content } from "@/lib/types";

export function Footer({ content }: { content: Content }) {
  const ig = content.instagramUrl.trim();

  return (
    <footer className="relative pb-10 pt-4">
      <div className="shell">
        <hr className="rule" />
        <div className="flex flex-col gap-6 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p
              style={{
                fontSize: "0.9375rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              AI Dasturlash: 0-dan daromadgacha
            </p>
            <p className="t-micro mt-1.5">
              janob_dasturchi &middot; Jamol Samadov
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={telegramLink(content.telegramUsername)}
              target="_blank"
              rel="noopener noreferrer"
              className="glass glass-quiet glass-hover flex items-center gap-2.5 rounded-full px-5 py-2.5"
              style={{ fontSize: "0.875rem", fontWeight: 500, minHeight: 44 }}
            >
              <Telegram size={17} />
              {content.telegramUsername}
            </a>

            {ig && (
              <a
                href={ig}
                target="_blank"
                rel="noopener noreferrer"
                className="glass glass-quiet glass-hover flex items-center gap-2.5 rounded-full px-5 py-2.5"
                style={{ fontSize: "0.875rem", fontWeight: 500, minHeight: 44 }}
              >
                <Instagram size={17} />
                Instagram
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
