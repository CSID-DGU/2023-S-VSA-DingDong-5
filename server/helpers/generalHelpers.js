const formatDateKST = date => {
  return new Date(date).toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
  });
};

const getUpdatedArticles = async (articles, author) => ({
  ...articles._doc,
  author,
  createdAt: formatDateKST(articles.createdAt),
  updatedAt: formatDateKST(articles.updatedAt),
});

const getUpdatedArticlesWithComments = async (articles, author, commentList) => ({
  ...articles._doc,
  author,
  commentList,
  createdAt: formatDateKST(articles.createdAt),
  updatedAt: formatDateKST(articles.updatedAt),
});

module.exports = {
  formatDateKST,
  getUpdatedArticles,
  getUpdatedArticlesWithComments,
};
