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

module.exports = {
  formatDateKST,
  getUpdatedArticles,
};
