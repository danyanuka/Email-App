import { useEffect, useState } from "react";
import {
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
// services
import { emailService } from "../services/email.service";
import { utilService } from "../services/util.service";
import { showUserMsg } from "../services/event-bus-service";
// comps
import { EmailList } from "../cmps/EmailList";
import { IndexNav } from "../cmps/IndexNav";
import { Aside } from "../cmps/Aside";

export function EmailIndex() {
  const [emails, setEmails] = useState(null);
  const [unreadEmailsCount, setUnreadEmailsCount] = useState(0);
  const [filterBy, setFilterBy] = useState({
    isRead: null,
    text: "",
    tab: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  const params = useParams();
  const navigate = useNavigate();

  // Sets the Tab to filterBy and triggers
  useEffect(() => {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, tab }));
  }, [searchParams]);

  useEffect(() => {
    loadEmails();
  }, [filterBy]);

  useEffect(() => {
    loadSetUnreadCount();
  }, [emails]);

  async function loadEmails() {
    try {
      const emails = await emailService.query(filterBy);

      setEmails(emails);
    } catch (err) {
      console.error("Had issues loading Emails", err);
    }
  }

  async function loadSetUnreadCount() {
    try {
      const count = await emailService.countUnreadEmails();
      setUnreadEmailsCount(count);
    } catch (error) {
      console.log("Couldnt load unread emails count", error);
    }
  }

  // Setting the State of the global filter
  function onSetFilter(fieldToUpdate) {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...fieldToUpdate }));
  }

  async function onRemoveEmail(emailId) {
    try {
      await emailService.remove(emailId);
      setEmails((prevEmails) =>
        prevEmails.filter((email) => emailId !== email.id)
      );

      showUserMsg({ type: "success", txt: "Email Removed" });
    } catch (error) {
      console.log("Email cannot be deleted ", error);
    }
  }

  // problems with the draft rendering! WIP
  async function onAddEmail(email) {
    try {
      email.sentAt = utilService.unixNow();
      const newEmail = await emailService.save(email);
      showUserMsg({ type: "success", txt: "Email Sent" });

      if (filterBy.tab === "sent") {
        setEmails((prevEmails) => [newEmail, ...prevEmails]);
      }
      if (filterBy.tab === "draft") {
        setEmails((prevEmails) =>
          prevEmails.filter((prevEmail) => prevEmail.id !== newEmail.id)
        );
      }
      navigate(`/email/?tab=${filterBy.tab}`);
    } catch (err) {
      console.log("Had issues adding Email,", err);
    }
  }

  // updating Starred and read properties
  async function onUpdateEmail(email) {
    const updatedEmail = await emailService.save(email);
    setEmails((prevEmail) =>
      prevEmail.map((email) =>
        email.id === updatedEmail.id ? updatedEmail : email
      )
    );
  }

  if (!emails) return <div>Loading your Emails...</div>;
  const { isRead, text } = filterBy;
  return (
    <div className="email-index-grid-container">
      <IndexNav filterBy={{ isRead, text }} onSetFilter={onSetFilter} />

      <section className="email-index-main">
        {!params.emailId && (
          <EmailList
            tab={filterBy.tab}
            emails={emails}
            onUpdateEmail={onUpdateEmail}
            onRemoveEmail={onRemoveEmail}
          />
        )}
        <Outlet context={{ onAddEmail, tab: filterBy.tab }} />
      </section>

      <Aside tab={filterBy.tab} unreadEmailsCount={unreadEmailsCount} />

      <footer className="footer">
        <section>robotRights 2023 &copy;</section>
      </footer>
    </div>
  );
}

// if theres problems with starred and read/unread thats the older solution
// async function markAsRead(emailToMark, eventFrom) {
//   try {
//     if (eventFrom === false) emailToMark.isRead = true;
//     else emailToMark.isRead = !emailToMark.isRead;
//     await emailService.save(emailToMark);

//     setEmails((prevEmails) =>
//       prevEmails.map((email) =>
//         email.id === emailToMark.id ? emailToMark : email
//       )
//     );
//   } catch (error) {}
// }

// async function toggleStar(emailToStar) {
//   try {
//     emailToStar.isStarred = !emailToStar.isStarred;
//     await emailService.save(emailToStar);

//     setEmails((prevEmails) =>
//       prevEmails.map((email) =>
//         email.id === emailToStar.id ? emailToStar : email
//       )
//     );
//   } catch (error) {}
// }
