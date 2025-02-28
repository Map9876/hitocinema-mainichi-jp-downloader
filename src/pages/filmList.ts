import { Film } from "../models/Film";
import { fetchFilmList } from "../api/filmApi";
import { renderFilmDetail } from "./filmDetail";

const ITEMS_PER_PAGE = 20; // 每页显示的电影数量
let currentPage = 1;

export const renderFilmList = async (page: number = 1) => {
  const filmList = document.getElementById("film-list")!;
  const pagination = document.getElementById("pagination")!;
  filmList.innerHTML = ""; // 清空当前列表
  pagination.innerHTML = ""; // 清空分页按钮

  const offset = (page - 1) * ITEMS_PER_PAGE;
  const { contents: films, totalCount } = await fetchFilmList(ITEMS_PER_PAGE, offset);
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE); // 计算总页数

  // 显示当前页的电影
  films.forEach((film: Film) => {
    const filmCard = document.createElement("div");
    filmCard.className = "film-card";

    // 检查 images 是否存在且不为空
    const imageUrl = film.images && film.images[0] ? film.images[0].image.url : "https://via.placeholder.com/120x160"; // 默认图片
    filmCard.innerHTML = `
      <img src="${imageUrl}" alt="${film.name}" />
      <h3>${film.name}</h3>
      <p>${film.productionYear}</p>
    `;
    filmCard.addEventListener("click", () => renderFilmDetail(film.id));
    filmList.appendChild(filmCard);
  });

  // 显示分页按钮
  renderPagination(totalPages, page);
};

const renderPagination = (totalPages: number, currentPage: number) => {
  const pagination = document.getElementById("pagination")!;
  pagination.innerHTML = ""; // 清空分页按钮

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.className = `page-button ${i === currentPage ? "active" : ""}`;
    pageButton.textContent = i.toString();
    pageButton.addEventListener("click", () => {
      renderFilmList(i);
    });
    pagination.appendChild(pageButton);
  }
};

/*
import { Film } from "../models/Film";
import { fetchFilmList } from "../api/filmApi";
import { renderFilmDetail } from "./filmDetail";

const ITEMS_PER_PAGE = 20; // 每页显示的电影数量
let currentPage = 1;

export const renderFilmList = async (page: number = 1) => {
  const filmList = document.getElementById("film-list")!;
  const pagination = document.getElementById("pagination")!;
  filmList.innerHTML = ""; // 清空当前列表
  pagination.innerHTML = ""; // 清空分页按钮

  const offset = (page - 1) * ITEMS_PER_PAGE;
  const { contents: films, totalCount } = await fetchFilmList(ITEMS_PER_PAGE, offset);
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE); // 计算总页数

  // 显示当前页的电影
  films.forEach((film: Film) => {
    const filmCard = document.createElement("div");
    filmCard.className = "film-card";
    filmCard.innerHTML = `
      <img src="${film.images[0].image.url}" alt="${film.name}" />
      <h3>${film.name}</h3>
      <p>${film.productionYear}</p>
    `;
    filmCard.addEventListener("click", () => renderFilmDetail(film.id));
    filmList.appendChild(filmCard);
  });

  // 显示分页按钮
  renderPagination(totalPages, page);
};

const renderPagination = (totalPages: number, currentPage: number) => {
  const pagination = document.getElementById("pagination")!;
  pagination.innerHTML = ""; // 清空分页按钮

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.className = `page-button ${i === currentPage ? "active" : ""}`;
    pageButton.textContent = i.toString();
    pageButton.addEventListener("click", () => {
      renderFilmList(i);
    });
    pagination.appendChild(pageButton);
  }
};
单个图片 film.images[0]
*/