import { getBookBySlug } from 'modules/books/api/books.api'
import PdfViewer from 'modules/books/components/pdfviewer/PdfViewer'
import { getSession } from 'next-auth/client'
import { useEffect, useState } from 'react'

export async function getServerSideProps(ctx) {
	const session = await getSession(ctx)
	return {
		props: {
			session,
			slug: ctx.query.slug,
		},
	}
}

export default function ReadBook({ session, slug }) {
	const [bookInfo, setBookInfo] = useState(null)
	/*
	 *  Hooks
	 */

	useEffect(() => {
		if (!bookInfo) getBookInfo()
	}, [bookInfo])

	/*
	 *  Async Functions
	 */
	async function getBookInfo() {
		const data = await getBookBySlug(slug)
		setBookInfo(data)
	}

	/*
	 *  JSX
	 */
	return <PdfViewer file={bookInfo?.file.link_storage} />
}
