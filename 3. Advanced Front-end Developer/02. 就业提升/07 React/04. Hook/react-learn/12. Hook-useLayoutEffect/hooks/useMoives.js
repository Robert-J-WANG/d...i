import { useEffect, useState } from "react";
import { getTopMovies } from "../server/topMovie";

/**
 * 自定义hook, 封装了维护电影数据的功能
 * @param {*} page 显示第几页的电影，默认为第一页
 * @returns [电影列表总页数， 当前页面的电影信息数组]
 */
export default function useMoives(page = 1) {
  const [resp, setResp] = useState({});
  useEffect(() => {
    (async () => {
      const resp = await getTopMovies(page);
      setResp(resp);
    })();
  }, [page]);

  return [resp.total_pages, resp.results]; // 电影总页数，当前页电影数据数组
}
