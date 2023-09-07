import { NoteTxt } from './dynamic-inputs/NoteTxt.jsx'
import { NoteImg } from './dynamic-inputs/NoteImg.jsx'
import { NoteTodo } from './dynamic-inputs/NoteTodo.jsx'
import { noteService } from '../services/note.service.js'

const { useNavigate } = ReactRouterDOM
const { useState, useRef } = React

export function NotePreview({ note, onRemoveNote, onDuplicateNote }) {
	const [color, setColor] = useState(note.backgroundColor)
	const [isPinned, setIsPinned] = useState(note.isPinned)
	const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
	const navigate = useNavigate()
	const colorRef = useRef(color)

	function DynamicNoteType(note) {
		if (note.type === 'txt') {
			return <NoteTxt note={note} />
		} else if (note.type === 'img') {
			return <NoteImg note={note} />
		} else if (note.type === 'todo') {
			return <NoteTodo note={note} />
		}
	}

	function handlePinToggle() {
		const updatedIsPinned = !isPinned
		setIsPinned(updatedIsPinned)
		note.isPinned = updatedIsPinned
		noteService.save(note)
	}

	function handleChangeNoteColor(color) {
		setColor(color)
		colorRef.current = color
		note.backgroundColor = color
		noteService.save(note)
		setIsColorPickerOpen(false)
	}

	function handleColorPickerToggle() {
		setIsColorPickerOpen(!isColorPickerOpen)
	}

	return (
		<article className="note-preview" style={{ backgroundColor: color }}>
			<i onClick={handlePinToggle} className={`pin-btn fas fa-thumbtack${isPinned ? ' pinned' : ''}`}></i>
			<section className="note-content">{DynamicNoteType(note)}</section>
			<section className="tooltip-menu">
				{isColorPickerOpen && (
					<div className={`color-picker ${isColorPickerOpen ? 'open' : ''}`}>
						<button
							className="color-btn"
							style={{ backgroundColor: '#FBBC05' }}
							onClick={() => handleChangeNoteColor('#FBBC05')}
						></button>

						<button
							className="color-btn"
							style={{ backgroundColor: '#FFF475' }}
							onClick={() => handleChangeNoteColor('#FFF475')}
						></button>

						<button
							className="color-btn"
							style={{ backgroundColor: '#CCFF90' }}
							onClick={() => handleChangeNoteColor('#CCFF90')}
						></button>

						<button
							className="color-btn"
							style={{ backgroundColor: '#F28B82' }}
							onClick={() => handleChangeNoteColor('#F28B82')}
						></button>

						<button
							className="color-btn"
							style={{ backgroundColor: '#FDCFE8' }}
							onClick={() => handleChangeNoteColor('#FDCFE8')}
						></button>

						<button
							className="color-btn"
							style={{ backgroundColor: '#CBF0F8' }}
							onClick={() => handleChangeNoteColor('#CBF0F8')}
						></button>
					</div>
				)}

				<button className="tooltip-btn" onClick={() => onDuplicateNote(note)}>
					<i className="fas fa-copy"></i>
				</button>

				<button className="tooltip-btn" onClick={handleColorPickerToggle}>
					<i className="fas fa-palette"></i>
				</button>

				<button className="tooltip-btn" onClick={() => onRemoveNote(note.id)}>
					<i className="fas fa-trash-alt"></i>
				</button>
			</section>
		</article>
	)
}