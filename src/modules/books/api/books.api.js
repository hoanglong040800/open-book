import axios from "axios";
import { uploadFile } from "modules/upload/api/upload.api";

export async function addBook(data) {
  // upload pdf
  const resFile = await uploadFile(data.file[0])
  if (resFile.status == false) return resFile

  // upload image
  const resThumbnail = await uploadFile(data.thumbnail[0])
  if (resThumbnail.status == false) return resThumbnail

  data.file = resFile.data
  data.thumbnail = resThumbnail.data

  return addBookInfo(data)
}

export function addBookInfo(data) {
  return axios.post('books', data)
}