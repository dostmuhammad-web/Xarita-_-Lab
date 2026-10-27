import { useRef, useState } from 'react'

const DIRECTIONS = [
  { name: 'Shimol', az: 0 },
  { name: 'Shimoli-sharq', az: 45 },
  { name: 'Sharq', az: 90 },
  { name: 'Janubi-sharq', az: 135 },
  { name: 'Janub', az: 180 },
  { name: 'Janubi-g‘arb', az: 225 },
  { name: 'G‘arb', az: 270 },
  { name: 'Shimoli-g‘arb', az: 315 },
]

function directionFor(azimuth) {
  return DIRECTIONS[Math.round(azimuth / 45) % 8].name
}

export default function CompassDemo({ onComplete }) {
  const [azimuth, setAzimuth] = useState(45)
  const [dragging, setDragging] = useState(false)
  const svgRef = useRef(null)

  const updateFromPointer = (event) => {
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const x = event.clientX - (rect.left + rect.width / 2)
    const y = event.clientY - (rect.top + rect.height / 2)
    let degrees = (Math.atan2(x, -y) * 180) / Math.PI
    if (degrees < 0) degrees += 360
    setAzimuth(degrees)
  }

  const handlePointerDown = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    setDragging(true)
    updateFromPointer(event)
    onComplete('compass')
  }

  const handlePointerMove = (event) => {
    if (dragging) updateFromPointer(event)
  }

  const stopDragging = () => setDragging(false)

  const rounded = Math.round(azimuth) % 360
  const formatted = String(rounded).padStart(3, '0')
  const activeDirection = Math.round(azimuth / 45) % 8

  return (
    <div className="demo compass-demo">
      <div className="demo-top">
        <span className="demo-kicker">Azimutni his qiling</span>
        <span className="demo-hint">Doirani bosing yoki torting</span>
      </div>

      <div className="compass-layout">
        <div className="compass-visual">
          <svg
            ref={svgRef}
            className={`compass-svg${dragging ? ' is-dragging' : ''}`}
            viewBox="0 0 360 360"
            aria-hidden="true"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
          >
            <defs>
              <radialGradient id="compassFace" cx="50%" cy="42%" r="65%">
                <stop offset="0%" stopColor="#fffdf7" />
                <stop offset="100%" stopColor="#efe9dc" />
              </radialGradient>
            </defs>

            <circle cx="180" cy="180" r="166" fill="#e4ecdf" fillOpacity="0.55" />
            <circle
              cx="180"
              cy="180"
              r="158"
              fill="url(#compassFace)"
              stroke="#17251f"
              strokeWidth="1.4"
            />
            <circle
              cx="180"
              cy="180"
              r="146"
              fill="none"
              stroke="#17251f"
              strokeOpacity="0.14"
            />

            {Array.from({ length: 24 }).map((_, index) => {
              const angle = (index * 360) / 24
              const major = index % 6 === 0
              return (
                <line
                  key={index}
                  x1="180"
                  y1={major ? 32 : 36}
                  x2="180"
                  y2="48"
                  stroke="#17251f"
                  strokeOpacity={major ? 0.7 : 0.28}
                  strokeWidth={major ? 1.8 : 1}
                  transform={`rotate(${angle} 180 180)`}
                />
              )
            })}

            {[
              { label: 'SHIMOL', x: 180, y: 75, anchor: 'middle' },
              { label: 'SHARQ', x: 292, y: 184, anchor: 'middle' },
              { label: 'JANUB', x: 180, y: 296, anchor: 'middle' },
              { label: 'G‘ARB', x: 68, y: 184, anchor: 'middle' },
            ].map((item) => (
              <text
                key={item.label}
                x={item.x}
                y={item.y}
                textAnchor={item.anchor}
                className="compass-cardinal"
              >
                {item.label}
              </text>
            ))}

            <text x="180" y="112" textAnchor="middle" className="compass-degree">
              0°
            </text>
            <text x="248" y="184" textAnchor="middle" className="compass-degree">
              90°
            </text>
            <text x="180" y="258" textAnchor="middle" className="compass-degree">
              180°
            </text>
            <text x="112" y="184" textAnchor="middle" className="compass-degree">
              270°
            </text>

            <g
              className="compass-needle"
              transform={`rotate(${azimuth} 180 180)`}
            >
              <path d="M180 78 192 180 180 180Z" fill="#d96c2c" />
              <path d="M180 282 168 180 180 180Z" fill="#0f6b5c" fillOpacity="0.55" />
              <path
                d="M180 78 168 180 180 180Z"
                fill="#d96c2c"
                fillOpacity="0.55"
              />
              <path
                d="M180 282 192 180 180 180Z"
                fill="#0f6b5c"
                fillOpacity="0.28"
              />
            </g>

            <circle cx="180" cy="180" r="11" fill="#f6f2e9" stroke="#17251f" strokeWidth="1.4" />
            <circle cx="180" cy="180" r="3.5" fill="#17251f" />

            <g transform={`rotate(${azimuth} 180 180)`}>
              <circle cx="180" cy="63" r="4" fill="#d96c2c" />
            </g>
          </svg>
        </div>

        <div className="compass-panel">
          <div className="compass-readout">
            <div>
              <span className="readout-label">Azimut</span>
              <span className="readout-value">
                {formatted}
                <span className="readout-degree">°</span>
              </span>
            </div>
            <div>
              <span className="readout-label">Yo‘nalish</span>
              <span className="readout-direction">{directionFor(azimuth)}</span>
            </div>
          </div>

          <div className="direction-grid" role="group" aria-label="Asosiy yo‘nalishlar">
            {DIRECTIONS.map((direction, index) => (
              <button
                key={direction.name}
                type="button"
                className={`direction-btn${activeDirection === index ? ' is-active' : ''}`}
                aria-pressed={activeDirection === index}
                onClick={() => {
                  setAzimuth(direction.az)
                  onComplete('compass')
                }}
              >
                <span className="direction-az">{direction.az}°</span>
                <span>{direction.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
