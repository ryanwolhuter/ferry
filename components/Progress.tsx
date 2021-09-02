export default function Progress({ radius = 100, stroke = 10, progress = 0 }) {

  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - progress / 100 * circumference

  return (
    <div className="progressContainer">
      <div className="progress">
        {progress <= 100 ? progress : 100}%
      </div>
      <svg
        height={radius * 2}
        width={radius * 2}
      >
        <defs>
          <linearGradient id='linear' gradientUnits='userSpaceOnUse' x1='-3.52%' y1='4.11%' x2='103.52%' y2='95.89%'>
            <stop offset='.147' stopColor='#00E0FF' />
            <stop offset='.673' stopColor='#66D8CA' />
          </linearGradient>
        </defs>
        <circle
          stroke="url(#linear)"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeLinecap="round"
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        >
        </circle>
      </svg>
      <style jsx>
        {`
            circle {
              transition: stroke-dashoffset 0.35s;
              transform: rotate(-90deg);
              transform-origin: 50% 50%;
              backdrop-filter: blur(4px);
            }

            div.progressContainer {
              width: 100%;
              height: 100%;
              position: relative;
            }

            div.progress {
              width: ${(radius * 2) - (stroke * 3)}px;
              height: ${(radius * 2) - (stroke * 3)}px;
              position: absolute;
              top: ${stroke * 1.5}px;
              left: ${stroke * 1.5}px;
              border-radius: 100%;
              border: ${stroke}px solid rgba(251, 251, 251, 0.05);
              z-index: -1;
              box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.25), inset 0px 0px 8px rgba(255, 255, 255, 0.29);
              backdrop-filter: blur(140px);

              font-style: normal;
              font-weight: bold;
              font-size: 48px;
              line-height: 56px;
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              color: #0D3740 ;
            }
          `}
      </style>
    </div>
  )
}