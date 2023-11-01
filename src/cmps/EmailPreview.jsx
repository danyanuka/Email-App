import { useState } from "react";
import { utilService } from "../services/util.service";
import { emailService } from "../services/email.service";
// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faStar as shallowStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeOpen } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

export function EmailPreview({ email, onUpdateEmail, onRemoveEmail, tab }) {
  function OnMarkAsRead(eventFrom) {
    const emailToUpdate = {
      ...email,
      isRead: !eventFrom ? true : !email.isRead,
    };
    onUpdateEmail(emailToUpdate);
  }

  function OnToggleStar() {
    const emailToUpdate = {
      ...email,
      isStarred: !email.isStarred,
    };
    onUpdateEmail(emailToUpdate);
  }

  // function DynamicDefaultPreviewDisplay {

  // }

  const dynClassColor = email.isRead ? "rgb(238 242 255)" : "white";
  const dynClassBoldness = email.isRead ? "400" : "700";
  return (
    <article
      className="email-preview"
      style={{
        backgroundColor: dynClassColor,
        fontWeight: dynClassBoldness,
      }}
      onClick={() => {
        if (email.sentAt) OnMarkAsRead(false);
      }}
    >
      <div
        className="star"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          OnToggleStar(email);
        }}
      >
        {email.isStarred ? (
          <FontAwesomeIcon icon={solidStar} style={{ color: "#fbff00" }} />
        ) : (
          <FontAwesomeIcon icon={shallowStar} />
        )}
      </div>

      <DynPreview tab={tab} email={email} />
      <div className="email-preview-subject">
        {email.subject ? `${email.subject} -` : "(No subject)"}
      </div>
      <p className="email-preview-body">{email.body}</p>

      <span className="email-preview-date">
        {utilService.getDayMonth(email)}
      </span>

      <div className="btns">
        <button
          className="email-preview-env"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            OnMarkAsRead(true);
          }}
        >
          {email.isRead === false ? (
            <FontAwesomeIcon icon={faEnvelopeOpen} />
          ) : (
            <FontAwesomeIcon icon={faEnvelope} />
          )}
        </button>
        <button
          className="email-preview-remove"
          onClick={(ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            onRemoveEmail(email);
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    </article>
  );
}

function DynPreview({ tab, email }) {
  switch (tab) {
    case "sent":
      return <div className="email-preview-1st">To: {email.to}</div>;
    case "draft":
      return <div className="email-preview-1st draft">Draft</div>;
    default:
      return (
        <div className={email.sentAt ? "email-preview-1st" : "draft"}>
          {email.sentAt ? email.from : "Draft"}
        </div>
      );
  }
}
