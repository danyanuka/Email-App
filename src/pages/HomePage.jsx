import imgUrl from "../assets/imgs/react.png";

export function HomePage() {
  return (
    <section className="home">
      <h1>Welcome to our Email App</h1>
      <img src={imgUrl} alt="" />
    </section>
  );
}
