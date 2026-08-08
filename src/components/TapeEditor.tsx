'use client'
import { useState, useEffect } from 'react'
import { DEFAULT_VARIANTS, TapeAdjust } from './TapeLabel'

export default function TapeEditor() {
  const [show, setShow] = useState(false)
  const [variants, setVariants] = useState<TapeAdjust[]>(DEFAULT_VARIANTS)
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setShow(params.get('edit') === 'tape')
  }, [])

  useEffect(() => {
    window.__tapeOverrides = variants
    window.dispatchEvent(new Event('tape-update'))
  }, [variants])

  if (!show) return null

  const current = variants[selected]

  const update = (key: keyof TapeAdjust, value: number) => {
    setVariants(prev => prev.map((v, i) =>
      i === selected ? { ...v, [key]: value } : v
    ))
  }

  const copyValues = () => {
    const code = variants.map(v =>
      `{ x: ${v.x}, y: ${v.y}, scale: ${v.scale.toFixed(2)}, rotate: ${v.rotate.toFixed(1)}, img: '${v.img}' },`
    ).join('\n')
    navigator.clipboard.writeText(code)
    alert('Copied all variant values to clipboard!')
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      background: 'rgba(16,15,13,0.95)',
      color: '#F1EAE0',
      padding: '20px',
      borderRadius: '12px',
      zIndex: 99999,
      width: '280px',
      fontFamily: 'monospace',
      fontSize: '12px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
    }}>
      <div style={{ marginBottom: '12px', fontWeight: 'bold' }}>
        TAPE EDITOR — Variant {selected}
      </div>

      <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {variants.map((_, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            style={{
              padding: '4px 8px',
              background: selected === i ? '#BF3620' : 'rgba(255,255,255,0.1)',
              color: '#F1EAE0',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {i}
          </button>
        ))}
      </div>

      {(['x', 'y', 'scale', 'rotate'] as const).map(key => (
        <div key={key} style={{ marginBottom: '10px' }}>
          <label style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{key}</span>
            <span>{current[key].toFixed(key === 'scale' ? 2 : 0)}</span>
          </label>
          <input
            type="range"
            min={key === 'scale' ? 0.3 : key === 'rotate' ? -45 : -100}
            max={key === 'scale' ? 2.5 : key === 'rotate' ? 45 : 100}
            step={key === 'scale' ? 0.01 : 1}
            value={current[key]}
            onChange={e => update(key, parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      ))}

      <button
        onClick={copyValues}
        style={{
          marginTop: '12px',
          width: '100%',
          padding: '10px',
          background: '#BF3620',
          color: '#F1EAE0',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontFamily: 'monospace',
          fontWeight: 'bold',
        }}
      >
        Copy All Values
      </button>
    </div>
  )
}
