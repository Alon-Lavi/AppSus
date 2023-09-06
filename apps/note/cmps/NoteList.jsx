export function NoteList() {
	return (
		<ul className="note-list">
			{notes.map((note) => (
				<li key={note.id}></li>
			))}
		</ul>
	)
}
