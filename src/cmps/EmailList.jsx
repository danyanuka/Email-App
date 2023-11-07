import { EmailPreview } from "./EmailPreview";
import { Link } from "react-router-dom";

export function EmailList({
  emails,
  onRemoveEmail,
  onUpdateEmail,
  tab,
  checkedEmails,
  setCheckedEmails,
  onRemoveMany,
  onStarMany,
}) {
  function getEmailPath(email) {
    return email.sentAt
      ? `/email/${email.id}?tab=${tab}`
      : `/email/compose/${email.id}?tab=${tab}`;
  }

  return (
    <section className="email-list-container">
      <div className="list-head">
        <button onClick={onRemoveMany}>
          <img
            src="https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/delete_baseline_nv700_20dp.png"
            alt="trash"
          />
        </button>
        <button onClick={onStarMany}>
          <img
            src="	https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/star_baseline_nv700_20dp.png"
            alt="trash"
          />
        </button>
        <button>
          <img
            src="	https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/mail_baseline_nv700_20dp.png"
            alt="trash"
          />
        </button>
      </div>
      <ul className="email-ul">
        {emails.map((email) => (
          <li className="email-li" key={email.id}>
            <Link to={getEmailPath(email)}>
              <EmailPreview
                onRemoveEmail={onRemoveEmail}
                email={email}
                onUpdateEmail={onUpdateEmail}
                tab={tab}
                checkedEmails={checkedEmails}
                setCheckedEmails={setCheckedEmails}
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
