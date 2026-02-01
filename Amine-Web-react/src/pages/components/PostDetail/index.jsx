import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkIns from 'remark-ins';
import rehypeHighlight from 'rehype-highlight';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import styles from './PostDetail.module.css';
import { loadPostContent } from '../../utils/postLoader';
import { getCategoryColor } from '../../config';
import { useUser } from '../../context/UserContext';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyDraft, setReplyDraft] = useState('');
  const [replies, setReplies] = useState([]);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [nestedDraft, setNestedDraft] = useState('');

  const currentUser = {
    id: user?.id || 'guest',
    name: user?.profile?.name || '游客',
    avatar: user?.profile?.avatar || '',
    school: user?.profile?.school || '',
    className: user?.profile?.className || '',
    email: user?.profile?.email || '',
  };

  const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  const getBackPath = () => {
    if (location.state?.from) return location.state.from;
    const referrer = document.referrer;
    if (referrer) {
      const url = new URL(referrer);
      if (url.origin === window.location.origin) return url.pathname;
    }
    return '/';
  };

  const handleBack = () => {
    navigate(getBackPath());
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const postData = await loadPostContent(id);
        if (!postData) {
          setError('帖子不存在或加载失败');
          return;
        }
        setPost(postData);
        setError(null);
      } catch (err) {
        setError('加载帖子失败，请刷新重试');
        console.error('Error loading post:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmitReply = () => {
    if (!replyDraft.trim()) return;
    const newReply = {
      id: createId(),
      author: currentUser,
      content: replyDraft.trim(),
      createdAt: new Date().toISOString(),
      parentId: null,
      replyToName: null,
    };
    setReplies((prev) => [...prev, newReply]);
    setReplyDraft('');
    setIsReplyOpen(false);
  };

  const handleOpenNestedReply = (replyId) => {
    setActiveReplyId(replyId);
    setNestedDraft('');
  };

  const handleSubmitNestedReply = (replyId) => {
    if (!nestedDraft.trim()) return;
    const target = replies.find((item) => item.id === replyId);
    const newReply = {
      id: createId(),
      author: currentUser,
      content: nestedDraft.trim(),
      createdAt: new Date().toISOString(),
      parentId: replyId,
      replyToName: target?.author?.name || '用户',
    };
    setReplies((prev) => [...prev, newReply]);
    setNestedDraft('');
    setActiveReplyId(null);
  };

  const handleDeletePost = () => {
    if (!window.confirm('确定删除该帖子吗？此操作不可恢复。')) return;
    setPost(null);
    navigate(getBackPath());
  };

  const handleDeleteReply = (replyId) => {
    if (!window.confirm('确定删除该回复吗？')) return;
    setReplies((prev) => prev.filter((reply) => reply.id !== replyId && reply.parentId !== replyId));
    if (activeReplyId === replyId) {
      setActiveReplyId(null);
    }
  };

  const replyEditorConfig = {
    view: {
      menu: true,
      md: true,
      html: true,
    },
    canView: {
      menu: true,
      md: true,
      html: true,
      fullScreen: false,
      hideMenu: true,
    },
    htmlClass: 'markdown-body markdown-preview markdown-reply',
    markdownClass: 'markdown-editor',
    syncScrollMode: ['leftFollowRight', 'rightFollowLeft'],
    imageAccept: '.jpg,.jpeg,.png,.gif,.webp',
    linkAccept: '.*',
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>加载中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>⚠️</div>
        <h3>{error}</h3>
        <button onClick={() => navigate('/')} className={styles.backButton}>
          返回首页
        </button>
      </div>
    );
  }

  const author = post?.author;
  const authorInfo = typeof author === 'object' && author !== null
    ? author
    : { name: author || '匿名' };
  const hasAuthorLink = !!authorInfo.id;

  const modalNode = isReplyOpen && typeof document !== 'undefined'
    ? createPortal(
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h3>发布回复</h3>
          </div>
          <div className={styles.modalBody}>
            <div className={styles.replyEditor}>
              <MarkdownEditor
                value={replyDraft}
                style={{ height: '280px' }}
                onChange={({ text }) => setReplyDraft(text)}
                renderHTML={(text) => (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkIns]}
                    rehypePlugins={[rehypeHighlight]}
                  >
                    {text}
                  </ReactMarkdown>
                )}
                config={replyEditorConfig}
                placeholder="使用 Markdown 编写回复内容..."
              />
            </div>
          </div>
          <div className={styles.modalFooter}>
            <button className={styles.ghostButton} onClick={() => setIsReplyOpen(false)}>
              取消
            </button>
            <button className={styles.primaryButton} onClick={handleSubmitReply}>
              发送回复
            </button>
          </div>
        </div>
      </div>,
      document.body
    )
    : null;

  return (
    <div className={styles.postDetail}>
      <button onClick={handleBack} className={styles.backButton}>
        ← 返回
      </button>

      {post && (
        <>
          <div className={styles.postHeader}>
            <div className={styles.postMeta}>
              <span
                className={styles.category}
                style={{ backgroundColor: getCategoryColor(post.category) }}
              >
                {post.category}
              </span>
              <span className={styles.date}>
                📅 {new Date(post.date).toLocaleDateString('zh-CN')}
              </span>
              {hasAuthorLink ? (
                <Link
                  to={`/user/${authorInfo.id}`}
                  state={{ author: authorInfo }}
                  className={styles.authorLink}
                >
                  <span>👤</span>
                  <div
                    className={styles.authorAvatar}
                    style={authorInfo.avatar ? { backgroundImage: `url(${authorInfo.avatar})` } : undefined}
                  />
                  <span className={styles.authorName}>{authorInfo.name || '匿名'}</span>
                </Link>
              ) : (
                <span className={styles.author}>👤 {authorInfo.name || '匿名'}</span>
              )}
              {post.readTime && (
                <span className={styles.readTime}>⏱️ {post.readTime}</span>
              )}
            </div>

            <h1 className={styles.postTitle}>{post.title}</h1>

            {post.tags && post.tags.length > 0 && (
              <div className={styles.tags}>
                {post.tags.map(tag => (
                  <span key={tag} className={styles.tag}>#{tag}</span>
                ))}
              </div>
            )}
          </div>

          <div className={`${styles.postContent} markdown-body`}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkIns]}
              rehypePlugins={[rehypeHighlight]}
            >
              {post.content || post.summary}
            </ReactMarkdown>
          </div>

          <div className={styles.actionBar}>
            <button className={styles.actionButton} onClick={() => setIsReplyOpen(true)}>
              💬 回复
            </button>
            <button className={`${styles.actionButton} ${styles.dangerButton}`} onClick={handleDeletePost}>
              🗑 删除帖子
            </button>
          </div>

          <div className={styles.replySection}>
            <h3 className={styles.replyTitle}>回复</h3>
            {replies.length === 0 ? (
              <div className={styles.emptyReply}>还没有人回复，来抢沙发吧～</div>
            ) : (
              <div className={styles.replyList}>
                {[...replies]
                  .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                  .map((reply) => (
                    <div key={reply.id} className={styles.replyItem}>
                      <div className={styles.replyBody}>
                        <div className={styles.replyHeader}>
                          <div className={styles.replyAuthor}>
                            {reply.author?.id ? (
                              <Link
                                to={`/user/${reply.author.id}`}
                                state={{ author: reply.author }}
                                className={styles.replyAuthorLink}
                              >
                                <div
                                  className={styles.replyAvatar}
                                  style={reply.author.avatar ? { backgroundImage: `url(${reply.author.avatar})` } : undefined}
                                />
                                <span className={styles.replyName}>{reply.author.name}</span>
                              </Link>
                            ) : (
                              <>
                                <div
                                  className={styles.replyAvatar}
                                  style={reply.author.avatar ? { backgroundImage: `url(${reply.author.avatar})` } : undefined}
                                />
                                <span className={styles.replyName}>{reply.author.name}</span>
                              </>
                            )}
                          </div>
                          <span className={styles.replyTime}>
                            {new Date(reply.createdAt).toLocaleString('zh-CN')}
                          </span>
                        </div>
                        {reply.parentId && (
                          <div className={styles.replyTo}>回复 @ {reply.replyToName}</div>
                        )}
                        <div className={styles.replyContent}>
                          <div className={`${styles.replyMarkdown} markdown-body markdown-reply`}>
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm, remarkIns]}
                              rehypePlugins={[rehypeHighlight]}
                            >
                              {reply.content}
                            </ReactMarkdown>
                          </div>
                        </div>

                        <div className={styles.replyFooter}>
                          <button
                            className={styles.replyButton}
                            onClick={() => handleOpenNestedReply(reply.id)}
                          >
                            回复
                          </button>
                          <button
                            className={styles.replyDeleteButton}
                            onClick={() => handleDeleteReply(reply.id)}
                          >
                            删除
                          </button>
                        </div>

                        {activeReplyId === reply.id && (
                          <div className={styles.replyBox}>
                            <div className={styles.replyEditor}>
                              <MarkdownEditor
                                value={nestedDraft}
                                style={{ height: '220px' }}
                                onChange={({ text }) => setNestedDraft(text)}
                                renderHTML={(text) => (
                                  <ReactMarkdown
                                    remarkPlugins={[remarkGfm, remarkIns]}
                                    rehypePlugins={[rehypeHighlight]}
                                  >
                                    {text}
                                  </ReactMarkdown>
                                )}
                                config={replyEditorConfig}
                                placeholder={`回复 @${reply.author.name} ...`}
                              />
                            </div>
                            <div className={styles.replyBoxActions}>
                              <button
                                className={styles.ghostButton}
                                onClick={() => setActiveReplyId(null)}
                              >
                                取消
                              </button>
                              <button
                                className={styles.primaryButton}
                                onClick={() => handleSubmitNestedReply(reply.id)}
                              >
                                发送回复
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </>
      )}

      {hasAuthorLink && (
        <div className={styles.author}>
          <Link to={`/user/${authorInfo.id}`} state={{ author: authorInfo }} className={styles.authorLink}>
            <div
              className={styles.authorAvatar}
              style={authorInfo.avatar ? { backgroundImage: `url(${authorInfo.avatar})` } : undefined}
            />
            <span className={styles.authorName}>{authorInfo.name || '匿名'}</span>
          </Link>
        </div>
      )}

      {modalNode}
    </div>
  );
};

export default PostDetail;