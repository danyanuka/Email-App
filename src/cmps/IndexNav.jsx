import { Link, NavLink } from "react-router-dom";
import { EmailFilter } from "./EmailFilter";
export function IndexNav({ filterBy, onSetFilter }) {
  return (
    <>
      <h2
        style={{
          color: "#374048",
          fontWeight: "500",
          marginInlineStart: "15px",
        }}
        className="index-nav-title"
      >
        MrMail
      </h2>
      <EmailFilter filterBy={filterBy} onSetFilter={onSetFilter}></EmailFilter>
    </>
  );
}
