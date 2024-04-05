import React, { useState } from "react";
import MovieList from "../MovieList";
import Pager from "../../common/Pager/FuncPager";
import useMoives from "../../hooks/useMoives";

/**
 * 用来处理电影数据（提供数据，控制数据的变化），并传递数据给电影列表组件
 * 有状态组件
 * @returns
 */
export default function MovieContainer() {
  // 显示哪一页的电影列表
  const [page, setPage] = useState(1);
  // 电影列表数据，使用自定义hook获取
  const [totalPage, movies] = useMoives(page);
  // 页容量
  const [pageNumber] = useState(10);
  return (
    <div>
      <MovieList movies={movies} />
      {/* 使用分页器组件 */}
      <Pager
        currentPage={page}
        pageNumber={pageNumber}
        totalPage={totalPage}
        handerClick={(targetPage) => {
          // 重新设置page
          setPage(targetPage);
        }}
      />
    </div>
  );
}
