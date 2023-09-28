import { NavLink } from "react-router-dom";
import imgUrl from "../assets/imgs/react.png";

export function HomePage() {
  return (
    <section className="home">
      <nav className="nav-links">
        <NavLink to="/"> Log-In</NavLink>
        <NavLink to="/email/?tab=inbox">Emails</NavLink>
      </nav>
      <h1>Welcome to our Email App</h1>
      <img src={imgUrl} alt="" />
    </section>
  );
}
