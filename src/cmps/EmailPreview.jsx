import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faStar as shallowStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeOpen } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

export function EmailPreview({ email, markAsRead, onRemove, toggleStar }) {
  const [isHovered, setIsHovered] = useState(false);
  const dynClassColor = email.isRead ? "rgb(238 242 255)" : "white";
  const dynClassBoldness = email.isRead ? "400" : "700";

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

  return (
    <article
      className="email-preview"
      style={{
        backgroundColor: dynClassColor,
        fontWeight: dynClassBoldness,
        // ...hoverStyles,
      }}
      onClick={() => markAsRead(email, false)}
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
        {email.isStarred === false ? (
          <FontAwesomeIcon icon={shallowStar} />
        ) : (
          <FontAwesomeIcon icon={solidStar} style={{ color: "#fbff00" }} />
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
              markAsRead(email, true);
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
              onRemove(email.id);
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      )}
    </article>
  );
}
