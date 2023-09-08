import { noteService } from '../services/note.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

const { useState } = React

export function NoteAdd({ setNotes }) {
	const [newNoteContent, setNewNoteContent] = useState('')
	const [newNoteType, setNewNoteType] = useState('txt')

	function handleInputChange(event) {
		setNewNoteContent(event.target.value)
	}

	function handleNoteTypeChange(type) {
		setNewNoteType(type)
	}

	function handleNoteAdd(event) {
		event.preventDefault()

		const newNote = noteService.getEmptyNote()
		newNote.type = newNoteType
		switch (newNote.type) {
			case 'video':
				newNote.info.url = newNoteContent
				break
			case 'img':
				newNote.info.url = newNoteContent
				break
			case 'todo':
				const todos = newNoteContent.split(',')
				newNote.info.todos = todos.map((todo) => ({ txt: todo, done: false }))
				break
			default:
				newNote.info.txt = newNoteContent
				break
		}

		noteService
			.save(newNote)
			.then((res) => {
				setNotes((prevNotes) => [res, ...prevNotes])
				showSuccessMsg(`Note added successfully!`)
			})
			.catch((err) => {
				console.log('Had issues posting note', err)
				showErrorMsg('Failed to insert note ')
			})

		setNewNoteContent('')
	}

	return (
		<form className="note-add" onSubmit={handleNoteAdd}>
			<label className="note-add-label" htmlFor="text">
				Add New Note:
			</label>
			<div className="note-add-input-container">
				<input
					className="note-add-input"
					id="text"
					name="text"
					type="text"
					placeholder={
						newNoteType === 'video'
							? 'Add YouTube URL'
							: newNoteType === 'img'
							? 'Enter an image URL'
							: newNoteType === 'todo'
							? `Separate todos by ','`
							: 'Enter a new note text'
					}
					value={newNoteContent}
					onChange={handleInputChange}
				/>
				<div className="note-add-type-btns">
					<button
						type="button"
						className={`note-type-btn ${newNoteType === 'txt' ? 'active' : ''}`}
						onClick={() => handleNoteTypeChange('txt')}
					>
						<i className="fas fa-font"></i>
					</button>

					<button
						type="button"
						className={`note-type-btn ${newNoteType === 'todo' ? 'active' : ''}`}
						onClick={() => handleNoteTypeChange('todo')}
					>
						<i className="fas fa-list-ul"></i>
					</button>

					<button
						type="button"
						className={`note-type-btn ${newNoteType === 'img' ? 'active' : ''}`}
						onClick={() => handleNoteTypeChange('img')}
					>
						<i className="fas fa-image"></i>
					</button>

					<button
						type="button"
						className={`note-type-btn ${newNoteType === 'video' ? 'active' : ''}`}
						onClick={() => handleNoteTypeChange('video')}
					>
						<i className="fas fa-video"></i>
					</button>
				</div>
			</div>
		</form>
	)
}
