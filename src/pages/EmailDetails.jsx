import { useParams } from "react-router-dom";
import { emailService } from "../services/email.service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function EmailDetails() {
  const [email, setEmail] = useState(null);
  const params = useParams();

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

  console.log("From EmailDetails :", email);
  if (!email) return <div>Loading your Emails...</div>;
  return (
    <section className="details container">
      <Link to="/email">
        <span> {"<- "} Go Back</span>
      </Link>

      <h1 className="p5">{email.subject}</h1>
      <h4>{getDate()}</h4>

      <hr></hr>
      <h1>From - {email.from}</h1>
      <h1>To - {`Me : ${email.to}`}</h1>

      <div className="bottom-divider"></div>
      <h3 className="p5">Email Content :</h3>
      <p> {email.body}</p>
    </section>
  );
}
// id: "e101",
//         subject: "Miss you!",
//         body: "Would love to catch up sometimes",
//         isRead: false,
//         isStarred: false,
//         sentAt: 1551133930594,
//         removedAt: null, //for later use
//         from: "momo@momo.com",
//         to: "user@appsus.com",
