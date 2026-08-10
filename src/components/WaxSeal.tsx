'use client'

export default function WaxSeal() {
  return (
    <div
      className="wax-seal-wrapper"
      style={{
        position: 'fixed',
        bottom: '32px',
        left: '32px',
        width: '96px',
        height: '96px',
        zIndex: 500,
        pointerEvents: 'none',
        opacity: 0.92,
      }}
    >
      {/* model-viewer is a web component registered by the script in layout.tsx */}
      <model-viewer
        src="/models/wax-seal.glb"
        auto-rotate
        auto-rotate-delay="0"
        rotation-per-second="30deg"
        disable-zoom
        interaction-prompt="none"
        shadow-intensity="0"
        exposure="1"
        camera-orbit="0deg 75deg 105%"
        field-of-view="30deg"
        style={{
          width: '100%',
          height: '100%',
          '--poster-color': 'transparent',
          backgroundColor: 'transparent',
        } as React.CSSProperties}
      />
    </div>
  )
}
