import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export function Aside() {
  const navigate = useNavigate();

  function onSelectAction(tab) {
    console.log(tab);
    navigate(`/email?tab=${tab}`);
  }

  // mail/compose?tab=inbox
  return (
    <aside className="aside">
      <Link to="/email/compose" className="compose-btn">
        <div>
          <FontAwesomeIcon icon={faPen} style={{ paddingInlineEnd: "13px" }} />
          <span>Compose</span>
        </div>
      </Link>
      <div className="aside-folders">
        <button
          className=" aside-folder-1"
          onClick={() => onSelectAction("inbox")}
        >
          Inbox
        </button>
        <button
          onClick={() => onSelectAction("starred")}
          className="aside-folder-2"
        >
          Starred
        </button>
        <button
          onClick={() => onSelectAction("sent")}
          className="aside-folder-3"
        >
          Sent
        </button>
        <button
          onClick={() => onSelectAction("draft")}
          className="aside-folder-4"
        >
          Draft
        </button>
      </div>
    </aside>
  );
}
