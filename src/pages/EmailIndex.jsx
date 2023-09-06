import { useEffect, useRef, useState } from "react";
import { robotService } from "../services/robot.service";
import { EmailList } from "../cmps/EmailList";

export function EmailIndex() {
  const [emails, setEmails] = useState(null);

  useEffect(() => {
    loadEmails();
  }, []);

  async function loadEmails() {
    try {
      const emails = await robotService.query();
      setEmails(emails);
    } catch (err) {
      console.error("Had issued loading Emails", err);
    }
  }

  async function removeEmail(emailId) {
    try {
      await robotService.remove(emailId);
      setEmails((prevEmails) =>
        prevEmails.filter((email) => emailId !== email.id)
      );
    } catch (error) {}
  }

  if (!emails) return <div>Loading your Emails...</div>;
  return (
    <section className="email-index">
      <h1>Emails:</h1>

      <EmailList emails={emails} removeEmail={removeEmail} />
    </section>
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
