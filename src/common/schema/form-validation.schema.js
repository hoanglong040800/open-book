import * as yup from "yup";

export const signupSchema = yup.object().shape({
  email: yup.string().required("Chưa nhập email").email("Không phải email"),

  user_name: yup.string().required("Chưa nhập username"),

  password: yup
    .string()
    .required("Chưa nhập mật khẩu")
    .min(1, "Mật khẩu tối thiểu 8 kí tự")
    .max(20, "Mật khẩu không được quá 20 kí tự"),

  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Không trùng với mật khẩu"),
});

export const rsPswdSchema = yup.object().shape({
  pswdOld: yup.string().required("Bắt buộc"),

  pswdNew: yup
    .string()
    .required("Bắt buộc")
    .min(8, "Tối thiểu 8 kí tự")
    .max(20, "Không được quá 20 kí tự"),

  pswdCf: yup
    .string()
    .oneOf([yup.ref("pswdNew"), null], "Không trùng với mật khẩu mới"),
});

const infoYupShape = {
  name: yup
    .string()
    .required("Bắt buộc")
    .max(255, (obj) => `Không được quá ${obj.max} kí tự`),

  tags: yup
    .array()
    .required("Ít nhất 1 tag")
    .min(1, (obj) => `Ít nhất ${obj.min} tags`)
    .max(5, (obj) => `Không được quá ${obj.max} tags`),

  type: yup.string().required("Bắt buộc"),

  faculty_id: yup.number().typeError("Bắt buộc").required("Bắt buộc"),

  published_year: yup
    .number()
    .typeError("Bắt buộc")
    .required("Bắt buộc")
    .min(1900, (obj) => `Không được nhỏ hơn năm ${obj.min}`)
    .max(
      new Date().getFullYear(),
      (obj) => `Không được lớn hơn năm ${obj.max}`
    ),

  language: yup.string(),

  format: yup.string(),

  authors: yup.string().max(255, (obj) => `Không được quá ${obj.max} kí tự`),

  teachers: yup.string().max(255, (obj) => `Không được quá ${obj.max} kí tự`),

  abstract: yup.string().max(2000, (obj) => `Không được quá ${obj.max} kí tự`),
};

export const thesisSchema = yup.object().shape({
  file: yup
    .mixed()
    .test("required", "Chưa tải luận văn", (value) => value.length)
    .test("fileSize", "File vượt quá 25MB", (value) =>
      value.length ? value[0].size <= 25000000 : false
    ),

  ...infoYupShape,
});

export const editThesisSchema = yup.object().shape({
  ...infoYupShape,
});
