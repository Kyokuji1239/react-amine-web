/*
  论坛页面
*/

import { useEffect } from 'react'
import './forum.css'
import { initPage, teardownPage } from './forum.js'

export default function ForumPage() {
  useEffect(() => { initPage(); return () => teardownPage() }, [])
  return (
    <div className="forum-root">
      <div className="menu-trigger"><div className="hamburger"><div></div><div></div><div></div></div></div>
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
