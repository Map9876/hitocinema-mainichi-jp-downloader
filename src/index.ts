import { fetchFilmList } from "./api/filmApi";
import { fetchFilmDetail } from "./api/
const ITEMS_PER_PAGE = 20; // 每页显示的电影数量

// 初始化应用
const initApp = async () => {
  const path = window.location.pathname;

  if (path === "/page") {
    // 分页列表页
    const page = new URLSearchParams(window.location.search).get("page") || "1";
    renderFilmList(parseInt(page));
  } else if (path.startsWith("/film/")) {
    // 电影详情页
    const filmId = path.split("/film/")[1];
    renderFilmDetail(filmId);
  } else {
    // 首页：显示所有电影的链接
    renderAllFilms();
  }
};

// 渲染所有电影的链接
const renderAllFilms = async () => {
  const app = document.getElementById("app")!;
  const films = await fetchFilmList(1000, 0); // 获取所有电影

  const filmLinks = films.contents
    .map(
      (film) => `
      <li>
        <a href="/film/${film.id}">${film.name}</a>
      </li>
    `
    )
    .join("");

  app.innerHTML = `
    <h1>Movie List</h1>
    <ul>${filmLinks}</ul>
    <a href="/page">View Paginated List</a>
  `;
};

// 渲染分页的电影列表
const renderFilmList = async (page: number) => {
  const app = document.getElementById("app")!;
  const offset = (page - 1) * ITEMS_PER_PAGE;
  const { contents: films, totalCount } = await fetchFilmList(ITEMS_PER_PAGE, offset);
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const filmLinks = films
    .map(
      (film) => `
      <li>
        <a href="/film/${film.id}">${film.name}</a>
      </li>
    `
    )
    .join("");

  const pagination = Array.from({ length: totalPages }, (_, i) => i + 1)
    .map(
      (p) => `
      <a href="/page?page=${p}" style="margin: 0 5px;">${p}</a>
    `
    )
    .join("");

  app.innerHTML = `
    <h1>Movie List (Page ${page})</h1>
    <ul>${filmLinks}</ul>
    <div>${pagination}</div>
    <a href="/">View All Films</a>
  `;
};

// 渲染电影详情页
const renderFilmDetail = async (filmId: string) => {
  const app = document.getElementById("app")!;
  const film = await fetchFilmDetail(filmId);

  app.innerHTML = `
    <h1>${film.name}</h1>
    <p>${film.discription || "No description available."}</p>
    <a href="/">Back to List</a>
  `;
};

// 监听页面加载事件
document.addEventListener("DOMContentLoaded", initApp);