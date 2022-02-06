import * as yup from "yup";

export const REGISTER_SCHEMA = yup.object().shape({
  user_name: yup.string().required().label("Username"),

  email: yup.string().email().required().label('Email'),

  password: yup.string().required().min(1).max(20).label("Password"),

  password_confirmation: yup.string().oneOf([yup.ref("password"), null], "Do not match with password"),
});

const BOOK_INFO_SHAPE = {
  name: yup.string().required().max(255).label('Name'),

  authors: yup.string().required().max(255).label('Authors'),

  genres: yup.array().required().min(1).max(5).label('Genres'),

  publisher: yup.string().max(255).label('Publisher'),

  published_year: yup.number().notRequired().nullable().min(1).max(new Date().getFullYear()).label('Published Year'),

  language: yup.string().max(255).label('Language'),

  pages: yup.number().notRequired().nullable().min(1).label('Page'),

  summary: yup.string().max(500).label('Summary')
}


export const ADD_BOOK_SCHEMA = yup.object().shape({
  file: yup
    .mixed()
    .test("required", "Please upload book", (value) => value.length)
    .test("fileSize", "File exceeds 10MB", (value) =>
      value.length ? value[0].size <= 1000000 : false
    ),

  thumbnail: yup
    .mixed()
    .test("fileSize", "File exceeds 1MB", (value) =>
      value.length
        ? value[0].size <= 1000000
        : true
    ),

  ...BOOK_INFO_SHAPE
})
