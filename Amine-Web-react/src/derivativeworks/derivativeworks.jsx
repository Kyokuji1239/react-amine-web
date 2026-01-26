import { useEffect } from 'react'
import './derivativeworks.css'
import { initPage, teardownPage } from './derivativeworks.js'

export default function DerivativeWorksPage() {
  useEffect(() => { initPage(); return () => teardownPage() }, [])
  return (
    <div className="derivativeworks-root">
      <div className="menu-trigger"><div className="hamburger"><div></div><div></div><div></div></div></div>
      <nav className="sidebar" id="sidebar">
        <div style={{ padding: '0 30px 30px', textAlign: 'center' }}>
          <h3>同人/创作</h3>
          <p style={{ fontSize: 12, color: '#888' }}>作品投稿与展示</p>
        </div>
        <a href="#" className="nav-item">作品投稿</a>
        <a href="#" className="nav-item">画师专栏</a>
      </nav>
      <main className="main-card"><header className="card-header"><div className="logo-area"><h1>同人空间</h1></div></header>
        <section className="card-content"><p>展示社团成员的同人漫画、插画与创作流程分享。</p></section>
      </main>
    </div>
  )
}

export function Content() {
  return (
    <>
      <h2>同人空间</h2>
      <p>展示社团成员的同人漫画、插画与创作流程分享。</p>
    </>
  )
}
