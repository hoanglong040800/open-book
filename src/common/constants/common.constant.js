// ====== WEBSITE NAME =====
export const WEB_NAME = 'Ebook Share'

export const USER_ROLES = {
  viewer: 'user',
  editor: 'editor',
}

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