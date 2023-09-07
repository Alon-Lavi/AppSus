import { noteService } from '../apps/note/services/note.service.js'

const { useState, useRef } = React

export function LongTxt({ note, txt, length = 100 }) {
	const [isShowMore, setIsShowMore] = useState(false)
	const noteTxtRef = useRef(null)

	function handleClick() {
		setIsShowMore((prevState) => !prevState)
	}

	function changeContent(ev) {
		note.info.txt = noteTxtRef.current.innerText
		noteService.save(note)
	}

	function getTxtToShow() {
		if (txt.length < length) return txt
		else {
			if (isShowMore) return txt
			else return txt.substring(0, length)
		}
	}

	return (
		<section>
			<p ref={noteTxtRef} onKeyUp={(ev) => changeContent(ev)} contentEditable={true} suppressContentEditableWarning={true}>
				{getTxtToShow()}
			</p>
			<p>
				{txt.length > length && (
					<button className="long-txt-btn" onClick={handleClick}>
						{!isShowMore ? 'Show More' : 'Show Less'}
					</button>
				)}
			</p>
		</section>
	)
}
