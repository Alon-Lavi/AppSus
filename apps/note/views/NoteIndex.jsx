import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { utilService } from '../../../services/util.service.js'

const { useState, useEffect } = React

export function NoteIndex() {
	const [notes, setNotes] = useState([])
	const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

	useEffect(() => {
		loadNotes()
	}, [filterBy])

	function loadNotes() {
		noteService.query(filterBy).then((notes) => setNotes(notes))
	}

	function onSetFilter(filterByFromFilter) {
		setFilterBy(filterByFromFilter)
	}

	function onDuplicateNote(note) {
		const duplicatedNote = {
			...note,
			id: utilService.makeId(),
			createdAt: new Date(),
		}

		console.log(duplicatedNote)

		noteService
			.save(duplicatedNote)
			.then((res) => {
				setNotes((prevNotes) => [...prevNotes, res])
			})
			.catch((err) => {
				console.log('Had issues posting note', err)
			})
	}

	function onRemoveNote(noteId) {
		noteService
			.remove(noteId)
			.then(() => {
				const updatedNotes = notes.filter((note) => note.id !== noteId)
				setNotes(updatedNotes)
			})
			.catch((err) => {
				console.log('Had issues removing note', err)
			})
	}

	if (!notes) return <h1>Your note list is empty</h1>
	return (
		<section className="car-index">
			<NoteFilter onSetFilter={onSetFilter} />
			<NoteList notes={notes} onRemoveNote={onRemoveNote} onDuplicateNote={onDuplicateNote} />

			{!notes.length && <div>Your note list is empty</div>}
		</section>
	)
}
