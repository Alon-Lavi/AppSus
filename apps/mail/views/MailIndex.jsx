import { MailList } from '../cmps/MailList.jsx';
import { MailBoxFilter } from '../cmps/MailBoxFilter.jsx';
import { MailSearchFilter } from '../cmps/MailSearchFilter.jsx';
import { mailService } from '../services/mail.service.js';


const { useEffect, useState } = React;

export function MailIndex() {
  const [mails, setMails] = useState([]);

  useEffect(() => {
    loadMails();
  }, []);

  function loadMails() {
    mailService.query().then((mails) => setMails(mails));
  }

  return (
    <div>
      <MailBoxFilter />
      <MailSearchFilter />
      <MailList mails={mails} />
     
    </div>
  );
}
