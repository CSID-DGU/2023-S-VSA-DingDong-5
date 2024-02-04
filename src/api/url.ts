import config from "./config";

//Articles

export const allArticles = config.BASE_URL + '/api/articles';
export const singleArticleData = config.BASE_URL + '/api/articles/{articles-id}';
export const hashtagArticle = config.BASE_URL + '/api/articles/hashtag/{tagName}';
export const createSingleArticle = config.BASE_URL + '/api/articles';
export const deleteSingleArticle = config.BASE_URL + '/api/articles/{id}';