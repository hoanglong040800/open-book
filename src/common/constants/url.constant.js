export const CALLBACK_REGISTER = '/'

// start common url
export const URL_HOME = '/'
export const URL_ABOUT = '/about'
export const URL_REGISTER = '/register'
// end common url

// start books
export const URL_BOOKS = '/books'

export const URL_FILTER_BOOKS = `${URL_BOOKS}/filter`
export const URL_SEARCH = `${URL_BOOKS}/search`
export const URL_ADD_BOOK = `${URL_BOOKS}/new`
export const URL_ADD_MULTI_BOOKS = `${URL_BOOKS}/add-multi-books`
export const URL_UPLOAD_MULTI_FILES = `${URL_BOOKS}/upload-multi-files`

export const URL_BOOK_DETAILS = slug => `${URL_BOOKS}/${slug}`
export const URL_BOOK_READ = slug => `${URL_BOOK_DETAILS(slug)}/read`
export const URL_EDIT_BOOK = slug => `${URL_BOOK_DETAILS(slug)}/edit`
// end books

// start user
export const URL_USER = '/user'

export const URL_USER_PROFILE = user_name => `${URL_USER}/${user_name}`
export const URL_DASHBOARD = user_name => `${URL_USER}/${user_name}/dashboard`
// end user
