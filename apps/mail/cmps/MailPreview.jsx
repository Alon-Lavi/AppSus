import { mailService } from "../services/mail.service.js";

export function MailPreview() {
  const mail = mailService.email; 

  return (
    <li>
      ID: {mail.id}<br />
      Subject: {mail.subject}<br />
      Body: {mail.body}<br />
      Is Read: {mail.isRead ? 'Yes' : 'No'}<br />
      Sent At: {new Date(mail.sentAt).toLocaleString()}<br />
      Removed At: {mail.removedAt ? new Date(mail.removedAt).toLocaleString() : 'Not removed'}<br />
      From: {mail.from}<br />
      To: {mail.to}<br />
    </li>
  );
}