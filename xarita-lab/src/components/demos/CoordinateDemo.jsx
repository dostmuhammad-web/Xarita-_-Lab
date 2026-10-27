import { useRef, useState } from 'react'

const PLOT = { left: 54, right: 412, top: 28, bottom: 272 }
const LON = { min: 55, max: 75 }
const LAT = { min: 35, max: 47 }
const TOLERANCE = 1.2

const TARGETS = [
  { name: 'Toshkent', lat: 41.3, lon: 69.2 },
  { name: 'Samarqand', lat: 39.7, lon: 66.9 },
  { name: 'Buxoro', lat: 39.8, lon: 64.4 },
  { name: 'Nukus', lat: 42.5, lon: 59.6 },
  { name: 'Andijon', lat: 40.8, lon: 72.3 },
  { name: 'Qarshi', lat: 38.9, lon: 65.8 },
]

const LON_TICKS = Array.from({ length: 21 }, (_, index) => LON.min + index)
const LAT_TICKS = Array.from({ length: 13 }, (_, index) => LAT.min + index)

const projectX = (lon) =>
  PLOT.left + ((lon - LON.min) / (LON.max - LON.min)) * (PLOT.right - PLOT.left)
const projectY = (lat) =>
  PLOT.top + ((LAT.max - lat) / (LAT.max - LAT.min)) * (PLOT.bottom - PLOT.top)

const formatDegree = (value) => {
  const rounded = Math.round(value * 10) / 10
  return String(rounded).replace('.', ',')
}

