import { Link, NavLink } from "react-router-dom";
import { EmailFilter } from "./EmailFilter";
export function IndexNav({ filterBy, onSetFilter }) {
  return (
    <header className="index-nav">
      <h1>MisterEmail</h1>
      <EmailFilter filterBy={filterBy} onSetFilter={onSetFilter}></EmailFilter>
    </header>
  );
}
