import { useMemo, useState } from 'react'
import './App.css'

const demos = {
  float: {
    name: 'Float',
    category: '基础过渡',
    description: '柔和漂浮，适合卡片和图标。',
    css: (speed, intensity) => ({
      animation: `float ${speed}s ease-in-out infinite`,
      '--intensity': `${intensity}px`,
    }),
  },
  pulse: {
    name: 'Pulse',
    category: '基础过渡',
    description: '呼吸感缩放，常见于状态强调。',
    css: (speed, intensity) => ({
      animation: `pulse ${speed}s ease-in-out infinite`,
      '--pulse-scale': 1 + intensity / 100,
      '--pulse-glow': `${18 + intensity}px`,
    }),
  },
  wave: {
    name: 'Wave',
    category: '基础过渡',
    description: '轻微摇摆，适合角色和小元素。',
    css: (speed, intensity) => ({
      animation: `wave ${speed}s ease-in-out infinite`,
      '--wave-rotate': `${Math.max(4, intensity / 2.5)}deg`,
    }),
  },
  magnet: {
    name: 'Magnet',
    category: '物理弹簧',
    description: '磁吸跟随感，适合按钮和悬浮物。',
    css: (speed, intensity) => ({
      animation: `magnet ${speed}s cubic-bezier(.22,1,.36,1) infinite`,
      '--mx': `${Math.max(10, intensity)}px`,
      '--my': `${Math.max(8, intensity * 0.65)}px`,
    }),
  },
  orbit: {
    name: 'Orbit',
    category: '无限循环',
    description: '围绕中心旋转，适合 loader / badge。',
    css: (speed, intensity) => ({
      animation: `orbit ${speed}s linear infinite`,
      '--orbit-distance': `${Math.max(24, intensity * 1.8)}px`,
    }),
  },
  blob: {
    name: 'Blob Morph',
    category: 'SVG / 图形',
    description: '液态变形，适合 hero 背景和徽章。',
    css: (speed) => ({
      animation: `blob ${speed}s ease-in-out infinite`,
    }),
  },
  text: {
    name: 'Text Reveal',
    category: '文字动画',
    description: '文字逐字显现，适合标题展示。',
    css: (speed) => ({
      animation: `textReveal ${speed}s ease infinite`,
    }),
  },
  stagger: {
    name: 'Stagger Stack',
    category: '错落布局',
    description: '层叠错峰进入，适合列表卡片。',
    css: () => ({}),
  },
  parallax: {
    name: 'Parallax',
    category: '滚动 / 空间感',
    description: '分层轻微位移，适合大卡片或 hero。',
    css: (speed, intensity) => ({
      '--px': `${Math.max(8, intensity)}px`,
      '--py': `${Math.max(6, intensity * 0.5)}px`,
      '--pspeed': `${speed}s`,
    }),
  },
}

const categoryOrder = [
  '基础过渡',
  '物理弹簧',
  '错落布局',
  'SVG / 图形',
  '无限循环',
  '文字动画',
  '滚动 / 空间感',
]

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

  const groupedDemos = useMemo(() => {
    return categoryOrder.map((category) => ({
      category,
      items: Object.entries(demos).filter(([, item]) => item.category === category),
    }))
  }, [])

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
      case 'magnet':
        return `.target {\n  animation: magnet ${speed}s cubic-bezier(.22,1,.36,1) infinite;\n  transform: translate(var(--mx), var(--my));\n}`
      case 'blob':
        return `.target {\n  animation: blob ${speed}s ease-in-out infinite;\n  border-radius: 42% 58% 46% 54%;\n}`
      case 'text':
        return `.title {\n  animation: textReveal ${speed}s ease infinite;\n  clip-path: inset(0 100% 0 0);\n}`
      case 'stagger':
        return `.item {\n  animation: riseIn .6s ease both;\n}\n.item:nth-child(2) { animation-delay: .08s; }\n.item:nth-child(3) { animation-delay: .16s; }`
      case 'parallax':
        return `.layer {\n  animation: drift var(--pspeed) ease-in-out infinite alternate;\n}\n.back { transform: translate(calc(var(--px) * -0.6), calc(var(--py) * -0.6)); }`
      default:
        return ''
    }
  }, [demo, speed])

  const applyPreset = (preset) => {
    setSpeed(preset.speed)
    setIntensity(preset.intensity)
    setShape(preset.shape)
  }

  const renderPreview = () => {
    if (demo === 'text') {
      return (
        <div className="text-preview" style={previewStyle}>
          <p className="tiny-label">Headline motion</p>
          <h3>Motion makes interfaces feel alive.</h3>
        </div>
      )
    }

    if (demo === 'stagger') {
      return (
        <div className="stagger-preview">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="stagger-card">
              <span />
              <div>
                <strong>Layer {item}</strong>
                <small>Animated card item</small>
              </div>
            </div>
          ))}
        </div>
      )
    }

    if (demo === 'parallax') {
      return (
        <div className="parallax-preview" style={previewStyle}>
          <div className="parallax-layer back" />
          <div className="parallax-layer middle" />
          <div className="parallax-layer front">
            <div className="parallax-chip">Depth</div>
          </div>
        </div>
      )
    }

    return (
      <div className={`preview-shape ${shape} ${demo === 'blob' ? 'blob-shape' : ''}`} style={previewStyle}>
        <div className="inner-glow" />
      </div>
    )
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">React + CSS Motion</p>
          <h1>Animation Playground</h1>
          <p className="lede">
            按动画语义分组，不再乱堆。先选模块，再挑具体效果。
          </p>
        </div>

        <section className="panel">
          <div className="panel-title">
            <h2>动画模块</h2>
            <span>{demos[demo].category}</span>
          </div>
          <div className="category-stack">
            {groupedDemos.map((group) => (
              <div key={group.category} className="category-block">
                <div className="category-title">{group.category}</div>
                <div className="stack buttons-stack big-list">
                  {group.items.map(([key, item]) => (
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
              </div>
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
              <p className="stage-category">{demos[demo].category}</p>
            </div>
            <div className="status-pill">React playground</div>
          </div>

          <div className={`stage ${showGrid ? 'with-grid' : ''}`}>
            {renderPreview()}
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
