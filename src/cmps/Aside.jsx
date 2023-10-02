import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export function Aside({ unreadEmails, tab }) {
  const links = ["inbox", "starred", "sent", "draft", "all", "trash"];

  return (
    <aside className="aside">
      <Link to={`/email/compose/?tab=${tab}`} className="compose-btn">
        <div>
          <FontAwesomeIcon icon={faPen} style={{ paddingInlineEnd: "13px" }} />
          <span>Compose</span>
        </div>
      </Link>

      {/* Tabs */}
      <div className="tabs-container">
        {links.map((link, idx) => (
          <Link
            to={`/email/?tab=${link}`}
            className={` ${link === tab ? "active-tab" : "tab"}`}
            key={link}
          >
            {link}
            {link === "inbox" && (
              <span className="unread-emails">{unreadEmails}</span>
            )}
          </Link>
        ))}
      </div>
    </aside>
  );
}
