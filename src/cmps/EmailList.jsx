import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails, onRemove, onOpen }) {
  return (
    <ul className="email-ul">
      {emails.map((email) => (
        <li className="email-li flex" key={email.id}>
          <EmailPreview email={email} />

          <button
            className="simple-button removeBtn"
            onClick={() => {
              onRemove(email.id);
            }}
          >
            X
          </button>
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
