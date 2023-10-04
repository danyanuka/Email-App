import { Link, NavLink } from "react-router-dom";
import { EmailFilter } from "./EmailFilter";
export function IndexNav({ filterBy, onSetFilter }) {
  return (
    <>
      <h2 className="index-nav-title">MrMail</h2>
      <EmailFilter filterBy={filterBy} onSetFilter={onSetFilter}></EmailFilter>
    </>
  );
}
