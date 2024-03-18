import axios from "axios";
export async function getHeros() {
  const resp = await axios("https://study.duyiedu.com/api/herolist");
  return resp.data.data;
}
