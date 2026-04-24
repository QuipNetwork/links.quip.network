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
      className="relative bg-[#121218] text-zinc-50"
      style={{
        padding: "96px clamp(20px,5.45vw,78px)",
        borderTop: "1px solid #27272a",
      }}
    >
      <img
        src="/images/pattern-dark.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <PersonaWrapper count={7}>
        <div className="col-start-4 col-end-10 flex flex-col items-center gap-6 text-center max-tab:col-span-full">
          <BarBadge variant="light">Newsletter</BarBadge>
          <h2
            className="m-0 text-zinc-50"
            style={{
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
              className="px-4 py-3 text-zinc-50"
              style={{
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
              className="mt-2 flex w-full max-w-[520px] gap-3"
            >
              <div className="relative flex flex-1 items-center">
                <div className="pointer-events-none absolute left-3 flex items-center text-zinc-500">
                  <MailIcon size={16} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="me@email.com"
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
            className="hidden"
          />
        </div>
      </PersonaWrapper>
    </section>
  );
}
