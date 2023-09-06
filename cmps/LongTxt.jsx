import { noteService } from '../apps/note/services/note.service.js'

const { useState, useRef } = React

export function LongTxt({ txt, length = 100 }) {
	const [showMore, setShowMore] = useState(false)
	const noteTxtRef = useRef(null)
	const trimmedTxt = `${txt.substring(0, length)} ...`

	function changeContent(ev) {
		note.info.txt = noteTxtRef.current.innerText
		noteService.save(note)
	}

	function toggleShowMore() {
		setShowMore((pervShowMore) => !pervShowMore)
	}

	return (
		<section>
			<p ref={noteTxtRef} onKeyUp={(ev) => changeContent(ev)} contentEditable={true} suppressContentEditableWarning={true}>
				{showMore ? txt : trimmedTxt}
			</p>
			{txt.length > length && (
				<button className="long-txt-btn" onClick={toggleShowMore}>
					{showMore ? 'Read less' : 'Read more'}
				</button>
			)}
		</section>
	)
}
