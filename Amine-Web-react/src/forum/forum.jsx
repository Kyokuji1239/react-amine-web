import { useEffect } from 'react'
import './forum.css'
import { initPage, teardownPage } from './forum.js'

export default function ForumPage() {
  useEffect(() => { initPage(); return () => teardownPage() }, [])
  return (
    <div className="forum-root">
      <div className="menu-trigger"><div className="hamburger"><div></div><div></div><div></div></div></div>
      <nav className="sidebar" id="sidebar">
        <div style={{ padding: '0 30px 30px', textAlign: 'center' }}>
          <h3>论坛</h3>
          <p style={{ fontSize: 12, color: '#888' }}>大家的讨论区</p>
        </div>
        <a href="#" className="nav-item">话题广场</a>
        <a href="#" className="nav-item">最新回复</a>
      </nav>
      <main className="main-card"><header className="card-header"><div className="logo-area"><h1>论坛 · 闲聊</h1></div></header>
        <section className="card-content"><p>成员可以在这里发帖、回复并分享资源。</p></section>
      </main>
    </div>
  )
}

export function Content() {
  return (
    <>
      <h2>论坛 · 闲聊</h2>
      <p>成员可以在这里发帖、回复并分享资源。</p>
    </>
  )
}
