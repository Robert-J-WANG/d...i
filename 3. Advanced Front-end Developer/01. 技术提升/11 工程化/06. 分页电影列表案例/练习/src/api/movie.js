import axios from "axios";

export async function getMovies(page, size) {
  const res = await axios.get("/api/movies", {
    params: { page, size },
  });
  return res.data;
}
