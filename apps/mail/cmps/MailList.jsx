import { MailPreview } from './MailPreview.jsx';

export function MailList({ mails, onHandleDelete, onHandleStar }) {
  return (
    <ul>
      {mails.map((mail) => {
        return <MailPreview key={mail.id} mail={mail} onHandleDelete={onHandleDelete} onHandleStar={onHandleStar} />
      })}
    </ul>
  );
}