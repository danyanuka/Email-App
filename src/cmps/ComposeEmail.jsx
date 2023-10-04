import { useEffect, useState, useRef } from "react";
import {
  Link,
  useOutletContext,
  useNavigate,
  useParams,
} from "react-router-dom";
import { emailService } from "../services/email.service";
import { useSearchParams } from "react-router-dom";
import { useEffectUpdate } from "../hooks/useEffectUpdate";

export function ComposeEmail() {
  const [email, setEmail] = useState(emailService.createEmail());
  const [title, setTitle] = useState("New Messege");
  const { onAddEmail, tab, onUpdateEmail } = useOutletContext();
  const { emailId } = useParams();
  const debounceTimeout = useRef(null);
  const [composeView, setComposeView] = useState("");

  useEffect(() => {
    loadDraft();
  }, []);

  useEffect(() => {
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(draftAutoSave, 4000);
    return () => clearTimeout(debounceTimeout.current);
  }, [email]);

  async function loadDraft() {
    try {
      if (emailId) {
        const email = await emailService.getById(emailId);
        setEmail(email);
        setTitle(email.subject === "" ? "New Message" : email.subject);
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
    if (field == "subject") {
      setTitle(value == "" ? "New Message" : value);
    }
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

  function viewHandler(view) {
    setComposeView(view);
    if (view === "maximize") {
    }
  }

  async function draftAutoSave() {
    if (email.body !== "" || email.subject !== "")
      try {
        if (!email.id) {
          const emailToSave = await emailService.save(email);
          setEmail((prevEmail) => ({ ...prevEmail, id: emailToSave.id }));
        }
        if (email.id) {
          onUpdateEmail(email);
        }
        setTitle("Draft Saved");
        setTimeout(() => {
          setTitle(email.subject ? email.subject : "New Messege");
        }, 2000);
      } catch (error) {
        console.log(error);
      }
  }

  // async function draftAutoSave() {
  //   try {
  //     const emailToSave = await emailService.save(email);
  //     if (!email.id) {
  //       setEmail((prevEmail) => ({ ...prevEmail, id: emailToSave.id }));
  //     }
  //     onUpdateEmail(emailToSave);
  //     setTitle("Draft Saved");
  //     setTimeout(() => {
  //       setTitle(email.subject ? email.subject : "New Messege");
  //     }, 2000);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async function onCloseDraft() {
  //   if (email.to !== "" || email.subject !== "") {
  //     const emailToSave = await emailService.save(email);
  //     if (!email.id) {
  //       setEmail((prevEmail) => ({ ...prevEmail, id: emailToSave.id }));
  //     }
  //   }
  // }
  console.log(composeView);
  return (
    <form
      className={`compose-form ${composeView}`}
      onSubmit={onSubmitEmail}
      onClick={() => {
        // when pressing form head ONLY back to original
        viewHandler("");
      }}
    >
      <div className="form-head">
        <h3>{title}</h3>
        <div className="top-bar-action-btns">
          <div
            onClick={(e) => {
              e.stopPropagation();
              viewHandler("minimize");
            }}
            className="minimize-btn"
          ></div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              // if already maximized, back to original
              composeView === "maximize"
                ? viewHandler("")
                : viewHandler("maximize");
            }}
            className="maximize-btn"
          ></div>
          <Link
            to={`/email/?tab=${tab}`}
            className="close-btn"
            onClick={draftAutoSave}
          ></Link>
        </div>
      </div>
      <input
        className="form-to"
        onChange={handleChange}
        type="email"
        placeholder="To"
        name="to"
        value={email.to}
        onClick={(e) => {
          e.stopPropagation();
        }}
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
        onClick={(e) => {
          e.stopPropagation();
        }}
      />

      <label htmlFor="body"></label>
      <textarea
        className="form-body"
        onChange={handleChange}
        type="text"
        name="body"
        placeholder="Email's Body"
        id="body"
        value={email.body}
        onClick={(e) => {
          e.stopPropagation();
        }}
      />

      <button
        onClick={(e) => ev.stopPropagation()}
        className="submit-btn"
        type="submit"
      >
        Send
      </button>
    </form>
  );
}
