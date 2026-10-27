import ProgressRing from './ProgressRing.jsx'

export default function Header({ learnedCount, total }) {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="brand" href="#top" aria-label="XaritaLab — bosh sahifa">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="34" height="34">
              <circle cx="16" cy="16" r="14.2" fill="none" stroke="currentColor" strokeOpacity="0.35" />
              <path d="M16 3.6 19.4 16 16 28.4 12.6 16Z" fill="currentColor" />
              <path d="M16 3.6 19.4 16 16 16Z" fill="#d96c2c" />
              <circle cx="16" cy="16" r="1.8" fill="#f6f2e9" stroke="#0f6b5c" strokeWidth="1.2" />
            </svg>
          </span>
          <span className="brand-text">
            Xarita<em>Lab</em>
          </span>
        </a>

        <nav className="main-nav" aria-label="Asosiy navigatsiya">
          <a href="#lab">Laboratoriya</a>
          <a href="#quiz">Test</a>
          <a href="#lugat">Lug‘at</a>
        </nav>

        <a
          className="progress-chip"
          href="#lab"
          aria-label={`O‘rganilgan mashqlar: ${learnedCount} / ${total}`}
        >
          <ProgressRing value={learnedCount} total={total} />
          <span className="progress-chip-text">
            <strong>
              {learnedCount}/{total}
            </strong>{' '}
            <span className="progress-chip-label">mashq</span>
          </span>
        </a>
      </div>
    </header>
  )
}
