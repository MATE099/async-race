import { useId } from 'react'

import { CAR_ICON_WIDTH_PX } from '../../utils/constants'

interface CarIconProps {
  color: string
}

const BODY_PATH =
  'M 6 38 L 6 30 Q 6 27 10 26 L 22 26 Q 25 14 36 12 L 60 12 Q 70 14 76 26 L 92 26 Q 96 27 96 30 L 96 38 Z'

const WINDOW_PATH = 'M 27 26 Q 30 16 38 14 L 58 14 Q 67 16 73 26 Z'

function CarIcon({ color }: CarIconProps): JSX.Element {
  const shineId = useId()

  return (
    <svg
      className="car-icon"
      viewBox="0 0 100 50"
      width={CAR_ICON_WIDTH_PX}
      height={CAR_ICON_WIDTH_PX / 2}
      aria-hidden="true"
    >
      <ellipse cx="50" cy="44" rx="44" ry="2" fill="rgba(0,0,0,0.45)" />

      <path
        d={BODY_PATH}
        fill={color}
        stroke="rgba(0,0,0,0.55)"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />

      <path d={BODY_PATH} fill={`url(#${shineId})`} opacity="0.35" />

      <path
        d={WINDOW_PATH}
        fill="rgba(10,18,38,0.85)"
        stroke="rgba(0,0,0,0.35)"
        strokeWidth="0.5"
      />

      <line
        x1="50"
        y1="14"
        x2="50"
        y2="26"
        stroke="rgba(0,0,0,0.45)"
        strokeWidth="1"
      />

      <line
        x1="10"
        y1="33"
        x2="92"
        y2="33"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="0.5"
      />

      <line
        x1="50"
        y1="28"
        x2="50"
        y2="37"
        stroke="rgba(0,0,0,0.3)"
        strokeWidth="0.5"
      />

      <ellipse cx="92" cy="30" rx="3" ry="2.2" fill="#ffe487" />
      <rect x="6.5" y="29" width="3" height="3" fill="#ff5f5f" rx="0.6" />

      <circle cx="26" cy="38" r="9" fill="rgba(0,0,0,0.6)" />
      <circle cx="74" cy="38" r="9" fill="rgba(0,0,0,0.6)" />

      <circle cx="26" cy="38" r="7" fill="#0a0a0a" />
      <circle cx="74" cy="38" r="7" fill="#0a0a0a" />

      <circle cx="26" cy="38" r="3.8" fill="#cbd5e1" />
      <circle cx="74" cy="38" r="3.8" fill="#cbd5e1" />

      <g stroke="#1f2937" strokeWidth="0.8" strokeLinecap="round">
        <line x1="22.5" y1="38" x2="29.5" y2="38" />
        <line x1="26" y1="34.5" x2="26" y2="41.5" />
        <line x1="23.5" y1="35.5" x2="28.5" y2="40.5" />
        <line x1="23.5" y1="40.5" x2="28.5" y2="35.5" />
      </g>

      <g stroke="#1f2937" strokeWidth="0.8" strokeLinecap="round">
        <line x1="70.5" y1="38" x2="77.5" y2="38" />
        <line x1="74" y1="34.5" x2="74" y2="41.5" />
        <line x1="71.5" y1="35.5" x2="76.5" y2="40.5" />
        <line x1="71.5" y1="40.5" x2="76.5" y2="35.5" />
      </g>

      <circle cx="26" cy="38" r="1.4" fill="#1f2937" />
      <circle cx="74" cy="38" r="1.4" fill="#1f2937" />

      <defs>
        <linearGradient id={shineId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.4" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default CarIcon
