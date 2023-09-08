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

	return (
		<section className="note-filter">
			<form className="onsubmit">
				<label className="note-filter-label" htmlFor="type">Filter by type:</label>
				<select className="select-btn" id="type" name="type" value={filterByToEdit.type} onChange={handleChange}>
					<option value="">Select Type</option>
					<option value="txt">Text</option>
					<option value="img">Image</option>
					<option value="todo">Todo List</option>
					<option value="video">Video</option>
				</select>
			</form>
		</section>
	)
}
