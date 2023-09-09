// mail service
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const EMAIL_KEY = 'emailDB'
_createEmails()

const loggedinUser = {
	email: 'user@appsus.com',
	fullname: 'React Appsus',
}

export const mailService = {
	query,
	get,
	remove,
	save,
	getDefaultFilter,
	getNextMailId,
	getLastMailId,
	deleteToTrash,
	updateIsRead,
	clearStorage,
}

function query(filterBy = {}) {
	return storageService.query(EMAIL_KEY).then((mails) => {
		if (filterBy.txt) {
			const filterText = filterBy.txt.toLowerCase()
			mails = mails.filter(
				(mail) =>
					mail.subject.toLowerCase().includes(filterText) ||
					mail.body.toLowerCase().includes(filterText) ||
					mail.from.toLowerCase().includes(filterText)
			)
		}
		if (filterBy.isRead) {
			mails = mails.filter((mail) => mail.isRead)
		}
		if (filterBy.isSent) {
			mails = mails.filter((mail) => mail.isSent)
		}
		if (!filterBy.isSent) {
			mails = mails.filter((mail) => !mail.isSent)
		}
		if (filterBy.isStared) {
			mails = mails.filter((mail) => mail.isStared)
		}
		if (filterBy.isDraft) {
			mails = mails.filter((mail) => mail.isDraft)
		}
		if (filterBy.isDraft === false) {
			mails = mails.filter((mail) => !mail.isDraft)
		}
		if (!filterBy.removedAt) {
			mails = mails.filter((mail) => !mail.removedAt)
		}
		if (filterBy.removedAt) {
			mails = mails.filter((mail) => mail.removedAt)
		}

		mails.sort((mail1, mail2) => mail2.sentAt - mail1.sentAt)

		return mails
	})
}

function get(mailId) {
	return storageService.get(EMAIL_KEY, mailId)
}

function remove(mailId) {
	return storageService.remove(EMAIL_KEY, mailId)
}

function deleteToTrash(mailId) {
	return storageService.query(EMAIL_KEY).then((mails) => {
		const toTrashMail = mails.find((mail) => mail.id === mailId)

		if (!toTrashMail.removedAt) {
			toTrashMail.removedAt = new Date()
			return storageService.put(EMAIL_KEY, toTrashMail)
		}

		remove(mailId)
	})
}

function updateIsRead(mail) {
	mail.isRead = true
	return storageService.put(EMAIL_KEY, mail)
}

function save(mail) {
	return storageService
		.query(EMAIL_KEY)
		.then((mails) => {
			const existingMail = mails.find((item) => item.id === mail.id)
			if (existingMail) {
				return storageService.put(EMAIL_KEY, mail)
			} else {
				return storageService.post(EMAIL_KEY, mail)
			}
		})
		.catch((error) => {
			console.error('Error while saving email:', error)
		})
}

function getDefaultFilter(change) {
	const defaultFilter = {
		status: '',
		txt: '',
		isRead: '',
		isStared: '',
		labels: [],
		isDraft: false,
		removedAt: false,
		isSent: false,
	}
	return { ...defaultFilter, ...change }
}

function getNextMailId(mailId) {
	return storageService.query(EMAIL_KEY).then((mails) => {
		let mailIdx = mails.findIndex((mail) => mail.id === mailId)
		if (mailIdx === mails.length - 1) mailIdx = -1
		return mails[mailIdx + 1].id
	})
}

function getLastMailId(mailId) {
	return storageService.query(EMAIL_KEY).then((mails) => {
		let mailIdx = mails.findIndex((mail) => mail.id === mailId)
		if (mailIdx === 0) mailIdx = mails.length
		return mails[mailIdx - 1].id
	})
}

function _createEmails() {
	let emails = utilService.loadFromStorage(EMAIL_KEY) || []

	if (!emails || !emails.length) {
		emails = [
			{
				id: 'e101',
				subject: 'Miss you!',
				body: 'Would loveeeeeeeee to catch up sometimes',
				isRead: false,
				sentAt: 1551133930594,
				removedAt: null,
				from: 'momo@momo.com',
				to: 'user@appsus.com',
			},
			{
				id: 'e102',
				subject: 'Reminder: Meeting Tomorrow',
				body: 'Just a friendly reminder that we have a meeting scheduled for tomorrow at 10am. Please come prepared with any necessary materials.',
				isRead: true,
				sentAt: 1620662400000,
				removedAt: null,
				from: 'manager@company.com',
				to: 'user@appsus.com',
			},
			{
				id: 'e103',
				subject: 'Meeting Tomorrow',
				body: 'Hello, we have a meeting scheduled for tomorrow at 10 am. Please come prepared.',
				isRead: false,
				sentAt: 1643011200000,
				removedAt: null,
				from: 'manager@company.com',
				to: 'user@appsus.com',
			},
			{
				id: 'e104',
				subject: 'Party Invitation',
				body: "You're invited to our office party next Friday. Join us for a night of fun and celebration!",
				isRead: false,
				sentAt: 1663459200000,
				removedAt: null,
				from: 'events@company.com',
				to: 'user@appsus.com',
			},
			{
				id: 'e105',
				subject: 'Product Update',
				body: "We're excited to announce the latest product update. Check out the new features and improvements!",
				isRead: true,
				sentAt: 1665459200000,
				removedAt: null,
				from: 'updates@company.com',
				to: 'user@appsus.com',
			},
			{
				id: 'e106',
				subject: 'Job Opportunity',
				body: 'We have a job opening that matches your skills and experience. Would you like to apply?',
				isRead: false,
				sentAt: 1673459200000,
				removedAt: null,
				from: 'hr@company.com',
				to: 'user@appsus.com',
			},
			{
				id: 'e107',
				subject: 'Thank You"',
				body: 'Thank you for your recent purchase. We appreciate your business and look forward to serving you again.',
				isRead: false,
				sentAt: 1623459200000,
				removedAt: null,
				from: 'support@company.com',
				to: 'user@appsus.com',
			},
			{
				id: 'e108',
				subject: 'Important Announcement',
				body: 'We have an important announcement to share with you. Please read this message for more details.',
				isRead: false,
				sentAt: 1673459200000,
				removedAt: null,
				from: 'announcement@company.com',
				to: 'user@appsus.com',
			},
			{
				id: 'e109',
				subject: 'Weekly Newsletter',
				body: 'Here is your weekly newsletter with updates, news, and articles.',
				isRead: true,
				sentAt: 1674459200000,
				removedAt: null,
				from: 'newsletter@company.com',
				to: 'user@appsus.com',
			},
			{
				id: 'e110',
				subject: 'Meeting Reminder',
				body: 'Just a reminder that we have a meeting scheduled for this week. Please make sure to attend.',
				isRead: false,
				sentAt: 1675459200000,
				removedAt: null,
				from: 'manager@company.com',
				to: 'user@appsus.com',
			},
			{
				id: 'e111',
				subject: 'New Job Opportunity',
				body: 'We have a new job opportunity that matches your skills and experience. Would you like to apply?',
				isRead: false,
				sentAt: 1676459200000,
				removedAt: null,
				from: 'hr@company.com',
				to: 'user@appsus.com',
			},
			{
				id: 'e112',
				subject: 'Thank You for Your Feedback',
				body: 'Thank you for providing feedback on our products and services. We appreciate your input.',
				isRead: true,
				sentAt: 1677459200000,
				removedAt: null,
				from: 'feedback@company.com',
				to: 'user@appsus.com',
			},
		]

		utilService.saveToStorage(EMAIL_KEY, emails)
	}
}

function clearStorage() {
	localStorage.removeItem(EMAIL_KEY)
}
