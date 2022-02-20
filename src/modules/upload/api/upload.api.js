import axiosClient from "common/config/api.config";

export function uploadFile(file) {
  const formData = new FormData()
  formData.append('file', file)

  return axiosClient.post('upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}