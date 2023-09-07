import { LongTxt } from '../../../../cmps/LongTxt.jsx'
import { noteService } from '../../services/note.service.js'

const { useRef } = React

export function NoteTxt({ note }) {
	const noteTitleRef = useRef(null)
	const noteTxtRef = useRef(null)

	function changeContentTitle(ev) {
		note.info.title = noteTitleRef.current.innerText
		noteService.save(note)
	}
	// function changeContentTxt(ev) {
	// 	note.info.txt = noteTxtRef.current.innerText
	// 	noteService.save(note)
	// }

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
			{/* <p ref={noteTxtRef} onKeyUp={(ev) => changeContentTxt(ev)} contentEditable={true} suppressContentEditableWarning={true}>
				{note.info.txt}
			</p> */}
			{note.info.url && <p className="note-url">From: {note.info.url}</p>}
			{}
			<LongTxt note={note} txt={note.info.txt} length={100} />
		</section>
	)
}
