import { NotePreview } from '../cmps/NotePreview.jsx'

export function NoteList({ notes, onRemoveNote, onDuplicateNote, onChangeColorNote }) {
	return (
		<ul className="note-list">
			{notes.map((note) => (
				<li key={note.id}>
					<NotePreview
						note={note}
						onRemoveNote={onRemoveNote}
						onDuplicateNote={onDuplicateNote}
						onChangeColorNote={onChangeColorNote}
					/>
				</li>
			))}
		</ul>
	)
}
