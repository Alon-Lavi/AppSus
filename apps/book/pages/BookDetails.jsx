import { LongTxt } from '../../../cmps/LongTxt.jsx'
import { bookService } from '../services/book.service.js'
import { utilService } from '../../../services/util.service.js'

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

export function BookDetails() {
	const [book, setBook] = useState(null)
	const params = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		loadRobots()
	}, [params.bookId])

	function loadRobots() {
		bookService
			.get(params.bookId)
			.then(setBook)
			.catch((err) => {
				console.log('err:', err)
				navigate('/book')
			})
	}

	function onBack() {
		navigate('/book')
	}

	function getPageCount() {
		let pageCount = book.pageCount
		if (pageCount > 500) return `${pageCount} - Serious Reading`
		else if (pageCount > 200) return `${pageCount} - Descent Reading`
		else if (pageCount < 100) return `${pageCount} - Light Reading`
	}

	function getPublishedYear() {
		const currYear = new Date().getFullYear()
		let publishedYear = book.publishedDate
		let diff = currYear - publishedYear
		if (diff > 10) publishedYear += ' - Vintage'
		else if (diff < 1) publishedYear += ' - New!'
		return publishedYear
	}

	function getPriceColor() {
		const price = book.listPrice.amount
		if (price > 150) return 'red'
		else if (price < 20) return 'green'
	}

	function getBookPrice() {
		let price = book.listPrice.amount
		let currencyCode = utilService.getCurrencySymbol(book.listPrice.currencyCode)
		return `${price} ${currencyCode}`
	}

	if (!book) return <div>Loading...</div>

	return (
		<section className="book-details">
			<h4>Id: {book.id}</h4>
			<h4>Title: {book.title}</h4>
			<h4>Subtitle: {book.subtitle}</h4>
			<h4>Authors: {book.authors.join(',')}</h4>
			<h4>Publish year: {getPublishedYear()}</h4>
			<img src={book.thumbnail} />
			<h4>Categories: {book.categories.join(',')}</h4>
			<h4>Page Count: {getPageCount()}</h4>
			<h4>
				Price: <span className={getPriceColor()}>{getBookPrice()}</span>{' '}
			</h4>
			{book.listPrice.isOnSale && <p className="sale">On Sale</p>}

			<div>
				Description:
				<LongTxt txt={book.description} />
			</div>

			<button onClick={onBack}>Back</button>
		</section>
	)
}
