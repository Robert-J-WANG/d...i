// /* ----- 使用axios和cheerio库抓取网页数据 ----- */

import axios from "axios";
import * as cheerio from "cheerio";
import { Book } from "../models/sync";

/**
 * 抓取 https://bookhero.co.nz/collections/new-zealand-published 页面上书本的详情链接
 * @returns 书的详情链接的数组
 */
const getBookLinks = async () => {
  const res = await axios.get(
    "https://bookhero.co.nz/collections/new-zealand-published"
  );
  const $ = cheerio.load(res.data);
  const bookHrefs = $(".cc-collection-products .card-link")
    .map((index, ele) => {
      // 在 map 中返回你想要的值
      return "https://bookhero.co.nz" + $(ele).attr("href");
    })
    .get(); // **使用 .get() 将 Cheerio 对象数组转换为标准 JS 数组**
  return bookHrefs;
};

const getInfo = async (url) => {
  const res = await axios.get(url);
  const $ = cheerio.load(res.data);
  const name = $(".product-title").text().trim();
  const imgUrl = $(".product-image").attr("src") ?? "";
  const author = $(".authors .author-link").text().trim() ?? "unknow";
  //    选择器：在 .book-details 内部，找到包含 <strong>Date Published:</strong> 的 <p> 标签。
  const dateElement = $(
    ".book-details p:has(strong:contains('Date Published:'))"
  );
  const publishDate = dateElement
    .text()
    .trim()
    .split("Date Published:")[1]
    .trim()
    .replace(/\s+/g, " ");

  return { name, imgUrl, author, publishDate };
};

const fetchBooks = async () => {
  const links = await getBookLinks();
  const promise = links.map((link) => {
    return getInfo(link);
  });
  return Promise.all(promise);
};

const bookMock = async () => {
  const books = await fetchBooks();
  Book.bulkCreate(books);
};
bookMock();
