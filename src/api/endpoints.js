const API_KEY = "27483dee-88b3-4fec-a213-61e3c62f5f54";

export const getNewsCategoriesEndpoint = () => {
  return `https://content.guardianapis.com/search?api-key=${API_KEY}&show-fields=all`;
};

export const getNewsDetailsEndpoint = (newsId) => {
  return `https://content.guardianapis.com/${newsId}?api-key=${API_KEY}&show-fields=all`;
};
