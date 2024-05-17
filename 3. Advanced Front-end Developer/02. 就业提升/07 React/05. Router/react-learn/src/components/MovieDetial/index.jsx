import React, { useState, useEffect } from "react";
import { getMoviesDetail } from "../../server/movieAPI";
import Movie from "../MovieList/Movie";
import "./index.css";

function useMovieById(id) {
  const [movie, setMovie] = useState(null);
  // 注意：对象的初始值设为null，而不是空对象
  // 初始值设为空对象的话，会引起使用对象属性是undefined的错误

  useEffect(() => {
    getMoviesDetail(id).then((resp) => {
      setMovie(resp);
    });
  }, [id]);
  return movie;
}

export default function MovieDetail(props) {
  const movieID = +props.match.params.id;
  const movie = useMovieById(movieID);
  console.log(movie);

  return (
    <div>
      <header className="detail_header">
        <h1>MovieDetail</h1>
      </header>
      <div className="detail_container">
        {/* 如果movie数据尚未加载完成，返回一个加载指示器或空元素 */}
        {movie ? <Movie movie={movie} /> : <div>Loading...</div>}
      </div>
    </div>
  );
}
