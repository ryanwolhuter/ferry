export default function Progress({ radius = 0, stroke = 0, progress = 0 }) {

  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - progress / 100 * circumference

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
    >
      <circle
        stroke="white"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      >
        <style jsx>
          {`
            circle {
              transition: stroke-dashoffset 0.35s;
              transform: rotate(-90deg);
              transform-origin: 50% 50%;
            }
          `}
        </style>
      </circle>
    </svg>
  )
}