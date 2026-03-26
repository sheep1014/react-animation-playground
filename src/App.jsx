import { useMemo, useState } from 'react'
import './App.css'

const demos = {
  float: {
    name: 'Float',
    description: '柔和漂浮，适合卡片和图标。',
    css: (speed, intensity) => ({
      animation: `float ${speed}s ease-in-out infinite`,
      '--intensity': `${intensity}px`,
    }),
  },
  orbit: {
    name: 'Orbit',
    description: '围绕中心旋转，适合 loader / badge。',
    css: (speed, intensity) => ({
      animation: `orbit ${speed}s linear infinite`,
      '--orbit-distance': `${Math.max(24, intensity * 1.8)}px`,
    }),
  },
  pulse: {
    name: 'Pulse',
    description: '呼吸感缩放，常见于状态强调。',
    css: (speed, intensity) => ({
      animation: `pulse ${speed}s ease-in-out infinite`,
      '--pulse-scale': 1 + intensity / 100,
      '--pulse-glow': `${18 + intensity}px`,
    }),
  },
  wave: {
    name: 'Wave',
    description: '轻微摇摆，适合角色和小元素。',
    css: (speed, intensity) => ({
      animation: `wave ${speed}s ease-in-out infinite`,
      '--wave-rotate': `${Math.max(4, intensity / 2.5)}deg`,
    }),
  },
}

const presets = [
  { label: 'Subtle', speed: 4.8, intensity: 10, shape: 'orb' },
  { label: 'Smooth', speed: 3.4, intensity: 18, shape: 'glass' },
  { label: 'Playful', speed: 2.2, intensity: 28, shape: 'cube' },
]

function App() {
  const [demo, setDemo] = useState('float')
  const [speed, setSpeed] = useState(3.2)
  const [intensity, setIntensity] = useState(16)
  const [shape, setShape] = useState('glass')
  const [showGrid, setShowGrid] = useState(true)

  const previewStyle = useMemo(
    () => demos[demo].css(speed, intensity),
    [demo, speed, intensity]
  )

  const code = useMemo(() => {
    switch (demo) {
      case 'float':
        return `.target {\n  animation: float ${speed}s ease-in-out infinite;\n  transform: translateY(calc(var(--intensity) * -1));\n}`
      case 'orbit':
        return `.target {\n  animation: orbit ${speed}s linear infinite;\n  transform-origin: center;\n}`
      case 'pulse':
        return `.target {\n  animation: pulse ${speed}s ease-in-out infinite;\n  scale: var(--pulse-scale);\n}`
      case 'wave':
        return `.target {\n  animation: wave ${speed}s ease-in-out infinite;\n  rotate: var(--wave-rotate);\n}`
      default:
        return ''
    }
  }, [demo, speed])

  const applyPreset = (preset) => {
    setSpeed(preset.speed)
    setIntensity(preset.intensity)
    setShape(preset.shape)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">React + CSS Motion</p>
          <h1>Animation Playground</h1>
          <p className="lede">
            选一个动画，拖动参数，实时看效果。适合拿来试 UI 动效原型。
          </p>
        </div>

        <section className="panel">
          <div className="panel-title">
            <h2>动画类型</h2>
            <span>{demos[demo].name}</span>
          </div>
          <div className="stack buttons-stack">
            {Object.entries(demos).map(([key, item]) => (
              <button
                key={key}
                className={`toggle ${demo === key ? 'active' : ''}`}
                onClick={() => setDemo(key)}
              >
                <strong>{item.name}</strong>
                <small>{item.description}</small>
              </button>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-title">
            <h2>参数</h2>
            <span>Live</span>
          </div>
          <div className="stack controls-stack">
            <label>
              <span>Speed · {speed.toFixed(1)}s</span>
              <input
                type="range"
                min="1.2"
                max="7"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
              />
            </label>
            <label>
              <span>Intensity · {intensity}</span>
              <input
                type="range"
                min="6"
                max="36"
                step="1"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
              />
            </label>
            <label>
              <span>Shape</span>
              <select value={shape} onChange={(e) => setShape(e.target.value)}>
                <option value="glass">Glass</option>
                <option value="orb">Orb</option>
                <option value="cube">Cube</option>
                <option value="pill">Pill</option>
              </select>
            </label>
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={showGrid}
                onChange={(e) => setShowGrid(e.target.checked)}
              />
              <span>显示参考网格</span>
            </label>
          </div>
        </section>

        <section className="panel">
          <div className="panel-title">
            <h2>快速预设</h2>
            <span>Presets</span>
          </div>
          <div className="preset-row">
            {presets.map((preset) => (
              <button
                key={preset.label}
                className="preset"
                onClick={() => applyPreset(preset)}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </section>
      </aside>

      <main className="main-stage">
        <section className="stage-card">
          <div className="stage-header">
            <div>
              <p className="eyebrow">Preview</p>
              <h2>{demos[demo].name} Motion</h2>
            </div>
            <div className="status-pill">React playground</div>
          </div>

          <div className={`stage ${showGrid ? 'with-grid' : ''}`}>
            <div className={`preview-shape ${shape}`} style={previewStyle}>
              <div className="inner-glow" />
            </div>
          </div>
        </section>

        <section className="code-card">
          <div className="panel-title">
            <h2>示例代码</h2>
            <span>CSS</span>
          </div>
          <pre>{code}</pre>
        </section>
      </main>
    </div>
  )
}

export default App
