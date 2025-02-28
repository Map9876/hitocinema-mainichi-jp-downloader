import { fetchFilmDetail } from "../api/filmApi";

export const renderFilmDetail = async (filmId: string) => {
  const filmList = document.getElementById("film-list")!;
  const filmDetail = document.getElementById("film-detail")!;
  const filmTitle = document.getElementById("film-title")!;
  const filmImages = document.getElementById("film-images")!;
  const filmDescription = document.getElementById("film-description")!;

  const film = await fetchFilmDetail(filmId);

  filmList.style.display = "none";
  filmDetail.style.display = "block";

  filmTitle.textContent = film.name;
  filmDescription.innerHTML = film.discription || "No description available.";
  filmImages.innerHTML = film.images
    .map((img: { image: { url: string } }) => `<img src="${img.image.url}" alt="${film.name}" />`)
    .join("");

  const backButton = document.getElementById("back-button")!;
  backButton.addEventListener("click", () => {
    filmList.style.display = "grid";
    filmDetail.style.display = "none";
  });
};