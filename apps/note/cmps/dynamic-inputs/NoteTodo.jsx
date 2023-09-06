import { TodoList } from './TodoList.jsx'
import { noteService } from '../../services/note.service.js'

const { useRef } = React

export function NoteTodo({ note }) {
	const noteTitleRef = useRef(null)

	function changeContentTitle(ev) {
		note.info.title = noteTitleRef.current.innerText
		noteService.save(note)
	}

	return (
		<section className="note-todo">
			<h2
				ref={noteTitleRef}
				onKeyUp={(ev) => changeContentTitle(ev)}
				contentEditable={true}
				suppressContentEditableWarning={true}
			>
				{note.info.title}
			</h2>
			<TodoList todos={note.info.todos}></TodoList>
		</section>
	)
}
