import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails, removeEmail }) {
  return (
    <ul className="list-ul">
      {emails.map((email) => (
        <li key={email.id}>
          <EmailPreview email={email} />
          <hr className="hr-list-lines"></hr>

          <button
            onClick={() => {
              removeEmail(email.id);
            }}
            className="simple-button"
          >
            X
          </button>
          <button>Open</button>
        </li>
      ))}
    </ul>
  );
}
// id: "e101",
//         subject: "Miss you!",
//         body: "Would love to catch up sometimes",
//         isRead: false,
//         isStarred: false,
//         sentAt: 1551133930594,
//         removedAt: null, //for later use
//         from: "momo@momo.com",
//         to: "user@appsus.com",
