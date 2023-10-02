import { useEffect, useState } from "react";
import {
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { emailService } from "../services/email.service";
import { utilService } from "../services/util.service";
import { EmailList } from "../cmps/EmailList";
import { IndexNav } from "../cmps/IndexNav";
import { Aside } from "../cmps/Aside";
import { eventBusService, showUserMsg } from "../services/event-bus-service";

export function EmailIndex() {
  const [emails, setEmails] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams({ tab: "" });
  const tab = searchParams.get("tab");
  const [filterBy, setFilterBy] = useState({
    isRead: null,
    text: "",
    tab: "",
  });
  const params = useParams();
  const navigate = useNavigate();
  const [unreadEmails, setUnreadEmails] = useState(0);

  // Sets the Tab to filterBy and triggers
  useEffect(() => {
    setFilterBy({ ...filterBy, tab });
  }, [searchParams]);

  useEffect(() => {
    loadEmails();
  }, [filterBy]);

  useEffect(() => {
    unreadCount();
  }, [emails]);

  async function loadEmails() {
    try {
      const emails = await emailService.query(filterBy);

      setEmails(emails);
    } catch (err) {
      console.error("Had issues loading Emails", err);
    }
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

  async function onAddEmail(email) {
    try {
      email.sentAt = utilService.unixNow();
      const newEmail = await emailService.save(email);
      showUserMsg({ type: "success", txt: "Email Added" });
      if (filterBy.tab === "sent" && "draft") {
        setEmails((prevEmails) => [newEmail, ...prevEmails]);
      }
      navigate(`/email/?tab=${filterBy.tab}`);
    } catch (err) {
      console.log("Had issues adding Email,", err);
    }
  }

  // Setting the State of the global filter
  function onSetFilter(fieldToUpdate) {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...fieldToUpdate }));
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

  //  checks the number of unread emails
  function unreadCount() {
    if (!emails || filterBy.tab !== "inbox") return;
    const propertyToCheck = "isRead";
    const count = emails.reduce((accumulator, currentEmaill) => {
      if (currentEmaill[propertyToCheck] === false) {
        return accumulator + 1;
      }
      return accumulator;
    }, 0);

    setUnreadEmails(count);
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
            // markAsRead={markAsRead}
            // toggleStar={toggleStar}
          />
        )}
        <Outlet context={{ onAddEmail, tab: filterBy.tab }} />
      </section>

      <Aside tab={filterBy.tab} unreadEmails={unreadEmails} />

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
