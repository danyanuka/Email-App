import { useState } from "react";
import { emailService } from "../services/email.service";
export function ComposeEmail({ setComposeModal, onAdd }) {
  const tableCellStyle = { border: "1px solid black" };
  const [email, setEmail] = useState({
    subject: "Not specified",
    body: "",
    isRead: false,
    isStarred: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: "momo@momo.com",
    to: "user@appsus.com",
  });

  function handleChange(ev) {
    const { value, name } = ev.target;
    setEmail((prevEmail) => ({ ...prevEmail, [name]: value }));
  }
  function onSubmitEmail(ev) {
    ev.preventDefault();
    onAdd(email);
  }

  return (
    <section className="container">
      <form onSubmit={onSubmitEmail}>
        <div className="form-head">
          <label htmlFor="subject">Subject </label>
          <input
            onChange={handleChange}
            type="text"
            name="subject"
            placeholder="subject"
            id="subject"
          ></input>
        </div>
        {/* SEPERATOR */}
        <div className="form-body">
          <label htmlFor="body">Email Body </label>
          <input
            onChange={handleChange}
            type="text"
            name="body"
            placeholder="Type Your Email's content"
            id="body"
          ></input>
        </div>
        <button type="submit">Send Email</button>
      </form>
      <button onClick={() => setComposeModal(false)}>Close</button>
    </section>
  );
}
//         id: "e101",
//         subject: "Miss you!",
//         body: "Would love to catch up sometimes",
//         isRead: false,
//         isStarred: false,
//         sentAt: 1551133930594,
//         removedAt: null, //for later use
//         from: "momo@momo.com",
//         to: "user@appsus.com",
