import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
	get,
	save,
	query,
	remove,
	getEmptyNote,
	getDefaultFilter,
}

function query(filterBy = getDefaultFilter()) {
	return storageService.query(NOTE_KEY).then((notes) => {
		// if (filterBy.txt) {
		// 	const regex = new RegExp(filterBy.txt, 'i')
		// 	notes = notes.filter((note) => regex.test(note.info.txt))
		// }

		if (filterBy.type) {
			const regex = new RegExp(filterBy.type, 'i')
			notes = notes.filter((note) => regex.test(note.type))
		}

		const pinnedNotes = notes.filter((note) => note.isPinned)
		const unpinnedNotes = notes.filter((note) => !note.isPinned)
		const sortedNotes = pinnedNotes.concat(unpinnedNotes)

		return sortedNotes
	})
}

function get(noteId) {
	return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
	return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
	return storageService
		.query(NOTE_KEY)
		.then((notes) => {
			const existingNote = notes.find((item) => item.id === note.id)
			if (existingNote) {
				return storageService.put(NOTE_KEY, note)
			} else {
				return storageService.post(NOTE_KEY, note)
			}
		})
		.catch((err) => {
			console.error('Error while saving note:', err)
		})
}

function getDefaultFilter() {
	return { type: '' }
	//txt: '',
}

function _createNotes() {
	let notes = utilService.loadFromStorage(NOTE_KEY)

	if (!notes || !notes.length) {
		const notes = [
			{
				id: 'n101',
				createdAt: 1112222,
				type: 'txt',
				isPinned: true,
				backgroundColor: '#FBBC05',
				info: {
					title: 'Example Note!',
					txt: 'Example Note',
				},
			},
			{
				id: 'n102',
				type: 'img',
				isPinned: false,
				info: {
					url: '/assets/img/audi.jpg',
					title: 'Audi!',
					txt: 'Audi!',
				},
				backgroundColor: 'transparent',
			},
			{
				id: 'n103',
				type: 'todo',
				isPinned: false,
				info: {
					title: 'Get my stuff together',
					todos: [
						{ txt: 'Goo shopping', done: false },
						{ txt: 'Coding power', done: true },
						{ txt: 'Driving license', done: true },
					],
				},
				backgroundColor: '#CCFF90',
			},
			{
				id: 'n104',
				type: 'todo',
				isPinned: false,
				info: {
					title: 'To buy:',
					todos: [
						{ txt: 'Butter', done: false },
						{ txt: 'Tomato', done: false },
						{ txt: 'Milk', done: false },
					],
				},
				backgroundColor: 'transparent',
			},
			{
				id: 'n105',
				type: 'video',
				isPinned: false,
				info: {
					url: 'https://www.youtube.com/watch?v=Gbh6p0hXk-8&ab_channel=DanAlmagor',
					title: 'יש כח יש עבודה - בני ברמן',
					txt: 'יש כח יש עבודה - בני ברמן',
				},
				backgroundColor: '#F28B82',
				label: 'none',
			},
			{
				id: 'n106',
				type: 'video',
				isPinned: false,
				info: {
					url: 'https://www.youtube.com/watch?v=bMknfKXIFA8&ab_channel=freeCodeCamp.org',
					title: 'React Course - Beginners',
					txt: 'React Course - Beginners Tutorial for React JavaScript Library [2022]',
				},
				backgroundColor: 'transparent',
				label: 'none',
			},
		]

		utilService.saveToStorage(NOTE_KEY, notes)
	}
}

function getEmptyNote(type) {
	return {
		id: utilService.makeId(),
		type,
		isPinned: false,
		backgroundColor: 'transparent',
		info: {
			title: 'Untitled',
			txt: 'insert text',
		},
		label: 'none',
	}
}
