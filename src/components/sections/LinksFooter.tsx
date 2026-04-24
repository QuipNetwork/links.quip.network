export function LinksFooter() {
  return (
    <footer
      data-footer
      className="grid grid-cols-12 items-center gap-4 bg-[#121218] text-zinc-50"
      style={{
        padding: '40px clamp(20px,5.45vw,78px)',
        borderTop: '1px solid #27272a',
      }}
    >
      <div className="col-start-1 col-end-5 flex items-center gap-3">
        <img
          src="/images/logos/quipnetwork-full-A.svg"
          alt="Quip Network"
          className="h-5 opacity-50"
          style={{ filter: 'invert(1)' }}
        />
      </div>
      <div className="col-start-5 col-end-9 text-center">
        <p className="m-0 text-zinc-500" style={{ fontSize: 12 }}>
          © {new Date().getFullYear()} Quantum Unit Interlock Protocol. All rights reserved.
        </p>
      </div>
      <div className="col-start-9 col-end-13 text-right">
        <a
          href="https://quip.network"
          className="text-[#c9fff5] no-underline"
          style={{
            fontSize: 12,
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.4px',
            textTransform: 'uppercase',
          }}
        >
          quip.network →
        </a>
      </div>
    </footer>
  );
}
