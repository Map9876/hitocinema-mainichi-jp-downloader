import axios from "axios";
import { Film } from "../models/Film";

const API_KEY = "0ea404763da34c3e8add6223cb3078ebaa84";
const API_URL = "https://hitocinema.microcms.io/api/v1/films-info";

// 获取电影列表
export const fetchFilmList = async (
  limit: number,
  offset: number
): Promise<{ contents: Film[]; totalCount: number }> => {
  const response = await axios.get(API_URL, {
    headers: {
      "x-microcms-api-key": API_KEY,
    },
    params: {
      fields: "id,name,images,productionYear",
      limit: limit,
      offset: offset,
      orders: "-productionYear",
    },
  });
  return {
    contents: response.data.contents,
    totalCount: response.data.totalCount,
  };
};

// 获取电影详情
export const fetchFilmDetail = async (filmId: string): Promise<Film> => {
  const response = await axios.get(`${API_URL}/${filmId}`, {
    headers: {
      "x-microcms-api-key": API_KEY,
    },
  });
  return response.data;
};