import { mailService } from '../services/mail.service.js'
import { noteService } from '../../note/services/note.service.js';

const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function MailDetails() {
	const [mail, setMail] = useState(null)
	const { mailId } = useParams()
	const [lastMailId, setLastMailId] = useState(null)
	const [nextMailId, setNextMailId] = useState(null)

	const navigate = useNavigate()

	function loadNextId() {
		mailService.getNextMailId(mailId).then(setNextMailId)
	}

	function loadLastId() {
		mailService.getLastMailId(mailId).then(setLastMailId)
	}

	function loadMail() {
		mailService
			.get(mailId)
			.then((mail) => {
				mailService.updateIsRead(mail)
				setMail(mail)
			})
			.catch((err) => {
				console.log("Sorry couldn't find the requested mail", err)
				navigate('/mail')
			})
	}
	function saveToNote() {
		const newNote = noteService.getEmptyNote()
		newNote.info.title = mail.subject;
		newNote.info.txt = mail.body;
		newNote.info.url = mail.from;
		newNote.type = 'txt';
		noteService.save(newNote).then(() => {
		navigate('/note');
		});
	}

	useEffect(() => {
		loadMail()
		loadNextId()
		loadLastId()
	}, [mailId])

	if (!mail) return <h1>Loding...</h1>
	function onBack() {
		navigate('/mail')
	}

	function onNext() {
		if (nextMailId) {
			navigate(`/mail/${nextMailId}`)
		}
	}

	function onEdit() {
		navigate(`/mail/compose/${mail.id}`)
	}

	function onLast() {
		if (lastMailId) {
			navigate(`/mail/${lastMailId}`)
		}
	}

	return (
		<div className="mail-details">
			<div className="mail-details-top">
				<h2>{mail.subject}</h2>
				<div className="corner-detail-btns">
					<div className="tool-tip-button">
						<i className="fa-solid fa-arrow-left" onClick={() => onBack()}></i>
						<span className="tooltip">Go Back</span>
					</div>
					<div className="tool-tip-button">
						<i onClick={saveToNote} className="fa-regular fa-paper-plane save-note"></i>
						<span className="tooltip">Save note</span>
					</div>
				</div>
			</div>
			<div className="mail-details-top-container">
				<div>
					<p className="mail-details-from">From: {mail.from}</p>
					<p className="mail-details-to">To: {mail.to}</p>
				</div>
				<p>{new Date(mail.sentAt).toLocaleString()}</p>
			</div>
			<p>{mail.body}</p>
			<div className="mail-details-bottom">
				<div className="tool-tip-button">
					<i
						className="fa-solid fa-angle-left"
						onClick={() => {
							onLast()
						}}
					></i>

					<span className="tooltip">Last Mail</span>
				</div>
				<div className="tool-tip-button">
					<i
						className="fa-solid fa-angle-right"
						onClick={() => {
							onNext()
						}}
					></i>

					<span className="tooltip">Next Mail</span>
				</div>
				{mail.isDraft && (
					<button className="mail-details-edit" onClick={onEdit}>
						Edit
					</button>
				)}
			</div>
		</div>
	)
}
