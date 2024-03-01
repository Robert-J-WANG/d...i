import axios from "axios";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzU3YTMyMmNiOTFlMDA2YzA4M2FjNGFiOGMxMWZlMSIsInN1YiI6IjY1ZGJjOGNmYzJiOWRmMDE4MzhjNzQ1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qpe3gu-nGbeBEyR1yOuProTy6-U66VUydS1WblrnzYE";
export async function getTopMovies(page) {
  const res = await axios.get("https://api.themoviedb.org/3/movie/top_rated", {
    params: { page },
    headers: { Authorization: "Bearer " + TOKEN },
  });
  return res.data;
}
