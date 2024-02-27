import styles from "./Wishlist.module.css";
import { useState, useEffect, useContext } from "react";
import NavigationBar from "../../UI/NavigationBar/NavigationBar";
import { Modal, Button } from "react-bootstrap";
import UserContext from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const { userCart } = useContext(UserContext);

  const removeFromWishlistHandler = async (id) => {
    console.log(id)
    await fetch("http://localhost:5000/api/wishlist/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }
    })
    .then((response) => {
        if(response.status === 500) {
          setError("Server error");
          handleShow();
          throw new Error("Server error");
        } else if(response.status === 400) {
            setError("Wishlist those not exist!");
            handleShow();
            throw new Error("Wishlist those not exist!");
        } else {
            return response.json();
        }
    })
    .then(() => {
        const newList = products.filter(item => item._id !== id);
        setProducts(newList);
    })
    .catch((error) => console.log(error))
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/wishlist/${userCart.name}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 500) {
          setError("Server error");
          handleShow();
          throw new Error("Server error");
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, [userCart]);

  if(userCart.name === "") navigate("/");

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
            {products.length > 0 ? (
              <div id={styles.scrollable}>
                <div id={styles.itemContainer}>
                  <ul id={styles.list}>
                    {products.map((item, index) => (
                      <li key={index} id={styles.item}>
                        <h1>{item.product}</h1>
                        <i
                          className="bi bi-trash-fill"
                          id={styles.icon}
                          onClick={() => removeFromWishlistHandler(item._id)}
                        ></i>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <h3 id={styles.noWishlist}>No wishlists in the DB.</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