export default function CoordinateDemo({ onComplete }) {
  const [targetIndex, setTargetIndex] = useState(0)
  const [point, setPoint] = useState(null)
  const [result, setResult] = useState(null)
  const svgRef = useRef(null)

  const target = TARGETS[targetIndex]

  const handlePlotClick = (event) => {
    const svg = svgRef.current
    if (!svg) return
    const matrix = svg.getScreenCTM()
    if (!matrix) return

    const cursor = svg.createSVGPoint()
    cursor.x = event.clientX
    cursor.y = event.clientY
    const local = cursor.matrixTransform(matrix.inverse())

    if (
      local.x < PLOT.left ||
      local.x > PLOT.right ||
      local.y < PLOT.top ||
      local.y > PLOT.bottom
    ) {
      return
    }

    const lon =
      LON.min +
      ((local.x - PLOT.left) / (PLOT.right - PLOT.left)) * (LON.max - LON.min)
    const lat =
      LAT.max -
      ((local.y - PLOT.top) / (PLOT.bottom - PLOT.top)) * (LAT.max - LAT.min)

    const nextPoint = {
      lat: Math.round(lat * 10) / 10,
      lon: Math.round(lon * 10) / 10,
    }

    const deltaLat = nextPoint.lat - target.lat
    const deltaLon = nextPoint.lon - target.lon

    setPoint(nextPoint)

    if (Math.abs(deltaLat) <= TOLERANCE && Math.abs(deltaLon) <= TOLERANCE) {
      setResult({ status: 'success' })
      onComplete('coordinate')
    } else {
      const hints = []
      if (deltaLat < -TOLERANCE) hints.push('shimolroq')
      if (deltaLat > TOLERANCE) hints.push('janubroq')
      if (deltaLon < -TOLERANCE) hints.push('sharqroq')
      if (deltaLon > TOLERANCE) hints.push('g‘arbroq')
      setResult({ status: 'miss', hints })
    }
  }

  const nextTarget = () => {
    setPoint(null)
    setResult(null)
    setTargetIndex((current) => (current + 1) % TARGETS.length)
  }

  const targetX = projectX(target.lon)
  const targetY = projectY(target.lat)
  const pointX = point ? projectX(point.lon) : null
  const pointY = point ? projectY(point.lat) : null

  return (
    <div className="demo coordinate-demo">
      <div className="demo-top">
        <span className="demo-kicker">Koordinatani xaritaga tushiring</span>
        <span className="demo-hint">Maydonni bosing</span>
      </div>

      <div className="coord-challenge">
        <div>
          <span className="challenge-label">
            Topshiriq {targetIndex + 1} / {TARGETS.length}
          </span>
          <p>
            <strong>
              {formatDegree(target.lat)}° sh.b. · {formatDegree(target.lon)}° sh.q.
            </strong>{' '}
            nuqtasini belgilang
          </p>
        </div>
        <button type="button" className="mini-btn" onClick={nextTarget}>
          Yangi nuqta
        </button>
      </div>

      <svg
        ref={svgRef}
        className="coord-svg"
        viewBox="0 0 440 330"
        role="img"
        aria-label="Kenglik va uzoqlik to‘ri. Nuqtani belgilash uchun maydonni bosing."
      >
        <rect
          x={PLOT.left}
          y={PLOT.top}
          width={PLOT.right - PLOT.left}
          height={PLOT.bottom - PLOT.top}
          fill="#fbf8f0"
        />

        {LON_TICKS.map((lon) => {
          const x = projectX(lon)
          const major = lon % 5 === 0
          return (
            <line
              key={`lon-${lon}`}
              x1={x}
              y1={PLOT.top}
              x2={x}
              y2={PLOT.bottom}
              stroke="#17251f"
              strokeOpacity={major ? 0.24 : 0.08}
              strokeWidth={major ? 1.1 : 0.7}
            />
          )
        })}

        {LAT_TICKS.map((lat) => {
          const y = projectY(lat)
          const major = lat % 5 === 0
          return (
            <line
              key={`lat-${lat}`}
              x1={PLOT.left}
              y1={y}
              x2={PLOT.right}
              y2={y}
              stroke="#17251f"
              strokeOpacity={major ? 0.24 : 0.08}
              strokeWidth={major ? 1.1 : 0.7}
            />
          )
        })}

        <rect
          x={PLOT.left}
          y={PLOT.top}
          width={PLOT.right - PLOT.left}
          height={PLOT.bottom - PLOT.top}
          fill="none"
          stroke="#17251f"
          strokeOpacity="0.4"
        />

        {[55, 60, 65, 70, 75].map((lon) => (
          <text
            key={`lon-label-${lon}`}
            x={projectX(lon)}
            y={PLOT.bottom + 18}
            textAnchor="middle"
            className="coord-axis-label"
          >
            {lon}°
          </text>
        ))}

        {[35, 40, 45].map((lat) => (
          <text
            key={`lat-label-${lat}`}
            x={PLOT.left - 10}
            y={projectY(lat) + 3.5}
            textAnchor="end"
            className="coord-axis-label"
          >
            {lat}°
          </text>
        ))}

        <text
          x={(PLOT.left + PLOT.right) / 2}
          y="314"
          textAnchor="middle"
          className="coord-axis-caption"
        >
          sharqiy uzoqlik (λ) →
        </text>
        <text
          x="20"
          y={(PLOT.top + PLOT.bottom) / 2}
          textAnchor="middle"
          transform={`rotate(-90 20 ${(PLOT.top + PLOT.bottom) / 2})`}
          className="coord-axis-caption"
        >
          shimoliy kenglik (φ) →
        </text>

        {result?.status === 'success' ? (
          <g>
            <line
              x1={targetX}
              y1={targetY}
              x2={pointX}
              y2={pointY}
              stroke="#0f6b5c"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />
            <circle
              cx={targetX}
              cy={targetY}
              r="14"
              fill="none"
              stroke="#0f6b5c"
              strokeWidth="1.4"
            />
            <path
              d="M0 -10L2.5 -3.4L9.5 -3.1L4.1 1.1L5.9 7.9L0 4.2L-5.9 7.9L-4.1 1.1L-9.5 -3.1L-2.5 -3.4Z"
              fill="#d96c2c"
              stroke="#fbf8f0"
              strokeWidth="1.4"
              transform={`translate(${targetX} ${targetY})`}
            />
            <text
              x={targetX}
              y={targetY + 33}
              textAnchor="middle"
              className="coord-target-label"
            >
              {target.name}
            </text>
          </g>
        ) : null}

        {point ? (
          <g>
            <line
              x1={pointX}
              y1={PLOT.top}
              x2={pointX}
              y2={PLOT.bottom}
              stroke="#d96c2c"
              strokeWidth="1"
              strokeDasharray="3 5"
              strokeOpacity="0.6"
            />
            <line
              x1={PLOT.left}
              y1={pointY}
              x2={PLOT.right}
              y2={pointY}
              stroke="#d96c2c"
              strokeWidth="1"
              strokeDasharray="3 5"
              strokeOpacity="0.6"
            />
            <circle cx={pointX} cy={pointY} r="9" fill="#d96c2c" fillOpacity="0.18" />
            <circle
              cx={pointX}
              cy={pointY}
              r="5"
              fill="#d96c2c"
              stroke="#fbf8f0"
              strokeWidth="1.6"
            />
          </g>
        ) : null}

        <rect
          x={PLOT.left}
          y={PLOT.top}
          width={PLOT.right - PLOT.left}
          height={PLOT.bottom - PLOT.top}
          fill="transparent"
          onClick={handlePlotClick}
          className="coord-hit"
        />
      </svg>

      <div
        className={`coord-status${result ? ` is-${result.status}` : ''}`}
        aria-live="polite"
      >
        <div className="coord-status-copy">
          <span className="status-dot" aria-hidden="true" />
          {result?.status === 'success' ? (
            <p>
              <strong>To‘g‘ri.</strong> Bu nuqta — {target.name}. Koordinatani
              xaritadan o‘qishni o‘zlashtirdingiz.
            </p>
          ) : result?.status === 'miss' ? (
            <p>
              Yana urinib ko‘ring: nuqta{' '}
              <strong>{result.hints.join(' va ')}</strong> bo‘lishi kerak.
            </p>
          ) : (
            <p>Maydonni bosing — kenglik va uzoqlik shu yerda ko‘rinadi.</p>
          )}
        </div>

        <div className="coord-readout">
          <span>Sizning nuqtangiz</span>
          <strong>
            {point
              ? `${formatDegree(point.lat)}° sh.b. · ${formatDegree(point.lon)}° sh.q.`
              : '—'}
          </strong>
        </div>
      </div>
    </div>
  )
}
