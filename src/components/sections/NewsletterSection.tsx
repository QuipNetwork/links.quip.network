import { useState, type FormEvent } from "react";
import { MailIcon } from "@/components/icons/MailIcon";
import { BarBadge } from "@/components/quip/BarBadge";
import { PersonaWrapper } from "@/components/quip/PersonaWrapper";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      // Submit via hidden form/iframe to avoid CORS
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://listmonk.quip.network/subscription/form";
      form.target = "listmonk-frame";
      const fields = {
        email,
        name: "",
        l: "7da41db0-e463-4b00-8ce7-71d3c77f3cad",
      };
      for (const [k, v] of Object.entries(fields)) {
        const i = document.createElement("input");
        i.type = "hidden";
        i.name = k;
        i.value = v;
        form.appendChild(i);
      }
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3500);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3500);
    }
  };

  return (
    <section
      id="newsletter"
      className="bg-[#121218] text-zinc-50"
      style={{
        position: "relative",
        padding: "96px clamp(20px,5.45vw,78px)",
        borderTop: "1px solid #27272a",
      }}
    >
      <img
        src="/images/pattern-dark.svg"
        alt=""
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.25,
          pointerEvents: "none",
        }}
      />
      <PersonaWrapper count={7}>
        <div
          style={{
            gridColumn: "4 / 10",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <BarBadge variant="light">Newsletter</BarBadge>
          <h2
            className="text-zinc-50"
            style={{
              margin: 0,
              fontFamily: "var(--font-heading)",
              fontWeight: 500,
              fontSize: "clamp(32px, 2.25vw + 20px, 52px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Stay in the loop
            <br />
            <span
              className="text-zinc-400"
              style={{ fontStyle: "italic", fontWeight: 400 }}
            >
              ahead of Q‑Day
            </span>
          </h2>

          {status === "success" ? (
            <div
              className="text-zinc-50"
              style={{
                padding: "12px 16px",
                border: "1px solid #3f3f46",
                fontSize: 14,
              }}
            >
              Thank you — check your inbox to confirm.
            </div>
          ) : (
            <form
              onSubmit={submit}
              data-newsletter-form
              style={{
                display: "flex",
                gap: 12,
                width: "100%",
                maxWidth: 520,
                marginTop: 8,
              }}
            >
              <div
                style={{
                  position: "relative",
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  className="text-zinc-500"
                  style={{
                    position: "absolute",
                    left: 12,
                    display: "flex",
                    alignItems: "center",
                    pointerEvents: "none",
                  }}
                >
                  <MailIcon size={16} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="me@email.com"
                  className="text-zinc-50"
                  style={{
                    all: "unset",
                    flex: 1,
                    boxSizing: "border-box",
                    width: "100%",
                    padding: "12px 12px 10px 36px",
                    borderBottom: "1px solid #3f3f46",
                    fontSize: 14,
                    fontFamily: "var(--font-body)",
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  padding: "12px 16px 10px",
                  background: status === "loading" ? "#27272a" : "#fafafa",
                  color: status === "loading" ? "#71717b" : "#09090b",
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  fontFeatureSettings: "'case'",
                  transition: "background .15s",
                }}
              >
                {status === "loading" ? "Sending…" : "Subscribe"}
              </button>
            </form>
          )}
          <iframe
            id="listmonk-frame"
            name="listmonk-frame"
            style={{ display: "none" }}
          />
        </div>
      </PersonaWrapper>
    </section>
  );
}
