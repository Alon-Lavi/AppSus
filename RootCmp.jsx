const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { About } from './views/About.jsx'
import { Home } from './views/Home.jsx'
import { MailIndex } from './apps/mail/views/MailIndex.jsx'
import { MailDetails } from './apps/mail/views/MailDetails.jsx'
import { MailCompose } from './apps/mail/cmps/MailCompose.jsx'
import { NoteIndex } from './apps/note/views/NoteIndex.jsx'
import { BookDetails } from './apps/book/pages/BookDetails.jsx'
import { BookEdit } from './apps/book/pages/BookEdit.jsx'
import { BookIndex } from './apps/book/pages/BookIndex.jsx'

export function App() {
	return (
		<Router>
			<section className="app">
				<AppHeader />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/mail" element={<MailIndex />} />
					<Route path="/mail/:mailId" element={<MailDetails />} />
					<Route path="/mail/compose/:mailId" element={<MailCompose />} />
					<Route path="/note" element={<NoteIndex />} />
					<Route path="/book/:bookId" element={<BookDetails />} />
					<Route path="/book/edit/:bookId" element={<BookEdit />} />
					<Route path="/book/edit" element={<BookEdit />} />
					<Route path="/book" element={<BookIndex />} />
				</Routes>
			</section>
		</Router>
	)
}
