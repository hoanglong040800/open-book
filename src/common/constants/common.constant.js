import {
	URL_ADD_MULTI_BOOKS,
	URL_DASHBOARD,
	URL_UPLOAD_MULTI_FILES,
} from './url.constant'

export const WEB_NAME = 'Open Book'

export const USER_ROLES = {
	anonymous: 'anonymous',
	viewer: 'viewer',
	store: 'store',
}

export const BOOK_LIMIT = 8

// start navlink

export const navlinks = [
	{
		cate: 'Genres',
		lists: [
			{
				id: 10,
				status: 1,
				created_at: '2022-05-22T14:37:32Z',
				updated_at: '2022-05-22T14:37:32Z',
				name_en: 'Travel',
			},
			{
				id: 9,
				status: 1,
				created_at: '2022-05-22T14:37:32Z',
				updated_at: '2022-05-22T14:37:32Z',
				name_en: 'Test Preparation',
			},
			{
				id: 8,
				status: 1,
				created_at: '2022-05-22T14:37:32Z',
				updated_at: '2022-05-22T14:37:32Z',
				name_en: 'Science Fiction',
			},
			{
				id: 7,
				status: 1,
				created_at: '2022-05-22T14:37:32Z',
				updated_at: '2022-05-22T14:37:32Z',
				name_en: 'Romance',
			},
			{
				id: 6,
				status: 1,
				created_at: '2022-05-22T14:37:32Z',
				updated_at: '2022-05-22T14:37:32Z',
				name_en: 'Parenting',
			},
			{
				id: 5,
				status: 1,
				created_at: '2022-05-22T14:37:32Z',
				updated_at: '2022-05-22T14:37:32Z',
				name_en: 'History',
			},
			{
				id: 4,
				status: 1,
				created_at: '2022-05-22T14:37:32Z',
				updated_at: '2022-05-22T14:37:32Z',
				name_en: 'Cooking',
			},
			{
				id: 3,
				status: 1,
				created_at: '2022-05-22T14:37:32Z',
				updated_at: '2022-05-22T14:37:32Z',
				name_en: 'Computer',
			},
			{
				id: 2,
				status: 1,
				created_at: '2022-05-22T14:37:32Z',
				updated_at: '2022-05-22T14:37:32Z',
				name_en: 'Comics',
			},
			{
				id: 1,
				status: 1,
				created_at: '2022-05-22T14:37:32Z',
				updated_at: '2022-05-22T14:37:32Z',
				name_en: 'Children',
			},
		],
	},
]

export const storeNavLinks = [
	{
		text: 'Dashboard',
		url: URL_DASHBOARD,
	},
	{
		text: 'Add Books',
		url: URL_ADD_MULTI_BOOKS,
	},
	{
		text: 'Upload Files',
		url: URL_UPLOAD_MULTI_FILES,
	},
]

// end navlink

export const GENRES = [
	{
		id: 32,
		name_en: 'comedy',
	},
	{
		id: 31,
		name_en: 'humor',
	},
	{
		id: 30,
		name_en: 'poetry',
	},
	{
		id: 29,
		name_en: 'essay/short nonfiction',
	},
	{
		id: 28,
		name_en: 'music',
	},
	{
		id: 27,
		name_en: 'art',
	},
	{
		id: 26,
		name_en: 'politics',
	},
	{
		id: 25,
		name_en: 'philosophy',
	},
	{
		id: 24,
		name_en: 'psychology',
	},
	{
		id: 23,
		name_en: 'nature',
	},
	{
		id: 22,
		name_en: 'satire',
	},
	{
		id: 21,
		name_en: 'mystery',
	},
	{
		id: 20,
		name_en: 'holiday',
	},
	{
		id: 19,
		name_en: 'horror stories',
	},
	{
		id: 18,
		name_en: 'romance',
	},
	{
		id: 17,
		name_en: 'non-fiction',
	},
	{
		id: 16,
		name_en: 'biography',
	},
	{
		id: 15,
		name_en: 'fantasy',
	},
	{
		id: 14,
		name_en: 'short stories',
	},
	{
		id: 13,
		name_en: 'fairy tales',
	},
	{
		id: 12,
		name_en: 'dramatic works',
	},
	{
		id: 11,
		name_en: 'kids',
	},
	{
		id: 10,
		name_en: 'teen/young adult',
	},
	{
		id: 9,
		name_en: 'literature',
	},
	{
		id: 8,
		name_en: 'animals',
	},
	{
		id: 7,
		name_en: 'adventure',
	},
	{
		id: 6,
		name_en: 'history',
	},
	{
		id: 5,
		name_en: 'health',
	},
	{
		id: 4,
		name_en: 'fiction',
	},
	{
		id: 3,
		name_en: 'science',
	},
	{
		id: 2,
		name_en: 'technology',
	},
	{
		id: 1,
		name_en: 'business',
	},
]

// file type
const FILE_TYPE = {
	PNG: 'image/png',
	GIF: 'image/gif',
	JPG: 'image/jpeg, image/jpg',
	PDF: '.pdf',
	EXCEL: '',
	CSV: '.csv',
}

export const ACCEPT_FILE_TYPES = {
	EBOOK: `${FILE_TYPE.PDF}`,
	THUMBNAIL: `${FILE_TYPE.PNG}, ${FILE_TYPE.GIF}, ${FILE_TYPE.JPG}`,
	ADD_MULTI_BOOKS: `${FILE_TYPE.CSV}`,
}
// end file type
