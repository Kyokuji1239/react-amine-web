/*
  CommunityBoard组件，包含侧边导航栏和主内容区，实现了不同页面内容的切换
  网站的核心主页功能集中在此组件中
*/

import { useEffect, useState } from 'react'
import './index.css'
import { initCommunityBoard, teardownCommunityBoard, closeSidebar, usePageTitle } from './index.js'
import PostList from '../components/PostList'
import PostDetail from '../components/PostDetail'

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
  const [selectedPostId, setSelectedPostId] = useState(null)
  const { setTitle } = usePageTitle();

  // 处理页面标题的逻辑
  useEffect(() => {
    const pageTitles = {
      'home': '动漫社基地 | 首页',
      'about': '动漫社基地 | 社团介绍',
      'amine': '动漫社基地 | 季度新番',
      'forum': '动漫社基地 | 论坛闲聊',
      'activities': '动漫社基地 | 社团活动',
      'derivativeworks': '动漫社基地 | 同人/杂谈',
      'tech': '动漫社基地 | 前沿技术',
      'resources': '动漫社基地 | 网络资源',
      'musicgames': '动漫社基地 | 音游区',
      'post': '动漫社基地 | 帖子详情'
    };
    
    // 根据当前状态设置标题
    if (pageTitles[page]) {
      setTitle(pageTitles[page]);
    }

  }, [page, setTitle, selectedPostId]);

  // 处理初始化
  useEffect(() => {
    initCommunityBoard();
    return () => teardownCommunityBoard();
  }, []);

  // 处理选中帖子时的页面更新
  useEffect(() => {
    if (selectedPostId && page !== 'post') {
      // 使用 setTimeout 将状态更新推迟到下一个渲染周期
      const timer = setTimeout(() => {
        setPage('post');
      }, 0);
      return () => clearTimeout(timer);
    } else if (!selectedPostId && page === 'post') {
      // 如果没有选中的帖子但当前是帖子详情页，返回首页
      const timer = setTimeout(() => {
        setPage('home');
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [selectedPostId, page]);

  // 处理阅读全文点击
  const handleReadMore = (postId) => {
    setSelectedPostId(postId);
    closeSidebar();
  };

  // 处理返回首页
  const handleBackToHome = () => {
    setSelectedPostId(null);
    setPage('home');
  };

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
      <div 
        className="home-button" 
        onClick={(e)=>{e.preventDefault(); handleBackToHome(); closeSidebar()}} 
        title="返回主页"
      >
        🏠
      </div>

      {/*侧边导航栏*/}
      <nav className="sidebar" id="sidebar">
        {/*用户信息*/}
        <div style={{ padding: '0 30px 30px', textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, background: 'var(--secondary-color)', borderRadius: '50%', margin: '0 auto 15px' }}></div>
          <h3 style={{ color: 'var(--text-main)' }}>User_Name</h3>
          <p style={{ fontSize: 12, color: 'var(--text-sub)' }}>Lv.5 高级会员</p>
        </div>
        {/*导航链接*/}
        <a href="#" className="nav-item" onClick={(e)=>{e.preventDefault(); handleBackToHome(); setPage('about'); closeSidebar()}}><span>🏫 社团介绍</span></a>
        <a href="#" className="nav-item" onClick={(e)=>{e.preventDefault(); handleBackToHome(); setPage('amine'); closeSidebar()}}><span>📺 季度新番</span></a>
        <a href="#" className="nav-item" onClick={(e)=>{e.preventDefault(); handleBackToHome(); setPage('forum'); closeSidebar()}}><span>💬 论坛闲聊</span></a>
        <a href="#" className="nav-item" onClick={(e)=>{e.preventDefault(); handleBackToHome(); setPage('activities'); closeSidebar()}}><span>🎉 社团活动</span></a>
        <a href="#" className="nav-item" onClick={(e)=>{e.preventDefault(); handleBackToHome(); setPage('derivativeworks'); closeSidebar()}}><span>🎨 同人/杂谈</span></a>
        <a href="#" className="nav-item" onClick={(e)=>{e.preventDefault(); handleBackToHome(); setPage('tech'); closeSidebar()}}><span>💻 前沿技术</span></a>
        <a href="#" className="nav-item" onClick={(e)=>{e.preventDefault(); handleBackToHome(); setPage('resources'); closeSidebar()}}><span>💾 网络资源</span></a>
        <a href="#" className="nav-item" onClick={(e)=>{e.preventDefault(); handleBackToHome(); setPage('musicgames'); closeSidebar()}}><span>🎵 音游区</span></a>
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

        <section className="card-content" style={{ position: 'relative', minHeight: '200px' }}>
          {/* 关键：确保这里有内容 */}
          {selectedPostId ? (
            <div>
              <PostDetail postId={selectedPostId} onBack={handleBackToHome} />
            </div>
          ) : (
            <>
              {page === 'home' && (
                <>
                  <div className="welcome-banner">
                    <h2>👋 下午好！今天想看点什么？</h2>
                    <p>本周社团活动定于周六，不要忘记报名哦~</p>
                  </div>
                  <div style={{ marginBottom: 20, fontWeight: 'bold', color: 'var(--text-main)', fontSize: 18 }}>
                    ✨ 最新动态
                  </div>
                  <PostList onReadMore={handleReadMore} />
                </>
              )}

              {/* 其他页面 */}
              {page === 'about' && <AboutContent />}
              {page === 'activities' && <ActivitiesContent />}
              {page === 'amine' && <AmineContent />}
              {page === 'derivativeworks' && <DerivativeWorksContent />}
              {page === 'forum' && <ForumContent />}
              {page === 'resources' && <ResourcesContent />}
              {page === 'tech' && <TechContent />}
              {page === 'musicgames' && <MusicGamesContent />}
            </>
          )}
        </section>
      </main>
    </div>
  )
}