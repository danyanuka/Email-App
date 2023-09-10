import {
  HashRouter as Router,
  Route,
  Routes,
  Link,
  NavLink,
  Outlet,
} from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { AboutUs } from "./pages/AboutUs";
import { EmailIndex } from "./pages/EmailIndex";
import { EmailDetails } from "./pages/EmailDetails";
import { NavBar } from "./cmps/NavBar";

export function App() {
  return (
    <Router>
      <section className="main-app">
        <NavBar />

        <main className="main container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/email" element={<EmailIndex />} />
            <Route path="/email/:emailId" element={<EmailDetails />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </main>

        <footer>
          <section className="container">robotRights 2023 &copy;</section>
        </footer>
      </section>
    </Router>
  );
}
