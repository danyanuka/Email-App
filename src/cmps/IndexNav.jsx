import { Link, NavLink } from "react-router-dom";
import { EmailFilter } from "./EmailFilter";
import logo from "../assets/imgs/צילום מסך 2023-10-05 201737.png";
export function IndexNav({ filterBy, onSetFilter }) {
  return (
    <>
      <img className="logo-title" src={logo} alt="Logo" />
      <EmailFilter filterBy={filterBy} onSetFilter={onSetFilter}></EmailFilter>
    </>
  );
}
