import { createMovieTags } from "./list";
import { getMovies } from "@/api/movie";

async function init() {
  const resp = await getMovies(1, 30);
  createMovieTags(resp.data.movieList);
}
init();
