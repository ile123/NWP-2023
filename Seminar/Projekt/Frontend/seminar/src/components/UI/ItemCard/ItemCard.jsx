import { Link } from "react-router-dom";
import styles from "./ItemCard.module.css";
import { Card } from "react-bootstrap";

export default function ItemCard(props) {
  return (
    <>
      <Card id={styles.card}>
        <Card.Img id={styles.image} variant="top" width="10rem" height="10rem" src={props.imageUrl} alt={props.name} />
        <Card.Footer>
          <h4 id={styles.name}>{props.type === "manufactuer" ? <Link to={"/manufacturers/" + props.id} id={styles.link}>{props.name}</Link> : <Link to={"/products/" + props.id} id={styles.link}>{props.name}</Link>}</h4>
        </Card.Footer>
      </Card>
    </>
  );
}
