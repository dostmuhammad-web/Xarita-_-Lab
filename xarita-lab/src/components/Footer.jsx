export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div className="footer-brand">
          <span className="footer-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="26" height="26">
              <path d="M16 3.6 19.4 16 16 28.4 12.6 16Z" fill="currentColor" />
              <circle cx="16" cy="16" r="1.8" fill="#0a4a40" />
            </svg>
          </span>
          <div>
            <p className="footer-title">XaritaLab</p>
            <p className="footer-note">Xaritani o‘qish — dunyoni o‘qishdir.</p>
          </div>
        </div>

        <p className="footer-meta">
          React va sof CSS bilan qurilgan · 2026
        </p>

        <a className="footer-top" href="#top">
          Yuqoriga
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </footer>
  )
}
