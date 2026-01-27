import React, { useState, useEffect, useRef, useCallback } from 'react';
import Post from '../Post';
import styles from './PostList.module.css';
import { loadAllPosts } from '../../utils/postLoader';

const PostList = ({ onReadMore }) => { // 接收 onReadMore 回调
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const loaderRef = useRef(null);
  const observerRef = useRef(null);
  const postsPerPage = 5;

  // 初始加载帖子
  useEffect(() => {
    const initLoadPosts = async () => {
      try {
        setLoading(true);
        const allPosts = await loadAllPosts();
        setPosts(allPosts.slice(0, postsPerPage));
        setHasMore(allPosts.length > postsPerPage);
        setError(null);
      } catch (err) {
        setError('加载帖子失败，请刷新重试');
        console.error('Error loading posts:', err);
      } finally {
        setLoading(false);
      }
    };

    initLoadPosts();
  }, []);

  // 加载更多帖子
  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const allPosts = await loadAllPosts();
      const nextPage = page + 1;
      const nextPosts = allPosts.slice(0, nextPage * postsPerPage);
      
      setPosts(nextPosts);
      setPage(nextPage);
      setHasMore(nextPosts.length < allPosts.length);
      setError(null);
    } catch (err) {
      setError('加载更多帖子失败');
      console.error('Error loading more posts:', err);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  // 观察器回调
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !loading) {
      loadMorePosts();
    }
  }, [hasMore, loading, loadMorePosts]);

  // 设置Intersection Observer
  useEffect(() => {
    const currentLoaderRef = loaderRef.current; // 将ref的值复制到局部变量
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };

    // 先清理之前的observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // 创建新的observer
    const observer = new IntersectionObserver(handleObserver, option);
    observerRef.current = observer;

    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [handleObserver]);

  // 如果没有帖子
  if (!loading && posts.length === 0 && !error) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📝</div>
        <h3>暂无帖子</h3>
        <p>还没有发布任何内容，快去添加一些帖子吧！</p>
      </div>
    );
  }

  return (
    <div className={styles.postList}>
      {/* 帖子列表 */}
      <div className={styles.postsContainer}>
        {posts.map((post) => (
          <Post 
            key={post.id} 
            post={post} 
            preview={true} 
            onReadMore={onReadMore} // 传递给Post组件
          />
        ))}
      </div>

      {/* 加载更多区域 */}
      <div ref={loaderRef} className={styles.loaderArea}>
        {loading ? (
          <div className={styles.loadingSpinner}>
            <div className={styles.spinner}></div>
            <span>加载更多帖子中...</span>
          </div>
        ) : !hasMore ? (
          <div className={styles.endMessage}>
            <div className={styles.endIcon}>✨</div>
            <h3>已经到底了~</h3>
            <p>没有更多帖子了，期待下次更新！</p>
          </div>
        ) : (
          <button 
            onClick={loadMorePosts}
            className={styles.loadMoreButton}
            disabled={loading}
          >
            加载更多
          </button>
        )}
      </div>
    </div>
  );
};

export default PostList;