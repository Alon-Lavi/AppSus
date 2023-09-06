// mail service
import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async-storage.service.js';

const EMAIL_KEY = 'emailDB';
_createEmails();



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
  };

const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'React Appsus',
};


function query(filterBy = {}) {
    return storageService.query(EMAIL_KEY).then((mails) => {
      if (filterBy.txt) {
        const filterText = filterBy.txt.toLowerCase();
        return mails.filter(
          (mail) =>
            mail.subject.toLowerCase().includes(filterText) ||
            mail.body.toLowerCase().includes(filterText) ||
            mail.from.toLowerCase().includes(filterText)
        );
      } else {
        return mails;
      }
    });
  }
  
  function get(mailId) {
    return storageService.get(EMAIL_KEY, mailId);
    // return axios.get(CAR_KEY, carId)
  }
  
  function remove(mailId) {
    return storageService.remove(EMAIL_KEY, mailId);
  }
  function deleteToTrash(mailId) {
    return storageService.query(EMAIL_KEY).then((mails) => {
      const toTrashMail = mails.find((mail) => mail.id === mailId);
      if (!toTrashMail.removedAt) {
        toTrashMail.removedAt = new Date();
        return storageService.put(EMAIL_KEY, toTrashMail);
      }
      remove(mailId);
    });
  }
  function updateIsRead(mail) {
    mail.isRead = true;
    return storageService.put(EMAIL_KEY, mail);
  }
  function save(mail) {
    return storageService
      .query(EMAIL_KEY)
      .then((mails) => {
        const existingMail = mails.find((item) => item.id === mail.id);
        if (existingMail) {
          return storageService.put(EMAIL_KEY, mail);
        } else {
          return storageService.post(EMAIL_KEY, mail);
        }
      })
      .catch((error) => {
        console.error('Error while saving email:', error);
      });
  }
  
  function getDefaultFilter(change) {
    const defaultFilter = { status: '', txt: '', isRead: '', isStared: '', lables: [], isDraft: false, removedAt: false, isSent: false };
    return { ...defaultFilter, ...change };
  }
  
  function getNextMailId(mailId) {
    return storageService.query(EMAIL_KEY).then((mails) => {
      let mailIdx = mails.findIndex((mail) => mail.id === mailId);
      if (mailIdx === mails.length - 1) mailIdx = -1;
      return mails[mailIdx + 1].id;
    });
  }

  function getLastMailId(mailId) {
    return storageService.query(EMAIL_KEY).then((mails) => {
      let mailIdx = mails.findIndex((mail) => mail.id === mailId);
      if (mailIdx === 0) mailIdx = mails.length;
      return mails[mailIdx - 1].id;
    });
  }

  

  function _createEmails() {
    clearStorage()
    let emails = utilService.loadFromStorage(EMAIL_KEY) || [];
  
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
          body: "Hello, we have a meeting scheduled for tomorrow at 10 am. Please come prepared.",
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
          body: "We're excited to announce the latest product update. Check out the new features and improvements!"    ,
          isRead: true,
          sentAt: 1665459200000,
          removedAt: null,
          from: "updates@company.com",
          to: 'user@appsus.com',
          },
          {
          id: 'e106',
          subject: "Job Opportunity",
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
          body:"Thank you for your recent purchase. We appreciate your business and look forward to serving you again.",
          isRead: false,
          sentAt: 1623459200000,
          removedAt: null,
          from: 'support@company.com',
          to: 'user@appsus.com',
          },
    ];

        utilService.saveToStorage(EMAIL_KEY, emails);
      }
    }
function clearStorage() {
  localStorage.removeItem(EMAIL_KEY);
}
  