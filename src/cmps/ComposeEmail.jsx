import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { emailService } from "../services/email.service";

export function ComposeEmail() {
  const [email, setEmail] = useState({
    subject: "Not specified",
    body: "Not specified",
    isRead: false,
    isStarred: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: emailService.loggedinUser.email,
    to: "",
  });
  const onAddEmail = useOutletContext();

  function handleChange(ev) {
    const { value, name } = ev.target;
    setEmail((prevEmail) => ({ ...prevEmail, [name]: value }));
  }
  function onSubmitEmail(ev) {
    console.log(email);
    ev.preventDefault();
    onAddEmail(email);
  }

  function handleSubjectKeyPress(ev) {
    console.log(ev.key);
    if (ev.key === "Enter") {
      ev.preventDefault(); // Prevent the default form submission when Enter is pressed
    }
  }

  return (
    <form className="compose-form" onSubmit={onSubmitEmail}>
      <div className="form-head">
        <h1>New Message</h1>
        <Link to="/email" className="close-btn">
          X
        </Link>
      </div>
      <input
        className="form-to"
        onChange={handleChange}
        type="email"
        placeholder="To"
        name="to"
      ></input>
      <label htmlFor="subject"></label>
      <input
        className="form-subject"
        onChange={handleChange}
        onKeyPress={handleSubjectKeyPress}
        type="text"
        name="subject"
        placeholder="subject"
        id="subject"
      ></input>

      <label htmlFor="body"></label>
      <textarea
        className="form-body"
        onChange={handleChange}
        type="text"
        name="body"
        placeholder="Email's Body"
        id="body"
      ></textarea>
      <button className="submit-btn" type="submit">
        Send
      </button>
    </form>
  );
}
