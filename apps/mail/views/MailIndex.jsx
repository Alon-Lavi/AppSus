import { MailList } from '../cmps/MailList.jsx';
import { MailBoxFilter } from '../cmps/MailBoxFilter.jsx';
import { MailSearchFilter } from '../cmps/MailSearchFilter.jsx';
import { mailService } from '../services/mail.service.js';


const { useEffect, useState } = React;

export function MailIndex() {
  const [mails, setMails] = useState([]);
  const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter());

  useEffect(() => {
    loadMails();
  }, [filterBy]);

  function onHandleDelete(mailId) {
    mailService.deleteToTrash(mailId).then((mail) => {
      setMails((prevData) => [...prevData.filter((mail) => mail.id !== mailId)]);
    });
  }


  function onHandleStar(mail) {
    const updatedMail = { ...mail, isStared: !mail.isStared };
    mailService.save(updatedMail).then((updated) => {
      setMails((prevMails) => prevMails.map((mail) => (mail.id === updated.id ? updated : mail)));
      console.log(`Mail (${updated.id}) updated:`, updated);
    });
  }

  function loadMails() {
    mailService.query().then((mails) => setMails(mails));
  }

  function onSetFilter(filterBy) {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterBy }));
  }
  return (
    <div>
      <MailBoxFilter onSetFilter={onSetFilter} filterBy={filterBy} />
      <MailSearchFilter onSetFilter={onSetFilter} filterBy={filterBy} />
      <MailList mails={mails} onHandleDelete={onHandleDelete} onHandleStar={onHandleStar} />
    </div>
  );
}
