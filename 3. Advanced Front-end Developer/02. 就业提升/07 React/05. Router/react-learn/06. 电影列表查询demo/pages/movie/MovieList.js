import React, { useState, useEffect } from "react";
import MovieSearchBar from "../../components/MovieSearchBar";
import MovieTable from "../../components/MovieTable";
import Pager from "../../common/Pager/FuncPager";
import { searchMovies } from "../../server/movieAPI";
import { parse, stringify } from "query-string";
/**
 * 该函数用于获取地址栏中的查询条件，返回一个对象query
 * 如果某些条件在地址栏中确实，则使用默认值
 * @param {*} search 地址栏参数
 */
function getQuery(search) {
  // 设置默认值
  const queryDefault = {
    page: 1,
    query: "",
    langage: "en-US",
    region: "CN",
  };
  // 将地址栏参数解析为一个对象(使用第三方库query-string)
  let query = parse(search);
  // 返回混合后的对象
  query = Object.assign({}, queryDefault, query);
  query.page = +query.page; // 类型转换
  return query;
}
/**
 * 自定义hook，根据查询条件的变化，调用服务器，获取新的响应结果
 * @param {*} query 查询条件
 * @returns resp： 新的相应结果
 */
function useResp(query) {
  const [resp, setResp] = useState({ total_pages: 0, results: [] });
  useEffect(() => {
    searchMovies({
      page: query.page,
      query: query.query,
      language: query.langage,
      region: query.region,
    }).then((r) => {
      setResp(r);
    });
  }, [query.page, query.query, query.langage, query.region]);
  return resp;
}
/**
 * 根据查询条件，改变查询地址
 * @param {*} query 查询条件对象
 * @param {*} props 组件属性
 */
const changeLocation = (query, props) => {
  console.log(query);
  const search = stringify(query);
  console.log(search);
  // 更新地址路径
  props.history.push("?" + search);
};

export default function MovieList(props) {
  const query = getQuery(props.location.search);
  const resp = useResp(query);
  return (
    <div>
      <MovieSearchBar
        defaultValue={{
          query: query.query,
          langage: query.langage,
          region: query.region,
        }}
        onSearch={(cond) => {
          const newQuery = {
            ...query,
            page: 1,
            query: cond.query,
            language: cond.langage,
            region: cond.region,
          };
          changeLocation(newQuery, props);
        }}
      />
      {resp.results.length > 0 ? (
        <>
          <MovieTable results={resp.results} />
          <Pager
            currentPage={query.page}
            // pageNumber={10}
            totalPage={resp.total_pages}
            handerClick={(newPage) => {
              const newQuery = {
                ...query,
                page: newPage,
              };
              changeLocation(newQuery, props);
            }}
          />
        </>
      ) : (
        <p style={{ color: "red" }}> No Results</p>
      )}
    </div>
  );
}
