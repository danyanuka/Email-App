import { useParams, useSearchParams, useOutletContext } from "react-router-dom";
import { emailService } from "../services/email.service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function EmailDetails() {
  const [email, setEmail] = useState(null);
  const params = useParams();
  const { tab } = useOutletContext();

  useEffect(() => {
    loadEmail();
  }, []);

  async function loadEmail() {
    try {
      const email = await emailService.getById(params.emailId);
      setEmail(email);
    } catch (error) {
      console.error("Could not find Email", error);
    }
  }
  // Getting date out of sentAt filed
  function getDate() {
    const timeStamp = email.sentAt;
    const date = new Date(timeStamp);
    return date.toLocaleString();
  }

  if (!email) return <div>Loading your Email...</div>;
  return (
    <section className="email-details">
      <Link to={`/email?tab=${tab}`}>
        <span> {"<- "} Go Back</span>
      </Link>

      <h1>{email.subject}</h1>
      <h4>{getDate()}</h4>

      <hr></hr>
      <h1>From - {email.from}</h1>
      <h1>To - {email.to}</h1>

      <h3>Email Content :</h3>
      <p> {email.body}</p>
    </section>
  );
}
