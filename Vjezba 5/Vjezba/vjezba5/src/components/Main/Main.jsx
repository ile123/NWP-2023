import { useEffect, useState } from "react";
import styles from "./Main.module.css";
import { Link } from "react-router-dom";
import { data } from "../../data/products";

export default function Main() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(data);
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
