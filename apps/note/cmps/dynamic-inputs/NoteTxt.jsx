import { LongTxt } from '../../../../cmps/LongTxt.jsx'
import { noteService } from '../../services/note.service.js'

const { useRef } = React

export function NoteTxt({ note }) {
	const noteTitleRef = useRef(null)

	function changeContentTitle(ev) {
		note.info.title = noteTitleRef.current.innerText
		noteService.save(note)
	}

	return (
		<section className="note-txt">
			<h3
				ref={noteTitleRef}
				onKeyUp={(ev) => changeContentTitle(ev)}
				contentEditable={true}
				suppressContentEditableWarning={true}
			>
				{note.info.title}
			</h3>
			{note.info.url && <p className="note-url">From: {note.info.url}</p>}
			<LongTxt txt={note.info.txt} length={100} />
		</section>
	)
}
