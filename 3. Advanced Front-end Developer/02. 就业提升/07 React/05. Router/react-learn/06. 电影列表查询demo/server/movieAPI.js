import axios from "axios";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzU3YTMyMmNiOTFlMDA2YzA4M2FjNGFiOGMxMWZlMSIsInN1YiI6IjY1ZGJjOGNmYzJiOWRmMDE4MzhjNzQ1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qpe3gu-nGbeBEyR1yOuProTy6-U66VUydS1WblrnzYE";

export async function getTopMovies(page) {
  const res = await axios.get("/3/movie/top_rated", {
    params: { page },
    headers: { Authorization: "Bearer " + TOKEN },
  });
  return res.data;
}

/**
 * 获取正在上映的电影列表
 * @param {number} page 显示当前的页数-默认值是1
 * @returns {Promise<object>}
 */
export async function getNowPlayingMovies({ page = 1 } = {}) {
  const res = await axios.get("/3/movie/now_playing", {
    params: { page },
    headers: { Authorization: "Bearer " + TOKEN },
  });
  return res.data;
}

/**
 * 根据关键字搜索电影
 * @param {number} page 当前的显示的页码
 * @param {string} query 输入搜索的关键字
 * @param {string} language 语言（可选）
 * @param {string} region 地区（可选）
 * @returns {Promise<object>}
 */
export async function searchMovies({ page = 1, query, language, region }) {
  if (query) {
    const res = await axios.get("/3/search/movie", {
      params: {
        page,
        query,
        language,
        region,
      },
      headers: { Authorization: "Bearer " + TOKEN },
    });
    return res.data;
  } else {
    return await getNowPlayingMovies({ page });
  }
}

export async function getMoviesDetail(id) {
  const res = await axios.get(`/3/movie/${id}`, {
    headers: { Authorization: "Bearer " + TOKEN },
  });
  return res.data;
}
