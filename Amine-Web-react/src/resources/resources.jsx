import { useEffect } from 'react'
import './resources.css'
import { initPage, teardownPage } from './resources.js'

export default function ResourcesPage() {
  useEffect(() => { initPage(); return () => teardownPage() }, [])
  return (
    <div className="resources-root">
      <div className="menu-trigger"><div className="hamburger"><div></div><div></div><div></div></div></div>
      <nav className="sidebar" id="sidebar">
        <div style={{ padding: '0 30px 30px', textAlign: 'center' }}>
          <h3>资源库</h3>
          <p style={{ fontSize: 12, color: '#888' }}>动画、漫画与下载资源</p>
        </div>
        <a href="#" className="nav-item">资料下载</a>
        <a href="#" className="nav-item">外部链接</a>
      </nav>
      <main className="main-card"><header className="card-header"><div className="logo-area"><h1>资源</h1></div></header>
        <section className="card-content"><p>收集对成员有用的番剧、教程与镜像资源链接。</p></section>
      </main>
    </div>
  )
}

export function Content() {
  return (
    <>
      <h2>资源</h2>
      <p>收集对成员有用的番剧、教程与镜像资源链接。</p>
    </>
  )
}
