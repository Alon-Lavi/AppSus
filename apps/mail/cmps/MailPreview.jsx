import { utilService } from '../../../services/util.service.js';
import { mailService } from '../services/mail.service.js';


const { useState } = React;
const { Link } = ReactRouterDOM;

export function MailPreview({ mail, onHandleDelete, onHandleStar }) {
  const [hover, setHover] = useState(false);
  const timestamp = mail.sentAt;
 

  return (
    <li
      className={`mail-item ${mail.isRead ? 'mail-read' : ''} ${hover ? 'list-item-hover' : ''}`}
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseOut={() => {
        setHover(false);
      }}
    >
      {mail.isStared ? (
        <i className="fa-solid fa-star golden-star" onClick={() => onHandleStar(mail)}></i>
      ) : (
        <i className="fa-regular fa-star mail-star" onClick={() => onHandleStar(mail)}></i>
      )}
      <Link to={`/mail/${mail.id}`} className="mail-link">
        <div className="mail-index-from">{mail.from}</div>
        <div className="mail-index-subject">{mail.subject}</div>

        {!hover && <div className="mail-date"></div>}
      </Link>
      {hover && (
        <i className="fa-regular fa-trash-can mail-trash" onClick={() => onHandleDelete(mail.id)}></i>
      )}
    </li>
  );
}
