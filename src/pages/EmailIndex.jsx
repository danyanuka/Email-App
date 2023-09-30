import { useEffect, useState } from "react";
import {
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { emailService } from "../services/email.service";
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

  // Sets the Tab to filterBy and triggers
  useEffect(() => {
    setFilterBy({ ...filterBy, tab });
  }, [searchParams]);

  useEffect(() => {
    loadEmails();
  }, [filterBy]);

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
      // eventBusService.emit("show-user-msg", {
      //   type: "success",
      //   txt: "Email Removed",

      // });

      showUserMsg({ type: "success", txt: "Email Removed" });
    } catch (error) {
      console.log("Email cannot be deleted ", error);
    }
  }

  async function onAddEmail(email) {
    try {
      const newEmail = await emailService.save(email);
      showUserMsg({ type: "success", txt: "Email Added" });
      // if (filterBy.tab === "sent")
      // setEmails((prevEmails) => [newEmail, ...prevEmails]); works but adds any email to inbox until refresh, when draft is sent weird error.
      loadEmails();
      {
        /*  works but doesnt trigger a re render, needs a refresh  */
      }

      navigate(`/email/?tab=${filterBy.tab}`);
      {
        /*  works but doesnt trigger a re render, needs a refresh  */
      }
    } catch (err) {
      console.log("Had issues adding Email,", err);
    }
  }

  // Setting the State of the global filter
  function onSetFilter(fieldToUpdate) {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...fieldToUpdate }));
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

  const { isRead, text } = filterBy;
  return (
    <div className="email-index-grid-container">
      {/* ------------------------------------------------------------------------------------- */}
      <IndexNav filterBy={{ isRead, text }} onSetFilter={onSetFilter} />
      {/* ------------------------------------------------------------------------------------- */}
      <section className="email-index-main">
        {!params.emailId && (
          <EmailList
            tab={filterBy.tab}
            emails={emails}
            onRemoveEmail={onRemoveEmail}
            markAsRead={markAsRead}
            toggleStar={toggleStar}
          />
        )}
        <Outlet context={{ onAddEmail, tab: filterBy.tab }} />
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
