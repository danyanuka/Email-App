import { Link, NavLink } from "react-router-dom";
export function NavBar() {
  return (
    <header className="app-header">
      <section className="container">
        <h1>Mister Email</h1>
        <nav className="nav-links">
          <NavLink to="./"> Home</NavLink>
          <NavLink to="./email">Email</NavLink>
          <NavLink to="./about">About</NavLink>
        </nav>
      </section>
    </header>
  );
}
