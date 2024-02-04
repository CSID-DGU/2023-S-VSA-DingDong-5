import axios from "axios";
import {
  allArticles as _allArticles,
  singleArticleData as _singleArticleData,
  hashtagArticle as _hashtagArticle,
  createSingleArticle as _createSingleArticle,
  deleteSingleArticle as _deleteSingleArticle
} from "./url";

// export const allArticles = () => {
//   return axios.get(_allArticles);
// }

// export const singleArticleData = (id) => {
//   return axios.get(_singleArticleData.replace('{id}', id));
// }

// export const hashtagArticle = (tagName) => {
//   return axios.get(_hashtagArticle.replace('{tagName}', tagName));
// }

// export const createSingleArticle = (formData) => {
//   const config_headers = {
//     headers: {
//       "Content-Type" : "application/json",
//     },
//   };
//   return axios.post(_createSingleArticle, formData, config_headers);
// }

// export const deleteSingleArticle = (id) => {
//   return axios.delete(_deleteSingleArticle.replace('{id}',id));
// }