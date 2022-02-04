export function toTitleCase(str) {
  const regex = /(^\w|\s\w)(\S*)/g
  return str.replace(regex, (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase())

}