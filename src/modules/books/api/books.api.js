import axiosClient from "common/config/api.config";
import { uploadFile } from "modules/upload/api/upload.api";

export async function addBook(data) {
  // upload pdf
  const resFile = await uploadFile(data.file[0]);
  if (!resFile.status && resFile.status !== 200) return resFile;

  // upload image
  const resThumbnail = await uploadFile(data.thumbnail[0]);
  if (!resFile.status && resFile.status !== 200) return resThumbnail;

  data.file = resFile.data;
  data.thumbnail = resThumbnail.data;

  return addBookInfo(data);
}

export function addBookInfo(data) {
  return axios.post("books", data);
}

export function getAllBooks() {
  return axios.get(`books`).then((res) => res.data);
}

export function getBookById(id) {
  return axios.get(`books/${id}`).then((res) => res.data);
}

export function updateBookInfo(id, data) {
  return axios.patch(`books/${id}`, data);
}
