export function handleApiResponse(resObj) {
  if (resObj.status === 200) {
    return resObj.data
  }

  else {
    throw new Error(resObj.message)
  }
}