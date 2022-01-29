// ==== SESSION ======
export const tokenData = ["id", "email", "full_name", "gender", "user_name"];

// ======== nav links ======
function getUrlQuery(name, value) {
  return {
    [name]: value,
  };
}

export const navlinks = [
  {
    cate: "Genres",
    lists: [
      {
        name: "Life",
        query: getUrlQuery("faculty", "MMTT&TT"),
      },
      {
        name: "IT",
        query: getUrlQuery("faculty", "HTTT"),
      },
    ],
  },
];