import { useEffect } from 'react'
import './activities.css'
import { initPage, teardownPage } from './activities.js'

export default function ActivitiesPage() {
  useEffect(() => {
    initPage()
    return () => teardownPage()
  }, [])

  return (
    <div className="activities-root">
      <div className="menu-trigger">
        <div className="hamburger"><div></div><div></div><div></div></div>
      </div>
      <nav className="sidebar" id="sidebar">
        <div style={{ padding: '0 30px 30px', textAlign: 'center' }}>
          <h3>社团活动</h3>
          <p style={{ fontSize: 12, color: '#888' }}>最新活动与报名入口</p>
        </div>
        <a href="#" className="nav-item">📅 活动列表</a>
        <a href="#" className="nav-item">📝 报名</a>
        <a href="#" className="nav-item">🏆 往期回顾</a>
      </nav>

      <main className="main-card">
        <header className="card-header"><div className="logo-area"><h1>活动 · 动漫社</h1></div></header>
        <section className="card-content">
          <h2>即将到来的活动</h2>
          <p>本页展示活动时间、地点与报名方式，方便成员快速参与。</p>
        </section>
      </main>
    </div>
  )
}

export function Content() {
  return (
    <>
      <h2>即将到来的活动</h2>
      <p>本页展示活动时间、地点与报名方式，方便成员快速参与。</p>
    </>
  )
}
