import { useState } from 'react'

const SCALES = [
  { label: '1:25 000', value: 25000 },
  { label: '1:50 000', value: 50000 },
  { label: '1:100 000', value: 100000 },
  { label: '1:200 000', value: 200000 },
]

function formatNumber(value) {
  return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

function formatKm(km) {
  const rounded = Math.round(km * 100) / 100
  const [whole, fraction] = String(rounded).split('.')
  const formattedWhole = formatNumber(whole)
  return fraction ? `${formattedWhole},${fraction}` : formattedWhole
}

function oneCentimeter(denominator) {
  if (denominator < 100000) return `${denominator / 100} m`
  return `${denominator / 100000} km`
}

export default function ScaleDemo({ onComplete }) {
  const [scaleIndex, setScaleIndex] = useState(1)
  const [mapCm, setMapCm] = useState(6)

  const denominator = SCALES[scaleIndex].value
  const cmOnGround = mapCm * denominator
  const km = cmOnGround / 100000

  const handleMapCm = (event) => {
    setMapCm(Number(event.target.value))
    onComplete('scale')
  }

  const handleScale = (index) => {
    setScaleIndex(index)
    onComplete('scale')
  }

  return (
    <div className="demo scale-demo">
      <div className="demo-top">
        <span className="demo-kicker">Masshtab bilan hisoblang</span>
        <span className="demo-hint">Slayder va masshtabni o‘zgartiring</span>
      </div>

      <div className="scale-result">
        <div>
          <span className="readout-label">Yerdagi masofa</span>
          <p className="scale-value">
            {formatKm(km)}
            <span className="scale-unit"> km</span>
          </p>
        </div>
        <p className="scale-formula">
          <span>{mapCm} sm</span>
          <span className="formula-times">×</span>
          <span>{formatNumber(denominator)}</span>
          <span className="formula-equals">=</span>
          <span>{formatNumber(cmOnGround)} sm</span>
        </p>
      </div>

      <div className="ruler-scene" aria-hidden="true">
        <span className="ruler-scene-label">Xaritadagi chiziq</span>
        <div className="ruler-track" style={{ width: `min(${mapCm * 23 + 2}px, 100%)` }}>
          <div className="ruler-ticks" style={{ '--cm': mapCm }} />
          <div className="ruler-line" />
          <span className="ruler-cap ruler-cap-start">0</span>
          <span className="ruler-cap ruler-cap-end">{mapCm} sm</span>
        </div>
        <span className="ruler-scene-note">1 sm = {oneCentimeter(denominator)}</span>
      </div>

      <div className="scale-controls">
        <label className="range-field">
          <span className="field-label">
            Xaritadagi masofa
            <strong>{mapCm} sm</strong>
          </span>
          <input
            type="range"
            min="1"
            max="12"
            step="1"
            value={mapCm}
            onChange={handleMapCm}
            className="range-input"
          />
          <span className="range-scale" aria-hidden="true">
            <span>1</span>
            <span>12 sm</span>
          </span>
        </label>

        <div className="scale-options" role="group" aria-label="Xarita masshtabi">
          <span className="field-label">Masshtab</span>
          <div className="scale-options-grid">
            {SCALES.map((scale, index) => (
              <button
                key={scale.value}
                type="button"
                className={`scale-btn${scaleIndex === index ? ' is-active' : ''}`}
                aria-pressed={scaleIndex === index}
                onClick={() => handleScale(index)}
              >
                <strong>{scale.label}</strong>
                <span>1 sm = {oneCentimeter(scale.value)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
