import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export function Aside() {
  const navigate = useNavigate();

  const links = ["inbox", "starred", "sent", "draft", "all"];
  const [searchParmas, setsearchParmas] = useSearchParams({ tab: "" });
  const tab = searchParmas.get("tab");
  // function onSelectAction(tab) {
  //   navigate(`/email/?tab=${tab}`);
  // }

  // mail/compose?tab=inbox

  return (
    <aside className="aside">
      <Link to={`/email/compose/?tab=${tab}`} className="compose-btn">
        <div>
          <FontAwesomeIcon icon={faPen} style={{ paddingInlineEnd: "13px" }} />
          <span>Compose</span>
        </div>
      </Link>
      {links.map((link, idx) => (
        <Link
          className={`aside-folder-${idx + 1}`}
          key={link}
          to={`/email/?tab=${link}`}
        >
          {link}
        </Link>
      ))}
    </aside>
  );
}
