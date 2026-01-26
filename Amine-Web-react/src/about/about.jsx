import { useEffect } from 'react'
import './about.css'
import { initPage, teardownPage } from './about.js'

export default function AboutPage() {
  useEffect(() => {
    initPage()
    return () => teardownPage()
  }, [])

  return (
    <div className="about-root">
      <div className="menu-trigger">
        <div className="hamburger">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <nav className="sidebar" id="sidebar">
        <div style={{ padding: '0 30px 30px', textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, background: '#4CC9F0', borderRadius: '50%', margin: '0 auto 15px' }}></div>
          <h3 style={{ color: '#4A4A4A' }}>关于我们</h3>
          <p style={{ fontSize: 12, color: '#888' }}>了解本站与社团历史</p>
        </div>

        <a href="#" className="nav-item"><span>🏫 团队</span></a>
        <a href="#" className="nav-item"><span>📜 章程</span></a>
        <a href="#" className="nav-item"><span>📬 联系方式</span></a>
      </nav>

      <main className="main-card">
        <header className="card-header">
          <div className="logo-area">
            <h1>关于 · 动漫社</h1>
          </div>
        </header>

        <section className="card-content">
          <h2>我们的故事</h2>
          <p>这里是社团的简介区域，简单介绍社团成立、活动宗旨与联系方式。</p>
        </section>
      </main>
    </div>
  )
}

export function Content() {
  return (
    <>
      <h2>我们的故事</h2>
      <p>这里是社团的简介区域，简单介绍社团成立、活动宗旨与联系方式。</p>
    </>
  )
}
