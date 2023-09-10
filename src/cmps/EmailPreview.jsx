import { Link } from "react-router-dom";

export function EmailPreview({ email, MarkAsRead }) {
  const dynClassColor = email.isRead ? "AliceBlue" : "white";
  const CustomTag = email.isRead ? `h4` : "h1";

  return (
    <Link
      style={{ backgroundColor: dynClassColor }}
      onClick={() => MarkAsRead(email)}
      className="email-preview flex full-grow"
      to={`/email/${email.id}`}
    >
      <div className="w25">
        <CustomTag>{email.from}</CustomTag>
      </div>
      <div className="w25">
        <CustomTag>{email.subject}</CustomTag>
      </div>
      <div className="w25">
        <p>
          {email.body && email.body.length > 20
            ? `${email.body.slice(0, 39)}...`
            : email.body}
        </p>
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
