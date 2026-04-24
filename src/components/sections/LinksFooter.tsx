export function LinksFooter() {
  return (
    <footer
      data-footer
      className="bg-[#121218] text-zinc-50"
      style={{
        padding: '40px clamp(20px,5.45vw,78px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(12,1fr)',
        gap: 16,
        alignItems: 'center',
        borderTop: '1px solid #27272a',
      }}
    >
      <div style={{ gridColumn: '1 / 5', display: 'flex', alignItems: 'center', gap: 12 }}>
        <img
          src="/images/logos/quipnetwork-full-A.svg"
          alt="Quip Network"
          style={{ height: 20, filter: 'invert(1)', opacity: 0.5 }}
        />
      </div>
      <div style={{ gridColumn: '5 / 9', textAlign: 'center' }}>
        <p className="text-zinc-500" style={{ margin: 0, fontSize: 12 }}>
          © {new Date().getFullYear()} Quantum Unit Interlock Protocol. All rights reserved.
        </p>
      </div>
      <div style={{ gridColumn: '9 / 13', textAlign: 'right' }}>
        <a
          href="https://quip.network"
          className="text-[#c9fff5]"
          style={{
            fontSize: 12,
            textDecoration: 'none',
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
