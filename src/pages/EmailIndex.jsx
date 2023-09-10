import { useEffect, useRef, useState } from "react";
import { robotService } from "../services/robot.service";
import { EmailList } from "../cmps/EmailList";
import { ComposeEmail } from "../cmps/ComposeEmail";

export function EmailIndex() {
  const [emails, setEmails] = useState(null);
  const [filterBy, setFilterBy] = useState();
  const [isCompose, setCompose] = useState(false);

  useEffect(() => {
    loadEmails();
  }, []);

  // Sets State From storage
  async function loadEmails() {
    try {
      const emails = await robotService.query();
      setEmails(emails);
      console.log(emails);
    } catch (err) {
      console.error("Had issued loading Emails", err);
    }
  }

  // Delete Email
  async function onRemove(emailId) {
    try {
      await robotService.remove(emailId);
      setEmails((prevEmails) =>
        prevEmails.filter((email) => emailId !== email.id)
      );
    } catch (error) {
      console.log("Email cannot be deleted ", error);
    }
  }

  async function MarkAsRead(emailToMark) {
    try {
      emailToMark.isRead = true;
      await robotService.save(emailToMark);
      const updatedEmail = emails.map((email) => {
        if (email.id === emailToMark.id) {
          return { ...email, isRead: true };
        } else return email;
      });
      setEmails(updatedEmail);
      console.log(updatedEmail);
    } catch (error) {}
  }

  // Conditional render - IF theres data, render it
  if (!emails) return <div>Loading your Emails...</div>;
  return (
    <>
      <button className="compose-btn" onClick={() => setCompose(true)}>
        Compose
      </button>
      <section className="email-index">
        <EmailList
          emails={emails}
          onRemove={onRemove}
          MarkAsRead={MarkAsRead}
        />
        {/* render Compose Email Modal */}
        {isCompose && (
          <ComposeEmail isCompose={isCompose} setCompose={setCompose} />
        )}
      </section>
    </>
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

// {/* Conditionaly Rendering the WatcherModal if Null Not rendered */}
// {selectedWatcher && (
//   <WatcherModal
//     selectedWatcher={selectedWatcher}
//     setSelectedWatcher={setSelectedWatcher}
