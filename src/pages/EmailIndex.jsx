import { useEffect, useState } from "react";
import { useEffectUpdate } from "../hooks/useEffectUpdate";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [emails, setEmails] = useState(null);
  const [unreadEmailsCount, setUnreadEmailsCount] = useState(0);
  const [filterBy, setFilterBy] = useState(
    emailService.getFilterFromParams(searchParams)
  );
  const [checkedEmails, setCheckedEmails] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const tab = searchParams.get("tab");

  const params = useParams();
  const navigate = useNavigate();

  // WIP/ right now on the selected items functionallity, isRead not done yet.
  // also theres a bug where the checkMarks is not removed when an action is done.
  //

  // Sets the Tab to filterBy and triggers
  useEffect(() => {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, tab }));
  }, [searchParams]);

  useEffect(() => {
    setSearchParams(filterBy);
    loadEmails();
  }, [filterBy]);

  useEffect(() => {
    loadSetUnreadCount();
  }, [emails]);

  async function loadEmails() {
    try {
      setIsLoading(true);
      const emails = await emailService.query(filterBy);
      setIsLoading(false);
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

  async function onRemoveEmail(removedEmail) {
    try {
      if (!removedEmail.removedAt) {
        removedEmail.removedAt = utilService.unixNow();
        await emailService.save(removedEmail);
        showUserMsg({ type: "success", txt: "Email removed to trash" });
      } else {
        await emailService.remove(removedEmail.id);
        showUserMsg({ type: "success", txt: "Email deleted permanently" });
      }
      setEmails((prevEmails) =>
        prevEmails.filter((email) => removedEmail.id !== email.id)
      );
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

  async function onUpdateEmail(email) {
    const updatedEmail = await emailService.save(email);
    setEmails((prevEmail) =>
      prevEmail.map((email) =>
        email.id === updatedEmail.id ? updatedEmail : email
      )
    );
    return updatedEmail;
  }

  // Selected Items By checkbox actions

  async function onRemoveMany() {
    try {
      const updatedEmails = checkedEmails.map((email) => {
        email.removedAt = utilService.unixNow();
        return email;
      });
      console.log("onRemoveMany :", updatedEmails);
      await emailService.updateMany(updatedEmails);
      showUserMsg({ type: "success", txt: "Emails removed to trash" });
      setCheckedEmails([]);
      setEmails((prevEmails) =>
        prevEmails.filter(
          (email) => !updatedEmails.some((toRemove) => toRemove.id === email.id)
        )
      );
    } catch {}
  }

  async function onStarMany() {
    try {
      const updatedEmails = checkedEmails.map((email) => {
        email.isStarred = true;
        return email;
      });
      await emailService.updateMany(updatedEmails);
      showUserMsg({ type: "success", txt: "Emails starred" });
      setCheckedEmails([]);
    } catch (error) {}
  }

  console.log(checkedEmails);
  if (!emails) return <div>Loading your Emails...</div>;
  const { isRead, text } = filterBy;
  return (
    <div className="email-index-grid-container">
      <IndexNav filterBy={{ isRead, text }} onSetFilter={onSetFilter} />

      <section className="email-index-main">
        {!params.emailId && !isLoading && (
          <EmailList
            tab={filterBy.tab}
            emails={emails}
            onUpdateEmail={onUpdateEmail}
            onRemoveEmail={onRemoveEmail}
            checkedEmails={checkedEmails}
            setCheckedEmails={setCheckedEmails}
            onRemoveMany={onRemoveMany}
            onStarMany={onStarMany}
          />
        )}

        <Outlet context={{ onUpdateEmail, onAddEmail, tab: filterBy.tab }} />
      </section>

      <Aside tab={filterBy.tab} unreadEmailsCount={unreadEmailsCount} />

      <footer className="footer">
        <section>robotRights 2023 &copy;</section>
      </footer>
    </div>
  );
}
