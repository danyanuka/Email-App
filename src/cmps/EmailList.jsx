import { EmailPreview } from "./EmailPreview";
import { Link } from "react-router-dom";

export function EmailList({ emails, onRemoveEmail, onUpdateEmail, tab }) {
  function getEmailPath(email) {
    return email.sentAt
      ? `/email/${email.id}?tab=${tab}`
      : `/email/compose/${email.id}?tab=${tab}`;
  }

  return (
    <ul className="email-ul">
      {emails.map((email) => (
        <li className="email-li" key={email.id}>
          <Link to={getEmailPath(email)}>
            <EmailPreview
              onRemoveEmail={onRemoveEmail}
              email={email}
              onUpdateEmail={onUpdateEmail}
              tab={tab}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
