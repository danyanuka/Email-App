import { useEffect, useState } from "react";
import {
  Link,
  useOutletContext,
  useNavigate,
  useParams,
} from "react-router-dom";
import { emailService } from "../services/email.service";
import { useSearchParams } from "react-router-dom";

export function ComposeEmail() {
  const [email, setEmail] = useState(emailService.createEmail());
  const { onAddEmail, tab } = useOutletContext();
  const { emailId } = useParams();

  useEffect(() => {
    loadDraft();
  }, []);

  async function loadDraft() {
    if (emailId) {
      const email = await emailService.getById(emailId);
      console.log("email from loadDraft", email);
      setEmail(email);
    }
  }

  function handleChange({ target }) {
    let { name: field, value, type } = target;
    switch (type) {
      case "number":
      case "range":
        value = +value || "";
        break;
      case "select-one":
        value = JSON.parse(value);
        break;
      case "checkbox":
        value = target.checked;
      default:
        break;
    }
    setEmail((prevEmail) => ({ ...prevEmail, [field]: value }));
  }

  function onSubmitEmail(ev) {
    ev.preventDefault();
    onAddEmail(email);
  }

  function handleSubjectKeyPress(ev) {
    if (ev.key === "Enter") {
      ev.preventDefault(); // Prevent the default form submission when Enter is pressed
    }
  }

  return (
    <form className="compose-form" onSubmit={onSubmitEmail}>
      <div className="form-head">
        <h1>New Message</h1>
        <Link to={`/email/?tab=${tab}`} className="close-btn">
          X
        </Link>
      </div>
      <input
        className="form-to"
        onChange={handleChange}
        type="email"
        placeholder="To"
        name="to"
        value={email.to}
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
        value={email.subject}
      ></input>

      <label htmlFor="body"></label>
      <textarea
        className="form-body"
        onChange={handleChange}
        type="text"
        name="body"
        placeholder="Email's Body"
        id="body"
        value={email.body}
      ></textarea>

      <button className="submit-btn" type="submit">
        Send
      </button>
    </form>
  );
}
