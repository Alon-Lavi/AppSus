import { utilService } from '../../../services/util.service.js'

export function BookPreview({ book }) {
	function getBookPrice() {
		let price = book.listPrice.amount
		let currencyCode = utilService.getCurrencySymbol(book.listPrice.currencyCode)
		return `${price} ${currencyCode}`
	}

	return (
		<article>
			<h2>Title: {book.title}</h2>
			<h4>{Array.isArray(book.authors) ? book.authors.join(',') : book.authors} </h4>
			<img src={book.thumbnail} />
			<h4>Price: {getBookPrice()}</h4>
		</article>
	)
}
