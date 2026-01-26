import { useEffect } from 'react'
import './amine.css'
import { initPage, teardownPage } from './amine.js'

export default function AminePage() {
  useEffect(() => {
    initPage()
    return () => teardownPage()
  }, [])

  return (
    <div className="amine-root">
      <div className="menu-trigger"><div className="hamburger"><div></div><div></div><div></div></div></div>
      <nav className="sidebar" id="sidebar">
        <div style={{ padding: '0 30px 30px', textAlign: 'center' }}>
          <h3>动漫介绍</h3>
          <p style={{ fontSize: 12, color: '#888' }}>番剧、角色与作品讨论</p>
        </div>
        <a href="#" className="nav-item">新番速递</a>
        <a href="#" className="nav-item">角色资料</a>
      </nav>
      <main className="main-card"><header className="card-header"><div className="logo-area"><h1>番剧 · 资料</h1></div></header>
        <section className="card-content"><p>本页面展示番剧简介、评分与讨论要点。</p></section>
      </main>
    </div>
  )
}

export function Content() {
  return (
    <>
      <h2>番剧 · 资料</h2>
      <p>本页面展示番剧简介、评分与讨论要点。</p>
    </>
  )
}
