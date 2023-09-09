import { noteService } from '../../services/note.service.js'

const { useRef } = React

export function NoteVideo({ note }) {
	const noteTitleRef = useRef(null)
	const noteTxtRef = useRef(null)

	const embedUrl = convertToEmbedUrl(note.info.url)

	function convertToEmbedUrl(fullUrl) {
		if (!fullUrl) return

		const urlParams = new URLSearchParams(new URL(fullUrl).search)
		const videoId = urlParams.get('v')
		return `https://www.youtube.com/embed/${videoId}`
	}

	function changeContentTitle(ev) {
		note.info.title = noteTitleRef.current.innerText
		noteService.save(note)
	}

	function changeContent(ev) {
		note.info.txt = noteTxtRef.current.innerText
		noteService.save(note)
	}

	return (
		<section className="note-video">
			<h2
				ref={noteTitleRef}
				onKeyUp={(ev) => changeContentTitle(ev)}
				contentEditable={true}
				suppressContentEditableWarning={true}
			>
				{note.info.title}
			</h2>

			<div className="video-container">
				<iframe
					width="100%"
					height="100%"
					src={embedUrl}
					title="YouTube video player"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowFullScreen
				></iframe>
			</div>

			<p ref={noteTxtRef} onKeyUp={(ev) => changeContent(ev)} contentEditable={true} suppressContentEditableWarning={true}>
				{note.info.txt}
			</p>
		</section>
	)
}
