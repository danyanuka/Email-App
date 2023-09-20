import { EmailPreview } from "./EmailPreview";
import { Link } from "react-router-dom";

export function EmailList({ emails, onRemove, markAsRead, toggleStar }) {
  return (
    <ul className="email-ul">
      {emails.map((email) => (
        <li className="email-li" key={email.id}>
          <Link to={`/email/${email.id}`}>
            <EmailPreview
              onRemove={onRemove}
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
