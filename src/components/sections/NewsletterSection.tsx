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
      className="relative border-t border-zinc-800 bg-[#121218] px-gutter py-10 tab:py-24 text-zinc-50"
    >
      <img
        src="/images/pattern-dark.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <PersonaWrapper count={7} mobileCount={11}>
        <div className="col-start-4 col-end-10 flex flex-col items-center gap-6 text-center max-tab:col-span-full">
          <BarBadge variant="light">Newsletter</BarBadge>
          <h2 className="m-0 font-heading text-[clamp(32px,2.25vw+20px,52px)] leading-[1.1] font-medium tracking-[-.02em] text-zinc-50">
            Stay in the loop
            <br />
            <span className="font-normal text-zinc-400 italic">
              ahead of Q‑Day
            </span>
          </h2>

          {status === "success" ? (
            <div className="border border-zinc-700 px-4 py-3 text-sm text-zinc-50">
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
                  className="w-full flex-1 appearance-none border-0 border-b border-zinc-700 bg-transparent pt-3 pr-3 pb-2.5 pl-9 text-sm text-zinc-50 outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className={`cursor-pointer appearance-none border-0 px-4 pt-3 pb-2.5 text-sm outline-none transition-colors duration-150 ${
                  status === "loading" ? "bg-zinc-800 text-zinc-500" : "bg-zinc-50 text-zinc-950"
                }`}
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
