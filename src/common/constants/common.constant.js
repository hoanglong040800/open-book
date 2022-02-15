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

//  =============== MOCK DATA =========

export const GENRES = [
  {
    id: 1,
    name_en: 'Life'
  },
  {
    id: 2,
    name_en: 'Business'
  },
  {
    id: 3,
    name_en: 'Comic'
  },
  {
    id: 4,
    name_en: 'Health'
  },
  {
    id: 5,
    name_en: 'History'
  },
]