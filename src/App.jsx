import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AboutUs } from "./pages/AboutUs";
import { EmailIndex } from "./pages/EmailIndex";
import { EmailDetails } from "./pages/EmailDetails";
import { ComposeEmail } from "./cmps/ComposeEmail";
import { UserMsg } from "./cmps/UserMsg";
import { eventBusService } from "./services/event-bus-service";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/email" element={<EmailIndex />}>
          <Route path="/email/:emailId" element={<EmailDetails />} />
          <Route path="/email/compose/:emailId?" element={<ComposeEmail />} />
        </Route>
      </Routes>
      <UserMsg />
    </Router>
  );
}
