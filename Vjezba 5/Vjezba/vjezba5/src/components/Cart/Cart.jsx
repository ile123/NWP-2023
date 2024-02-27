import { useContext } from "react";
import styles from "./Cart.module.css";
import CartContext from "../../context/CartContext";

export default function Cart() {
  const { cart } = useContext(CartContext);
  console.log(cart);

  return (
    <>
      <div id={styles.container}>
        <ul>
          {cart.length !== 0 ? (
            cart.map((item, key) => <li key={key} id={styles.listItem}><h2>{item.name}</h2><h2 id={styles.amount}>{item.amount}</h2></li>)
          ) : (
            <h1>No products in cart</h1>
          )}
        </ul>
      </div>
    </>
  );
}
