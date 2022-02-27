// ====== WEBSITE NAME =====
export const WEB_NAME = "Ebook Share";

export const USER_ROLES = {
  viewer: "user",
  editor: "editor",
};

export const BOOK_LIMIT=8

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
    name_en: "Life",
  },
  {
    id: 2,
    name_en: "Business",
  },
  {
    id: 3,
    name_en: "Comic",
  },
  {
    id: 4,
    name_en: "Health",
  },
  {
    id: 5,
    name_en: "History",
  },
];

// ======= MOCKUP BOOK INFO ========

export const MOCKUP_BOOK = {
  id: 1,
  status: 1,
  created_at: "2022-02-12T09:43:28Z",
  updated_at: "2022-02-13T02:12:44Z",
  owner_id: 1,
  slug: "this-title-suck",
  name: "Một đứa trẻ vừa chạy trốn khỏi tôi",
  authors: "Wendy",
  language: "en",
  publisher: "SM Publisher",
  summary: "Hello world",
  published_year: 2022,
  pages: 0,
  rating: 4,
  view: 1000,
  file: {
    id: 12,
    status: 1,
    created_at: "2022-02-12T09:43:27.583Z",
    updated_at: "2022-02-12T09:43:27.583Z",
    file_name: "1644659004333417800.pdf",
    link_storage:
      "https://res.cloudinary.com/thesesshare/image/upload/v1644659006/ebook/1644659004333417800.pdf",
    extension: ".pdf",
    upload_date: "2022-02-12T09:43:26Z",
  },
  thumbnail: {
    id: 13,
    status: 1,
    created_at: "2022-02-12T09:43:28.316Z",
    updated_at: "2022-02-12T09:43:28.316Z",
    file_name: "1644659007709862900.png",
    link_storage:
      "https://i.pinimg.com/originals/19/f5/f7/19f5f71b440cdbab667206d951043ef9.jpg",
    extension: ".png",
    upload_date: "2022-02-12T09:43:27Z",
  },
};
