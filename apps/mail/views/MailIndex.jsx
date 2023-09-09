import { MailList } from '../cmps/MailList.jsx'
import { MailBoxFilter } from '../cmps/MailBoxFilter.jsx'
import { MailSearchFilter } from '../cmps/MailSearchFilter.jsx'
import { mailService } from '../services/mail.service.js'
import { MailCompose } from '../cmps/MailCompose.jsx'

const { useEffect, useState } = React

export function MailIndex() {
	const [mails, setMails] = useState([])
	const [showCompose, setShowCompose] = useState(false)
	const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

	useEffect(() => {
		loadMails()
	}, [filterBy])

	function onHandleDelete(mailId) {
		mailService.deleteToTrash(mailId).then((mail) => {
			setMails((prevData) => [...prevData.filter((mail) => mail.id !== mailId)])
		})
	}

	function onHandleStar(mail) {
		const updatedMail = { ...mail, isStared: !mail.isStared }
		mailService.save(updatedMail).then((updated) => {
			setMails((prevMails) => prevMails.map((mail) => (mail.id === updated.id ? updated : mail)))
		})
	}

	function loadMails() {
		mailService.query(filterBy).then((mails) => setMails(mails))
	}

	function onSetFilter(filterBy) {
		setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterBy }))
	}

	return (
		<section className="mail-index">
			<div className="mobile-container">
				<div className="compose-filter-box-container">
					<button onClick={() => setShowCompose((prevState) => !prevState)} className="compose-btn">
						<i className="fa-solid fa-pen"></i>
						Compose
					</button>

					<MailBoxFilter onSetFilter={onSetFilter} filterBy={filterBy} />
				</div>

				<div className="search-list-container">
					<MailSearchFilter onSetFilter={onSetFilter} filterBy={filterBy} />
					<MailList mails={mails} onHandleDelete={onHandleDelete} onHandleStar={onHandleStar} />
				</div>
			</div>

			{showCompose && <MailCompose setShowCompose={setShowCompose} />}
		</section>
	)
}
