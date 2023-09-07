import { Link } from "react-router-dom";

export function EmailPreview({ email }) {
  return (
    <Link className="email-preview flex full-grow" to={`/email/${email.id}`}>
      <div style={{ width: "25%" }}>
        <h1>{email.from}</h1>
      </div>
      <div style={{ width: "25%" }}>
        <h1>{email.subject}</h1>
      </div>
      <div style={{ width: "25%" }}>
        <p>{email.body}</p>
      </div>
    </Link>
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
