import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faStar as shallowStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeOpen } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

export function EmailPreview({
  email,
  onUpdateEmail,
  //  markAsRead,
  onRemoveEmail,
  //  toggleStar
}) {
  const [isHovered, setIsHovered] = useState(false);

  function markAsRead(eventFrom) {
    const emailToUpdate = {
      ...email,
      isRead: !eventFrom ? true : !email.isRead,
    };
    onUpdateEmail(emailToUpdate);
  }

  function toggleStar() {
    const emailToUpdate = {
      ...email,
      isStarred: !email.isStarred,
    };
    onUpdateEmail(emailToUpdate);
  }

  function onMouseEnter(e) {
    setIsHovered(true);
  }

  function onMouseLeave(e) {
    setIsHovered(false);
  }

  function getDayMonth() {
    const timeStamp = email.sentAt;
    const date = new Date(timeStamp);
    const day = date.getDate();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = months[date.getMonth()];
    return `${day}/${month}`;
  }

  const dynClassColor = email.isRead ? "rgb(238 242 255)" : "white";
  const dynClassBoldness = email.isRead ? "400" : "700";
  return (
    <article
      className="email-preview"
      style={{
        backgroundColor: dynClassColor,
        fontWeight: dynClassBoldness,
        // ...hoverStyles,
      }}
      onClick={() => {
        if (email.sentAt) markAsRead(false);
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="star"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleStar(email);
        }}
      >
        {email.isStarred ? (
          <FontAwesomeIcon icon={solidStar} style={{ color: "#fbff00" }} />
        ) : (
          <FontAwesomeIcon icon={shallowStar} />
        )}
      </div>

      <div className="email-preview-from">{email.from}</div>
      <div className="email-preview-subject">{email.subject} - </div>
      <p className="email-preview-body">{email.body}</p>
      {/*  When is Hovered = False */}
      {!isHovered && (
        <span className="email-preview-date">{getDayMonth()}</span>
      )}
      {/* When is Hovered = True */}
      {isHovered && (
        <div className="btns">
          <button
            className="email-preview-env"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              markAsRead(true);
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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemoveEmail(email.id);
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      )}
    </article>
  );
}
