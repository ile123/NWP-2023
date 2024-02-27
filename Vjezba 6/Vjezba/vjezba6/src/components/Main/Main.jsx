import { useEffect, useState } from "react";
import styles from "./Main.module.css";
import { Link } from "react-router-dom";

export default function Main() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((result) => setProducts(result))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div id={styles.container}>
        <div id={styles.middleSection}>
          <ul>
            <h1>Products</h1>
            {products.length != 0 &&
              products.map((item, key) => (
                <li key={key} id={styles.listItem}>
                  <Link to={"product-information/" + item.link}>
                    <button id={styles.linkButton}>{item.name}</button>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <Link to="/cart" id={styles.cartButton}>
          <button>Go To Cart</button>
        </Link>
      </div>
    </>
  );
}
