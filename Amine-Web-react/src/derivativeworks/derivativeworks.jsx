/*
  同人，杂谈界面
*/
import { useEffect } from 'react'
import './derivativeworks.css'
import { initPage, teardownPage } from './derivativeworks.js'

export default function DerivativeWorksPage() {
  useEffect(() => { initPage(); return () => teardownPage() }, [])
  return (
    <div className="derivativeworks-root">
      <div className="menu-trigger"><div className="hamburger"><div></div><div></div><div></div></div></div>
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
