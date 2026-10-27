function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" width="16" height="16" aria-hidden="true">
      <path
        d="M3 9h11M9.5 4.5 14 9l-4.5 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="shell hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Interaktiv geografiya laboratoriyasi
          </p>

          <h1>
            Xaritani o‘qishni{' '}
            <span className="hero-highlight">qo‘lingiz bilan</span> o‘rganing.
          </h1>

          <p className="hero-lead">
            Masshtab, azimut, koordinatalar va relyef — quruq nazariya emas. To‘rtta
            qisqa mashq bilan xaritani his qilib o‘rganing, so‘ng bilimingizni
            sinab ko‘ring.
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#lab">
              Laboratoriyani boshlash
              <ArrowIcon />
            </a>
            <a className="btn btn-ghost" href="#quiz">
              Testni ko‘rish
            </a>
          </div>

          <dl className="hero-stats">
            <div>
              <dt>04</dt>
              <dd>interaktiv mashq</dd>
            </div>
            <div>
              <dt>08</dt>
              <dd>test savoli</dd>
            </div>
            <div>
              <dt>08</dt>
              <dd>atlas atamasi</dd>
            </div>
          </dl>
        </div>

        <div className="hero-visual">
          <div className="map-frame" aria-hidden="true">
            <svg className="map-art" viewBox="0 0 520 560" role="presentation">
              <defs>
                <pattern id="heroGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path
                    d="M40 0H0V40"
                    fill="none"
                    stroke="#f6f2e9"
                    strokeOpacity="0.09"
                    strokeWidth="1"
                  />
                </pattern>
                <radialGradient id="heroGlow" cx="48%" cy="42%" r="62%">
                  <stop offset="0%" stopColor="#2a9d84" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#0a4a40" stopOpacity="0" />
                </radialGradient>
              </defs>

              <rect width="520" height="560" fill="url(#heroGlow)" />
              <rect width="520" height="560" fill="url(#heroGrid)" />

              <g fill="none" stroke="#f6f2e9" strokeOpacity="0.13">
                <ellipse cx="262" cy="312" rx="228" ry="184" />
                <ellipse cx="258" cy="306" rx="186" ry="150" />
                <ellipse cx="266" cy="314" rx="146" ry="118" />
                <ellipse cx="258" cy="308" rx="104" ry="84" />
                <ellipse cx="262" cy="310" rx="62" ry="50" />
              </g>

              <g fill="none" stroke="#f6f2e9" strokeOpacity="0.07">
                <path d="M0 140h520M0 280h520M0 420h520" />
                <path d="M130 0v560M260 0v560M390 0v560" />
              </g>

              <path
                d="M96 438C160 396 152 320 226 286S330 244 384 176"
                fill="none"
                stroke="#e8a06b"
                strokeWidth="2.2"
                strokeDasharray="8 9"
                strokeLinecap="round"
              />

              <g className="map-pin">
                <circle cx="96" cy="438" r="6.5" fill="#e8a06b" />
                <circle cx="96" cy="438" r="13" fill="none" stroke="#e8a06b" strokeOpacity="0.45" />
              </g>
              <g className="map-pin">
                <circle cx="226" cy="286" r="5.5" fill="#f6f2e9" />
                <circle cx="226" cy="286" r="11" fill="none" stroke="#f6f2e9" strokeOpacity="0.4" />
              </g>
              <g className="map-pin map-pin-active">
                <circle className="pin-pulse" cx="320" cy="238" r="9" fill="none" stroke="#e8a06b" />
                <circle cx="320" cy="238" r="6" fill="#e8a06b" stroke="#0a4a40" strokeWidth="2" />
              </g>

              <g transform="translate(402 126)" className="compass-rose">
                <circle r="58" fill="#0a4a40" fillOpacity="0.5" stroke="#f6f2e9" strokeOpacity="0.28" />
                <circle r="45" fill="none" stroke="#f6f2e9" strokeOpacity="0.14" />
                {Array.from({ length: 16 }).map((_, i) => {
                  const angle = (i * 360) / 16
                  return (
                    <line
                      key={i}
                      x1="0"
                      y1="-53"
                      x2="0"
                      y2={i % 4 === 0 ? '-59' : '-56'}
                      stroke="#f6f2e9"
                      strokeOpacity={i % 4 === 0 ? '0.65' : '0.25'}
                      strokeWidth={i % 4 === 0 ? '1.6' : '1'}
                      transform={`rotate(${angle})`}
                    />
                  )
                })}
                <path d="M0-40 7 0 0 40-7 0Z" fill="#f6f2e9" fillOpacity="0.86" />
                <path d="M0-40 7 0 0 0Z" fill="#d96c2c" />
                <path d="M-40 0 0 7 40 0 0-7Z" fill="#f6f2e9" fillOpacity="0.28" />
                <circle r="4" fill="#0a4a40" stroke="#f6f2e9" strokeWidth="2" />
                <text
                  className="map-compass-label"
                  x="0"
                  y="-68"
                  textAnchor="middle"
                  fill="#f6f2e9"
                  fillOpacity="0.75"
                >
                  SHIMOL
                </text>
              </g>

              <text x="34" y="38" className="map-mono" fill="#f6f2e9" fillOpacity="0.55">
                ATLAS VARAG‘I / 07
              </text>
              <text x="486" y="38" textAnchor="end" className="map-mono" fill="#f6f2e9" fillOpacity="0.55">
                41° N · 69° E
              </text>
              <text x="34" y="536" className="map-mono" fill="#f6f2e9" fillOpacity="0.38">
                MASSHTAB 1:250 000
              </text>
              <text x="486" y="536" textAnchor="end" className="map-mono" fill="#f6f2e9" fillOpacity="0.38">
                XARITALAB · 2026
              </text>
            </svg>

            <div className="float-card float-coords">
              <span className="float-label">Nuqta</span>
              <strong>Toshkent</strong>
              <span className="float-mono">41.3111° N · 69.2797° E</span>
            </div>

            <div className="float-card float-azimuth">
              <span className="float-label">Azimut</span>
              <span className="float-azimuth-value">045°</span>
              <span className="float-mono">shimoli-sharq</span>
            </div>
          </div>

          <p className="hero-caption">
            <span aria-hidden="true">↳</span> Namuna varaq: ranglar, chiziqlar va
            belgilar — xarita tilining alifbosi.
          </p>
        </div>
      </div>
    </section>
  )
}
