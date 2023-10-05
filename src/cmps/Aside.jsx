import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";

export function Aside({ tab, unreadEmailsCount }) {
  const links = ["inbox", "starred", "sent", "draft", "all", "trash"];

  return (
    <aside className="aside">
      <Link to={`/email/compose/?tab=${tab}`} className="compose-btn">
        <div>
          <span className="compose-btn-txt">Compose</span>
        </div>
      </Link>

      {/* Tabs */}
      <div className="tabs-container">
        {links.map((link, idx) => (
          <Link
            to={`/email/?tab=${link}`}
            className={
              link === tab ? `active-tab tab${idx + 1}` : `tab tab${idx + 1}`
            }
            key={link}
          >
            <span className="tab-text">{link}</span>
            {link === "inbox" && (
              <span className="unread-emails">{unreadEmailsCount}</span>
            )}
          </Link>
        ))}
      </div>
    </aside>
  );
}
