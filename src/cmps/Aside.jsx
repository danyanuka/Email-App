import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export function Aside({ tab, unreadEmailsCount }) {
  const links = ["inbox", "starred", "sent", "draft", "all", "trash"];

  // function getDynClass() {
  //   return( `email-folder ${folder}` + (activeFolder == folder ? " active" : ""))
  // }

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
              <span className="unread-emails">{unreadEmailsCount}</span>
            )}
          </Link>
        ))}
      </div>
    </aside>
  );
}
