import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { noteService } from '../services/note.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
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

		noteService
			.save(duplicatedNote)
			.then((res) => {
				setNotes((prevNotes) => [res, ...prevNotes])
				showSuccessMsg(`Note successfully duplicated!`)
			})
			.catch((err) => {
				console.log('Had issues posting note', err)
				showErrorMsg('Problem duplicated!')
			})
	}

	function onRemoveNote(noteId) {
		noteService
			.remove(noteId)
			.then(() => {
				const updatedNotes = notes.filter((note) => note.id !== noteId)
				setNotes(updatedNotes)
				showSuccessMsg(`Note successfully removed!`)
			})
			.catch((err) => {
				console.log('Had issues removing note', err)
				showErrorMsg('Problem in removing')
			})
	}

	if (!notes) return <h1>Your note list is empty</h1>
	return (
		<section className="note-index">
			<NoteFilter onSetFilter={onSetFilter}></NoteFilter>
			<NoteAdd setNotes={setNotes}></NoteAdd>
			<NoteList notes={notes} onRemoveNote={onRemoveNote} onDuplicateNote={onDuplicateNote}></NoteList>

			{!notes.length && <div>Your note list is empty</div>}
		</section>
	)
}
