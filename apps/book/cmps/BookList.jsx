import { BookPreview } from '../cmps/BookPreview.jsx'
const { Link } = ReactRouterDOM

export function BookList({ books, onRemoveBook }) {
	return (
		<ul className="book-list">
			{books.map((book) => (
				<li key={book.id}>
					<BookPreview book={book} />

					<section>
						<button className="btn-book">
							<Link to={`/book/edit/${book.id}`}>Edit</Link>
						</button>

						<button className="btn-book">
							<Link to={`/book/${book.id}`}>Details</Link>
						</button>

						<button className="btn-book" onClick={() => onRemoveBook(book.id)}>
							Remove Book
						</button>
					</section>
				</li>
			))}
		</ul>
	)
}
