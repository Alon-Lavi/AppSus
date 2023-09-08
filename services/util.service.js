export const utilService = {
	makeId,
	makeLorem,
	getRandomIntInclusive,
	getRandomColor,
	padNum,
	getDayName,
	getMonthName,
	saveToStorage,
	loadFromStorage,
	getMailDate,
	getCurrencySymbol,
}

function makeId(length = 6) {
	var txt = ''
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

	for (var i = 0; i < length; i++) {
		txt += possible.charAt(Math.floor(Math.random() * possible.length))
	}

	return txt
}

function makeLorem(size = 100) {
	var words = [
		'The sky',
		'above',
		'the port',
		'was',
		'the color of television',
		'tuned',
		'to',
		'a dead channel',
		'.',
		'All',
		'this happened',
		'more or less',
		'.',
		'I',
		'had',
		'the story',
		'bit by bit',
		'from various people',
		'and',
		'as generally',
		'happens',
		'in such cases',
		'each time',
		'it',
		'was',
		'a different story',
		'.',
		'It',
		'was',
		'a pleasure',
		'to',
		'burn',
	]
	var txt = ''
	while (size > 0) {
		size--
		txt += words[Math.floor(Math.random() * words.length)] + ' '
	}
	return txt
}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function padNum(num) {
	return num > 9 ? num + '' : '0' + num
}

function getRandomColor() {
	const letters = '0123456789ABCDEF'
	var color = '#'
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)]
	}
	return color
}

function getDayName(date, locale) {
	date = new Date(date)
	return date.toLocaleDateString(locale, { weekday: 'long' })
}

function getMonthName(date) {
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]
	return monthNames[date.getMonth()]
}

function saveToStorage(key, val) {
	localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
	var val = localStorage.getItem(key)

	return JSON.parse(val)
}

function getMailDate(date) {
	const now = new Date()
	const diff = now - date

	if (date.getFullYear() < now.getFullYear()) {
		// If the date is from a previous year
		return date.getFullYear().toString() // Return just the year number
	} else if (diff > 24 * 60 * 60 * 1000 || now.getDate() !== date.getDate()) {
		// If the date is from this year but more than one day ago or it's not today
		const monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		]
		const dayNumber = date.getDate()
		const monthName = monthNames[date.getMonth()]
		return `${monthName} ${dayNumber}`
	} else {
		// Otherwise, return the time in hours and minutes
		const hours = date.getHours() % 12 || 12
		const minutes = date.getMinutes()
		const ampm = hours >= 12 ? 'am' : 'pm'
		return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`
	}
}

function getCurrencySymbol(currencyCode) {
	switch (currencyCode) {
		case 'EUR':
			return '€'
		case 'ILS':
			return '₪'
		case 'USD':
			return '$'
	}
}
