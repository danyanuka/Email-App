import { useState } from "react";
export function ComposeEmail({ isCompose, setCompose }) {
  const tableCellStyle = { border: "1px solid black" };
  const [email, setEmail] = useState({
    recipient: "",
    subject: "",
    body: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="container">
      <form>
        <input name="recipient" placeholder="recipient"></input>
        <input name="subject" placeholder="subject"></input>
        <input name="body" placeholder="body"></input>
      </form>
      <button onClick={() => setCompose(false)}>Close</button>
    </section>
  );
}
