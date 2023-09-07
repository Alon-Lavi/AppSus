import { noteService } from '../../services/note.service.js'

const { useRef } = React

export function NoteImg({ note }) {
	const noteTitleRef = useRef(null)
	const noteTxtRef = useRef(null)

	function changeContentTitle(ev) {
		note.info.title = noteTitleRef.current.innerText
		noteService.save(note)
	}

	function changeContent(ev) {
		note.info.txt = noteTxtRef.current.innerText
		noteService.save(note)
	}

	return (
		<section className="note-img">
			<React.Fragment>
				<section className="note-img">
					<h3
						ref={noteTitleRef}
						onKeyUp={(ev) => changeContentTitle(ev)}
						contentEditable={true}
						suppressContentEditableWarning={true}
					>
						{note.info.title}
					</h3>
					<img src={note.info.url} />
					<p
						ref={noteTxtRef}
						onKeyUp={(ev) => changeContent(ev)}
						contentEditable={true}
						suppressContentEditableWarning={true}
					>
						{note.info.txt}
					</p>
				</section>
			</React.Fragment>
		</section>
	)
}
