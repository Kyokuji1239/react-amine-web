/**
 * 加载所有帖子的元数据
 */
export const loadAllPostMetadata = async () => {
  try {
    const response = await fetch('/posts/metadata.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.posts || [];
  } catch (error) {
    console.error('Error loading post metadata:', error);
    return [];
  }
};

/**
 * 加载单个帖子的详细内容
 * @param {string} postId - 帖子ID
 */
export const loadPostContent = async (postId) => {
  try {
    // 使用fetch加载markdown文件
    const mdResponse = await fetch(`/posts/${postId}.md`);
    const mdContent = mdResponse.ok ? await mdResponse.text() : '';
    
    // 加载JSON元数据
    const jsonResponse = await fetch(`/posts/${postId}.json`);
    if (!jsonResponse.ok) {
      throw new Error(`Failed to load JSON for post ${postId}`);
    }
    const metadata = await jsonResponse.json();
    
    return {
      ...metadata,
      content: mdContent,
      id: postId
    };
  } catch (error) {
    console.error(`Error loading post ${postId}:`, error);
    return null;
  }
};

/**
 * 加载所有帖子的完整数据（用于主页）
 */
export const loadAllPosts = async () => {
  try {
    const metadataList = await loadAllPostMetadata();
    
    // 使用Promise.all并行加载所有帖子
    const postPromises = metadataList.map(async (metadata) => {
      const postData = await loadPostContent(metadata.id);
      return postData;
    });
    
    const loadedPosts = await Promise.all(postPromises);
    
    // 过滤掉加载失败的帖子
    const validPosts = loadedPosts.filter(post => post !== null);
    
    // 按日期倒序排列
    return validPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('Error loading all posts:', error);
    return [];
  }
};