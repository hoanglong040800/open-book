import { COMMON_ALERT } from "common/constants/alert.constant"

export function toTitleCase(str) {
  const regex = /(^\w|\s\w)(\S*)/g
  return str.replace(regex, (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase())
}

export function handleSimpleServiceError(res) {
  return res.status === 200 || res.status
    ? COMMON_ALERT.success
    : COMMON_ALERT.error
}