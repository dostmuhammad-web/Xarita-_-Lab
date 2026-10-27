export default function ProgressRing({ value, total, size = 28 }) {
  const radius = 10
  const circumference = 2 * Math.PI * radius
  const progress = total > 0 ? Math.min(value / total, 1) : 0

  return (
    <svg
      className="progress-ring"
      width={size}
      height={size}
      viewBox="0 0 26 26"
      aria-hidden="true"
    >
      <circle
        cx="13"
        cy="13"
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.22"
        strokeWidth="2.4"
      />
      <circle
        cx="13"
        cy="13"
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray={`${circumference * progress} ${circumference}`}
        transform="rotate(-90 13 13)"
      />
    </svg>
  )
}
