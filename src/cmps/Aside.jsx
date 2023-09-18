export function Aside({ setComposeModal }) {
  return (
    <aside className="aside">
      <button className="compose-btn" onClick={() => setComposeModal(true)}>
        Compose
      </button>

      <h1>Starred</h1>
      <h1>Sent</h1>
      <h4>Important</h4>
    </aside>
  );
}
