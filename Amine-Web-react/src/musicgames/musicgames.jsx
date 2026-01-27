/*
  社团活动发布页
*/

import { useEffect } from 'react'
import './musicgames.css'
import { initPage, teardownPage } from './musicgames.js'

export default function MusicGamesPage() {
  useEffect(() => {
    initPage()
    return () => teardownPage()
  }, [])

  return (
    <div className="musicgames-root">
      <div className="menu-trigger">
        <div className="hamburger"><div></div><div></div><div></div></div>
      </div>

      <main className="main-card">
        <header className="card-header"><div className="logo-area"><h1>音游 · 动漫社</h1></div></header>
        <section className="card-content">
          <h2>音游爱好者的天堂</h2>
          <p>这里可以随意讨论任何音游内容。</p>
        </section>
      </main>
    </div>
  )
}

export function Content() {
  return (
    <>
      <h2>音游爱好者的天堂</h2>
      <p>这里可以随意讨论任何音游内容。</p>
    </>
  )
}
