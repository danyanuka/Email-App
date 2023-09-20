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

import { Aside } from "./cmps/Aside";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/email" element={<EmailIndex />} />
        <Route path="/email/:emailId" element={<EmailDetails />} />
      </Routes>
    </Router>
  );
}
