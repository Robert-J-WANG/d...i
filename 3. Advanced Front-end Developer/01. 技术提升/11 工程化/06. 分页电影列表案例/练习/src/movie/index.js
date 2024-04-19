import { createMovieTags } from "./list";
import { getMovies } from "@/api/movie";
import { createPagers } from "./pager";
import { getTopMovies } from "../api/topMovie";

async function init() {
  const initPage = 1;
  const initPageLimit = 20;
  // const resp = await getMovies(initPage, 30);
  // // console.log(resp.data);
  // createMovieTags(resp.data.movieList);
  // createPagers(initPage, 30, resp.data.movieTotal);
  const newResp = await getTopMovies(initPage);
  // console.log(newResp);
  createMovieTags(newResp.results);
  createPagers(initPage, initPageLimit, newResp.total_results);
}
init();
