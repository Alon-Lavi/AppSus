import { noteService } from '../services/note.service.js'

const { useState, useEffect } = React

export function NoteFilter({ onSetFilter }) {
	const [filterByToEdit, setFilterByToEdit] = useState(noteService.getDefaultFilter())

	useEffect(() => {
		onSetFilter(filterByToEdit)
	}, [filterByToEdit])

	function handleChange({ target }) {
		let { value, name: field } = target
		setFilterByToEdit((prevFilter) => {
			return { ...prevFilter, [field]: value }
		})
	}

	function onSubmitFilter(ev) {
		ev.preventDefault()
		onSetFilter(filterByToEdit)
	}

	return (
		<section className="note-filter">
			<form className="onsubmit" onSubmit={onSubmitFilter}>
				<input
					type="text"
					id="txt"
					name="txt"
					placeholder="Search by text"
					value={filterByToEdit.txt}
					onChange={handleChange}
				/>

				<input
					type="text"
					id="type"
					name="type"
					placeholder="Search by type"
					value={filterByToEdit.type}
					onChange={handleChange}
				/>
			</form>
		</section>
	)
}
