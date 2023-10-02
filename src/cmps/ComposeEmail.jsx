import { useEffect, useState, useRef } from "react";
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
  const debounceTimeout = useRef(null);
  // const [title, setTitle] = useState("New Messege");

  useEffect(() => {
    loadDraft();
  }, []);

  useEffect(() => {
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(draftAutoSave, 5000);
    return () => clearTimeout(debounceTimeout.current);
  }, [email]);

  async function loadDraft() {
    try {
      if (emailId) {
        const email = await emailService.getById(emailId);
        setEmail(email);
        // setTitle(email.subject == "" ? "New Message" : email.subject);
      }
    } catch (error) {
      console.log("Couldnt load draft", error);
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
    // if (field == "subject") {
    //   setTitle(value == "" ? "New Message" : value);
    // }
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

  async function draftAutoSave() {
    try {
      const emailToSave = await emailService.save(email);

      if (!email.id) {
        setEmail((prevEmail) => ({ ...prevEmail, id: emailToSave.id }));
      }
      // setTitle("Draft Saved");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className="compose-form" onSubmit={onSubmitEmail}>
      <div className="form-head">
        <h3>New Messege</h3>
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
      />
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
