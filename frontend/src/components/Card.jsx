function Card({ titulo, valor }) {
  return (
    <div className="card">

      <h5>{titulo}</h5>

      <h1>{valor}</h1>

    </div>
  );
}

export default Card;