import { useEffect, useRef, useState } from "react";
import { robotService } from "../services/robot.service";
import { EmailList } from "../cmps/EmailList";
import { ComposeEmail } from "../cmps/ComposeEmail";

export function EmailIndex() {
  const [emails, setEmails] = useState(null);
  const [isCompose, setCompose] = useState(false);

  useEffect(() => {
    loadEmails();
  }, []);

  // Sets State From storage
  async function loadEmails() {
    try {
      const emails = await robotService.query();
      setEmails(emails);
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

  // Conditional render - IF theres data, render it
  if (!emails) return <div>Loading your Emails...</div>;
  return (
    <section className="email-index">
      <h1>Emails:</h1>
      <button onClick={() => setCompose(true)}>Compose Email</button>

      <EmailList emails={emails} onRemove={onRemove} />
      {/* render Compose Email Modal */}
      {isCompose && (
        <ComposeEmail isCompose={isCompose} setCompose={setCompose} />
      )}
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

// {/* Conditionaly Rendering the WatcherModal if Null Not rendered */}
// {selectedWatcher && (
//   <WatcherModal
//     selectedWatcher={selectedWatcher}
//     setSelectedWatcher={setSelectedWatcher}