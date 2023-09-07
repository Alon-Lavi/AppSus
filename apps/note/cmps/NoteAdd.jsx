import { noteService } from '../services/note.service.js'

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
			case 'img':
				newNote.info.url = newNoteContent
				break
			case 'todo':
				const todos = newNoteContent.split(',')
				newNote.info.todos = todos.map((todo) => ({ text: todo, done: false }))
				break
			default:
				newNote.info.txt = newNoteContent
				break
		}

		noteService
			.save(newNote)
			.then((res) => {
				setNotes((prevNotes) => [...prevNotes, res])
			})
			.catch((err) => {
				console.log('Had issues posting note', err)
			})

		setNewNoteContent('')
	}

	return (
		<form className="note-add" onSubmit={handleNoteAdd}>
			<div className="note-add-input-container">
				<input
					type="text"
					placeholder={
						newNoteType === 'img'
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
				</div>
			</div>
		</form>
	)
}
