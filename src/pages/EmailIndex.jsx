import { useEffect, useState } from "react";
import {
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { emailService } from "../services/email.service";
import { EmailList } from "../cmps/EmailList";
import { ComposeEmail } from "../cmps/ComposeEmail";
import { IndexNav } from "../cmps/IndexNav";
import { Aside } from "../cmps/Aside";

export function EmailIndex() {
  const [emails, setEmails] = useState(null);
  const [filterBy, setFilterBy] = useState({
    isRead: null,
    text: "",
    subject: "",
    isStarred: false,
    sentAt: null,
    tab: "inbox",
  });

  const [queryParams, setQueryParams] = useSearchParams();

  useEffect(() => {
    const tab = queryParams.get("tab");
    if (params.emailId) {
      setFilterBy({ ...filterBy, tab: "inbox" });
      return;
    }
    setFilterBy({ ...filterBy, tab });
  }, [queryParams]);
  // const [isComposeModal, setComposeModal] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadEmails();
  }, [filterBy]);

  //
  // Setting the State of the global filter
  function onSetFilter(fieldToUpdate) {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...fieldToUpdate }));
  }

  // Sets State From storage
  async function loadEmails() {
    try {
      const emails = await emailService.query(filterBy);
      setEmails(emails);
      console.log("From Index (LoadEmails)", emails);
    } catch (err) {
      console.error("Had issued loading Emails", err);
    }
  }

  // Delete Email
  async function onRemove(emailId) {
    try {
      await emailService.remove(emailId);
      setEmails((prevEmails) =>
        prevEmails.filter((email) => emailId !== email.id)
      );
    } catch (error) {
      console.log("Email cannot be deleted ", error);
    }
  }

  async function onAddEmail(email) {
    const newEmail = await emailService.save(email);
    navigate("/email?tab=inbox");
  }

  async function markAsRead(emailToMark, eventFrom) {
    try {
      if (eventFrom === false) emailToMark.isRead = true;
      else emailToMark.isRead = !emailToMark.isRead;
      await emailService.save(emailToMark);

      setEmails((prevEmails) =>
        prevEmails.map((email) =>
          email.id === emailToMark.id ? emailToMark : email
        )
      );
    } catch (error) {}
  }

  async function toggleStar(emailToStar) {
    try {
      emailToStar.isStarred = !emailToStar.isStarred;
      await emailService.save(emailToStar);

      setEmails((prevEmails) =>
        prevEmails.map((email) =>
          email.id === emailToStar.id ? emailToStar : email
        )
      );
    } catch (error) {}
  }

  // Conditional render - IF theres data, render it
  if (!emails) return <div>Loading your Emails...</div>;
  return (
    <div className="email-index-grid-container">
      {/* ------------------------------------------------------------------------------------- */}
      <IndexNav filterBy={filterBy} onSetFilter={onSetFilter} />
      {/* ------------------------------------------------------------------------------------- */}
      <section className="email-index-main">
        {!params.emailId && (
          <EmailList
            emails={emails}
            onRemove={onRemove}
            markAsRead={markAsRead}
            toggleStar={toggleStar}
          />
        )}
        <Outlet context={onAddEmail} />
      </section>

      {/* ------------------------------------------------------------------------------------- */}
      <Aside />
      {/* ------------------------------------------------------------------------------------- */}
      <footer className="footer">
        <section>robotRights 2023 &copy;</section>
      </footer>
    </div>
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

//
