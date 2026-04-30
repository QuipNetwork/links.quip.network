export function LinksFooter() {
  return (
    <footer
      data-footer
      className="grid grid-cols-12 items-center gap-4 border-t border-zinc-800 bg-[#121218] px-gutter py-10 text-zinc-50"
    >
      <div className="col-start-1 col-end-5 flex items-center gap-3">
        <img
          src="/images/logos/quipnetwork-full-A.svg"
          alt="Quip Network"
          className="h-5 opacity-50 invert"
        />
      </div>
      <div className="col-start-5 col-end-9 text-center">
        <p className="m-0 text-xs text-zinc-500">
          © {new Date().getFullYear()} Quantum Unit Interlock Protocol. All rights reserved.
        </p>
      </div>
      <div className="col-start-9 col-end-13 text-right">
        <a
          href="https://quip.network"
          className="font-mono text-xs tracking-[.4px] text-[#c9fff5] uppercase no-underline"
        >
          quip.network →
        </a>
      </div>
    </footer>
  );
}
