import { EmailPreview } from "./EmailPreview";
import { Link } from "react-router-dom";

export function EmailList({
  emails,
  onRemoveEmail,
  markAsRead,
  toggleStar,
  tab,
}) {
  return (
    <ul className="email-ul">
      {emails.map((email) => (
        <li className="email-li" key={email.id}>
          <Link
            to={
              email.sentAt !== null
                ? `/email/${email.id}?tab=${tab}`
                : `/email/compose/${email.id}?tab=${tab}`
            }
          >
            <EmailPreview
              onRemoveEmail={onRemoveEmail}
              email={email}
              markAsRead={markAsRead}
              toggleStar={toggleStar}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
