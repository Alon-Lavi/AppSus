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
		if (filterBy.txt) {
			const regex = new RegExp(filterBy.txt, 'i')
			notes = notes.filter((note) => regex.test(note.info.text))
		}

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
	return { txt: '', type: '' }
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
				backgroundColor: '#00d',
				info: {
					title: 'Fullstack Baby!',
					txt: 'Fullstack Me Baby!',
				},
			},
			{
				id: 'n102',
				type: 'img',
				isPinned: false,
				info: {
					url: 'http://some-img/me',
					title: 'Bobi and Me',
				},
				backgroundColor: '#00d',
			},
			{
				id: 'n103',
				type: 'todo',
				isPinned: false,
				info: {
					title: 'Get my stuff together',
					todos: [
						{ txt: 'Driving license', done: false },
						{ txt: 'Coding power', done: true },
					],
					txt: 'Some txt...',
				},
				backgroundColor: '#00d',
			},
			{
				id: 'n104',
				type: 'todo',
				isPinned: false,
				info: {
					title: 'Get my stuff together',
					todos: [
						{ txt: 'Driving license', done: false },
						{ txt: 'Coding power', done: true },
						{ txt: 'Coding power', done: true },
					],
					txt: 'Some txt...',
				},
				backgroundColor: '#00d',
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
		backgroundColor: 'whitesmoke',
		info: {
			title: 'insert title',
			txt: 'insert text',
		},
		label: 'none',
	}
}
