import { renderFilmList } from "./pages/filmList";
import { renderFilmDetail } from "./pages/filmDetail";

const initApp = () => {
  const params = new URLSearchParams(window.location.search);

  if (params.has("film")) {
    // 电影详情页
    const filmId = params.get("film")!;
    renderFilmDetail(filmId);
  } else if (params.has("page")) {
    // 分页列表页
    const page = parseInt(params.get("page")!) || 1;
    renderFilmList(page);
  } else {
    // 首页：显示所有电影的链接
    renderFilmList();
  }
};

// 监听页面加载事件
document.addEventListener("DOMContentLoaded", initApp);