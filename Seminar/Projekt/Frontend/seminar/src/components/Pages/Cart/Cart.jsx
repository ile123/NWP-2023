import styles from "./Cart.module.css";
import { useState, useContext } from "react";
import NavigationBar from "../../UI/NavigationBar/NavigationBar";
import { Modal, Button } from "react-bootstrap";
import UserContext from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const { userCart, setUserCart } = useContext(UserContext);

  const decreaseAmountHandler = (productName) => {
    setUserCart((prevUserCart) => {
      const existingProductIndex = prevUserCart.cart.findIndex(
        (item) => item.name === productName
      );
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevUserCart.cart];
        updatedCart[existingProductIndex].amount -= 1;

        if (updatedCart[existingProductIndex].amount <= 0) {
          updatedCart.splice(existingProductIndex, 1);
        }
        return {
          ...prevUserCart,
          cart: updatedCart,
        };
      }
    });
  };

  const increaseAmountHandler = (productName) => {
    setUserCart((prevUserCart) => {
      const existingProductIndex = prevUserCart.cart.findIndex(
        (item) => item.name === productName
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...prevUserCart.cart];
        updatedCart[existingProductIndex].amount += 1;
        return {
          ...prevUserCart,
          cart: updatedCart,
        };
      }
    });
  };

  const purchaseHandler = () => {
    setUserCart((prevUserCart) => ({
      ...prevUserCart,
      cart: [],
    }));
  };

  if (userCart.name === "") navigate("/");

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Wishlist error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div id={styles.container}>
        <div id={styles.navigation}>
          <NavigationBar />
        </div>
        <div>
          <div>
            {userCart.cart.length > 0 ? (
              <div>
                <div id={styles.scrollable}>
                  <div id={styles.itemContainer}>
                    <ul id={styles.list}>
                      {userCart.cart.map((item, index) => (
                        <li key={index} id={styles.item}>
                          <h1>{item.name}</h1>
                          <i
                            className="bi bi-terminal-dash"
                            id={styles.icon}
                            onClick={() => decreaseAmountHandler(item.name)}
                          ></i>
                          <i
                            className="bi bi-terminal-plus"
                            id={styles.icon}
                            onClick={() => increaseAmountHandler(item.name)}
                          ></i>
                          <h3 id={styles.amount}>{item.amount}</h3>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <button
                  className="btn btn-danger"
                  id={styles.purchase}
                  onClick={purchaseHandler}
                >
                  Purchase
                </button>
              </div>
            ) : (
              <h3 id={styles.noCart}>No products in cart.</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
