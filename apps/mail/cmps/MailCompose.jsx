import { mailService } from '../services/mail.service.js'

const { useParams, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React

export function MailCompose({ setShowCompose }) {
	const [mail, setMail] = useState(null)
	const { mailId } = useParams()
	const navigate = useNavigate()
	const now = new Date()
	const timestamp = now.getTime()

	const [formData, setFormData] = useState({
		from: 'user@appsus.com',
		to: '',
		subject: '',
		body: '',
		sentAt: timestamp,
		isSent: true,
		isRead: true,
		isDraft: false,
	})

	useEffect(() => {
		if (mailId) {
			loadMail()
		}
	}, [])

	function loadMail() {
		mailService
			.get(mailId)
			.then((mail) => {
				setMail(mail)

				setFormData({
					from: mail.from,
					to: mail.to,
					subject: mail.subject,
					body: mail.body,
					sentAt: mail.sentAt,
					isSent: mail.isSent,
					isRead: mail.isRead,
					isDraft: mail.isDraft,
				})
			})

			.catch((err) => {
				console.log("Sorry couldn't find the requested mail", err)
				navigate('/mail')
			})
	}

	function handleChange(event) {
		const { name, value } = event.target

		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}))
	}

	function handleCancel(event) {
		event.preventDefault()

		if (!mail) {
			const updatedFormData = {
				...formData,
				isDraft: true,
				isSent: false,
			}

			setFormData(updatedFormData)
			mailService.save(updatedFormData).then(() => setShowCompose(false))
		} else {
			const updatedMail = {
				...mail,
				...formData,
				isDraft: true,
				isSent: false,
			}

			mailService.save(updatedMail).then(() => navigate('/mail'))
		}
	}

	function handleSubmit(event) {
		event.preventDefault()

		const updatedFormData = {
			...formData,
			sentAt: timestamp,
			isDraft: false,
			isSent: true,
		}

		if (mail) {
			mailService.save(updatedFormData).then(() => navigate(`/mail`))
		} else {
			mailService.save(updatedFormData).then(() => setShowCompose(false))
		}
	}

	return (
		<form className="compose-container" onSubmit={handleSubmit}>
			<div>
				<div className="header-cmp">
					<label>{mail ? 'Edit Message' : 'New Message'}</label>

					<button onClick={handleCancel} className="close-button">
						&#8617;
					</button>
				</div>

				<div className="compose-subject">
					<input
						className="compose-item"
						type="text"
						id="to"
						name="to"
						value={formData.to}
						onChange={handleChange}
						placeholder="To"
					/>

					<input
						type="text"
						className="compose-item"
						id="subject"
						name="subject"
						value={formData.subject}
						onChange={handleChange}
						placeholder="Subject"
					/>
				</div>
			</div>

			<p className="compose-text-area">
				<textarea id="body" name="body" value={formData.body} onChange={handleChange} />
			</p>

			<button type="submit" className="compose-submit">
				Send <i className="fa-regular fa-envelope"></i>
			</button>
		</form>
	)
}
