import { useState } from 'react'

const CENTER = { x: 220, y: 150 }

const RINGS = {
  soft: [
    { level: 100, rx: 168, ry: 106, angle: -6, labelAngle: -55 },
    { level: 200, rx: 126, ry: 79, angle: 4, labelAngle: 210 },
    { level: 300, rx: 84, ry: 52, angle: -4, labelAngle: 105 },
    { level: 400, rx: 44, ry: 27, angle: 2, labelAngle: 30 },
  ],
  steep: [
    { level: 100, rx: 168, ry: 106, angle: -6, labelAngle: -55 },
    { level: 200, rx: 138, ry: 88, angle: 4, labelAngle: 210 },
    { level: 300, rx: 108, ry: 69, angle: -4, labelAngle: 105 },
    { level: 400, rx: 78, ry: 49, angle: 2, labelAngle: 30 },
  ],
}

export default function ContourDemo({ onComplete }) {
  const [mode, setMode] = useState('soft')
  const [activeLevel, setActiveLevel] = useState(null)

  const rings = RINGS[mode]

  const selectLevel = (level) => {
    setActiveLevel(level)
    onComplete('contour')
  }

  const changeMode = (nextMode) => {
    setMode(nextMode)
    onComplete('contour')
  }

  return (
    <div className="demo contour-demo">
      <div className="demo-top">
        <span className="demo-kicker">Relyefni gorizontallardan o‘qing</span>
        <span className="demo-hint">Chiziqni bosing</span>
      </div>

      <div className="contour-controls">
        <div className="segmented" role="group" aria-label="Yonbag‘ir shakli">
          <button
            type="button"
            className={mode === 'soft' ? 'is-active' : ''}
            aria-pressed={mode === 'soft'}
            onClick={() => changeMode('soft')}
          >
            Yumshoq yonbag‘ir
          </button>
          <button
            type="button"
            className={mode === 'steep' ? 'is-active' : ''}
            aria-pressed={mode === 'steep'}
            onClick={() => changeMode('steep')}
          >
            Tik yonbag‘ir
          </button>
        </div>
        <p className="contour-mode-note">
          {mode === 'soft'
            ? 'Chiziqlar keng joylashgan — balandlik sekin o‘zgaradi.'
            : 'Chiziqlar zich joylashgan — balandlik tez o‘zgaradi.'}
        </p>
      </div>

      <svg
        className="contour-svg"
        viewBox="0 0 440 300"
        role="img"
        aria-label="Tepalikning gorizontallar bilan tasvirlangan relyefi"
      >
        <rect width="440" height="300" fill="#fbf8f0" />

        <g fill="none" stroke="#17251f" strokeOpacity="0.06">
          <path d="M0 75h440M0 150h440M0 225h440" />
          <path d="M110 0v300M220 0v300M330 0v300" />
        </g>

        {rings.map((ring) => {
          const active = activeLevel === ring.level
          const labelRadians = (ring.labelAngle * Math.PI) / 180
          const labelX = CENTER.x + Math.cos(labelRadians) * ring.rx * 0.96
          const labelY = CENTER.y - Math.sin(labelRadians) * ring.ry * 0.96

          return (
            <g key={ring.level}>
              <ellipse
                cx={CENTER.x}
                cy={CENTER.y}
                rx={ring.rx}
                ry={ring.ry}
                transform={`rotate(${ring.angle} ${CENTER.x} ${CENTER.y})`}
                fill={active ? 'rgba(217, 108, 44, 0.13)' : 'rgba(15, 107, 92, 0.045)'}
                stroke={active ? '#d96c2c' : '#0f6b5c'}
                strokeOpacity={active ? 1 : 0.72}
                strokeWidth={active ? 2.6 : 1.5}
                className="contour-line"
                onClick={() => selectLevel(ring.level)}
              />
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                className={`contour-label${active ? ' is-active' : ''}`}
              >
                {ring.level} m
              </text>
            </g>
          )
        })}

        <g className="contour-summit">
          <path
            d={`M${CENTER.x} ${CENTER.y - 8}l6 10h-12Z`}
            fill="#17251f"
            fillOpacity="0.8"
          />
          <text x={CENTER.x} y={CENTER.y + 20} textAnchor="middle">
            420 m
          </text>
        </g>
      </svg>

      <div className="contour-footer">
        <div className="contour-levels" role="group" aria-label="Gorizontallar">
          {rings.map((ring) => (
            <button
              key={ring.level}
              type="button"
              className={`level-chip${activeLevel === ring.level ? ' is-active' : ''}`}
              aria-pressed={activeLevel === ring.level}
              onClick={() => selectLevel(ring.level)}
            >
              {ring.level} m
            </button>
          ))}
        </div>

        <div className="contour-readout">
          <span className="readout-label">Tanlangan balandlik</span>
          <strong>{activeLevel ? `${activeLevel} m` : '—'}</strong>
        </div>
      </div>
    </div>
  )
}
