'use client'
export default function TapeFilters() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        <filter id="tape-grain" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="7" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0.08  0 0 0 0 0.07  0 0 0 0 0.05  0 0 0 0.35 0" />
          <feComposite operator="over" in2="SourceGraphic" />
        </filter>
        <filter id="tape-warp-0" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.06" numOctaves="2" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="tape-warp-1" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.05" numOctaves="2" seed="11" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="tape-warp-2" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018 0.045" numOctaves="2" seed="21" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="tape-warp-3" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.07" numOctaves="2" seed="33" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="8" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="tape-warp-4" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.016 0.055" numOctaves="2" seed="45" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="6.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="tape-warp-5" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.013 0.065" numOctaves="2" seed="57" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="7.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  )
}
