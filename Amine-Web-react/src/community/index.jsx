/*
  CommunityBoard组件，包含侧边导航栏和主内容区，实现了不同页面内容的切换
  网站的核心主页功能集中在此组件中
*/

import { useEffect, useState } from 'react'
import './index.css'
import { initCommunityBoard, teardownCommunityBoard, closeSidebar, usePageTitle } from './index.js'

//社团介绍页面
import { Content as AboutContent } from '../about/about.jsx'
//社团活动页面
import { Content as ActivitiesContent } from '../activities/activities.jsx'
//季度新番页面
import { Content as AmineContent } from '../amine/amine.jsx'
//同人/杂谈页面
import { Content as DerivativeWorksContent } from '../derivativeworks/derivativeworks.jsx'
//论坛闲聊页面
import { Content as ForumContent } from '../forum/forum.jsx'
//网络资源页面
import { Content as ResourcesContent } from '../resources/resources.jsx'
//前沿技术页面
import { Content as TechContent } from '../tech/tech.jsx'
//音游区页面
import { Content as MusicGamesContent } from '../musicgames/musicgames.jsx'


export default function CommunityBoard() {
  const [page, setPage] = useState('home')
  const { setTitle } = usePageTitle();

  useEffect(() => {
    initCommunityBoard()
    {/*页面的标题*/}
    const pageTitles = {
      'home': '动漫社基地 | 首页',
      'about': '动漫社基地 | 社团介绍',
      'amine': '动漫社基地 | 季度新番',
      'forum': '动漫社基地 | 论坛闲聊',
      'activities': '动漫社基地 | 社团活动',
      'derivativeworks': '动漫社基地 | 同人/杂谈',
      'tech': '动漫社基地 | 前沿技术',
      'resources': '动漫社基地 | 网络资源',
      'musicgames': '动漫社基地 | 音游区'
    };
    if (pageTitles[page]) {
      setTitle(pageTitles[page]);
    }
    return () => teardownCommunityBoard()
  }, [page, setTitle])

  return (
    <div className="community-root">
      <div className="menu-trigger">
        <div className="hamburger">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      {/*主要内容部分*/}
      <div className="home-button" onClick={(e)=>{e.preventDefault(); setPage('home'); closeSidebar()}} title="返回主页">🏠</div>

      {/*侧边导航栏*/}
      <nav className="sidebar" id="sidebar">
        {/*用户信息*/}
        <div style={{ padding: '0 30px 30px', textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, background: 'var(--secondary-color)', borderRadius: '50%', margin: '0 auto 15px' }}></div>
          <h3 style={{ color: 'var(--text-main)' }}>User_Name</h3>
          <p style={{ fontSize: 12, color: 'var(--text-sub)' }}>Lv.5 高级会员</p>
        </div>
        {/*导航链接*/}
        <a href="#" className="nav-item" onClick={(e)=>{e.preventDefault(); setPage('about'); closeSidebar()}}><span>🏫 社团介绍</span></a>
        <a href="#" className="nav-item" onClick={(e)=>{e.preventDefault(); setPage('amine'); closeSidebar()}}><span>📺 季度新番</span></a>
        <a href="#" className="nav-item" onClick={(e)=>{e.preventDefault(); setPage('forum'); closeSidebar()}}><span>💬 论坛闲聊</span></a>
        <a href="#" className="nav-item" onClick={(e)=>{e.preventDefault(); setPage('activities'); closeSidebar()}}><span>🎉 社团活动</span></a>
        <a href="#" className="nav-item" onClick={(e)=>{e.preventDefault(); setPage('derivativeworks'); closeSidebar()}}><span>🎨 同人/杂谈</span></a>
        <a href="#" className="nav-item" onClick={(e)=>{e.preventDefault(); setPage('tech'); closeSidebar()}}><span>💻 前沿技术</span></a>
        <a href="#" className="nav-item" onClick={(e)=>{e.preventDefault(); setPage('resources'); closeSidebar()}}><span>💾 网络资源</span></a>
        <a href="#" className="nav-item" onClick={(e)=>{e.preventDefault(); setPage('musicgames'); closeSidebar()}}><span>🎵 音游区</span></a>
      </nav>

      {/*主内容区*/}
      <main className="main-card">

        {/*上边栏*/}
        <header className="card-header">
            <div className="logo-area">
              <h1>动漫社 · 基地</h1>
            </div>
          <div className="search-bar">
            <span>🔍</span>
            <input type="text" placeholder="搜索帖子、番剧..." />
          </div>
        </header>

        {/*主要内容部分*/}
        <section className="card-content">
          {page === 'home' && (
            <>
              <div className="welcome-banner">
                <h2>👋 下午好！今天想看点什么？</h2>
                <p>本周社团活动定于周六，不要忘记报名哦~</p>
              </div>

              <div style={{ marginBottom: 20, fontWeight: 'bold', color: 'var(--text-main)', fontSize: 18 }}>
                ✨ 最新动态
              </div>

              <div className="grid-container">
                <article className="post-card">
                  <span className="card-badge tag-anime">季度新番</span>
                  <h3>四月新番扫雷指南，这几部必追！</h3>
                  <p>看了第一集，京阿尼这次的作画依然稳定，另外那部异世界转生...</p>
                  <div className="post-meta">
                    <div className="avatar-mini"></div> <span>番剧组长 · 2小时前</span>
                  </div>
                </article>

                <article className="post-card">
                  <span className="card-badge tag-event">社团活动</span>
                  <h3>【重要】本周六晚线下聚会 & 抽奖</h3>
                  <p>地点：学生活动中心302。记得带上你的 Switch，我们准备了大乱斗比赛。</p>
                  <div className="post-meta">
                    <div className="avatar-mini"></div> <span>社长 · 置顶</span>
                  </div>
                </article>

                <article className="post-card">
                  <span className="card-badge tag-tech">前沿技术</span>
                  <h3>搭建了一个社团专属的 NAS，教程分享</h3>
                  <p>以后大家的番剧资源可以直接从内网满速下载了，附详细配置...</p>
                  <div className="post-meta">
                    <div className="avatar-mini"></div> <span>技术宅 · 5小时前</span>
                  </div>
                </article>

                <article className="post-card">
                  <span className="card-badge tag-chat">论坛闲聊</span>
                  <h3>有没有人出下周漫展的票？</h3>
                  <p>错过早鸟票了，收两张，价格好商量，最好是面交。</p>
                  <div className="post-meta">
                    <div className="avatar-mini"></div> <span>路人A · 1天前</span>
                  </div>
                </article>

                <article className="post-card">
                  <span className="card-badge tag-anime">同人/杂谈</span>
                  <h3>[多图] 昨天的Cosplay返图，修好了</h3>
                  <p>这套片子拍得太有感觉了，光影绝了，大家自取。</p>
                  <div className="post-meta">
                    <div className="avatar-mini"></div> <span>摄影菌 · 3小时前</span>
                  </div>
                </article>
              </div>
            </>
          )}

          {page === 'about' && <AboutContent />}
          {page === 'activities' && <ActivitiesContent />}
          {page === 'amine' && <AmineContent />}
          {page === 'derivativeworks' && <DerivativeWorksContent />}
          {page === 'forum' && <ForumContent />}
          {page === 'resources' && <ResourcesContent />}
          {page === 'tech' && <TechContent />}
          {page === 'musicgames' && <MusicGamesContent />}
        </section>
      </main>
    </div>
  )
}
