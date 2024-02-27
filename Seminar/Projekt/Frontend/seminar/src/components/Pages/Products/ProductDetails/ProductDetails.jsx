import styles from "./ProductDetails.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, Modal, Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../../../context/UserContext";

export default function ProductDetails() {
  const [product, setProduct] = useState({});
  const [manufactuer, setManufactuer] = useState({});
  const [amount, setAmount] = useState(0);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const navigate = useNavigate();

  const { userCart, setUserCart } = useContext(UserContext);

  const { id } = useParams();

  const deleteHandler = () => {
    fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "Role": userCart.userRole
      },
    })
      .then((response) => {
        if (response.status === 500) {
          setError("Server error");
          handleShow();
          throw new Error("Server error");
        } else if(response.status === 401) {
          setError(
            "Only users with the role of admin can do this operation"
          );
          handleShow();
          throw new Error("Only users with the role of admin can do this operation");
        } else if (response.status === 404) {
          setError("Product with given ID does not exist");
          handleShow();
          throw new Error("Product not found");
        } else {
          return response.json();
        }
      })
      .then(() => navigate("/products"))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 404) {
          setError("Product not found");
          handleShow();
          throw new Error("Product not found");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        fetch(`http://localhost:5000/api/manufactuers/${data.manufactuer}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.status === 404) {
              setError("Manufactuer not found");
              handleShow();
              throw new Error("Manufactuer not found");
            } else {
              return response.json();
            }
          })
          .then((data) => setManufactuer(data))
          .catch((error) => console.log(error));

        setProduct(data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const wishlistHandler = () => {
    fetch("http://localhost:5000/api/wishlist", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userCart.name,
        product: product.name,
      }),
    })
      .then((response) => {
        if (response.status === 500) {
          setError("Server error");
          handleShow();
          throw new Error("Server error");
        }
      })
      .catch((error) => console.log(error));
  };

  const decreaseAmountHandler = () => {
    if (amount !== 0) {
      setAmount(amount - 1);
    }
  };

  const increaseAmountHandler = () => setAmount(amount + 1);

  const addToCartHandler = () => {
    setUserCart((prevUserCart) => {
      const existingProductIndex = prevUserCart.cart.findIndex(
        (item) => item.name === product.name
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...prevUserCart.cart];
        updatedCart[existingProductIndex].amount = amount;
        return {
          ...prevUserCart,
          cart: updatedCart,
        };
      } else {
        return {
          ...prevUserCart,
          cart: [
            ...prevUserCart.cart,
            {
              name: product.name,
              amount: amount,
            },
          ],
        };
      }
    });
    setAmount(0);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={confirmDeletion}
        onHide={() => setConfirmDeletion(!confirmDeletion)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Deletion Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            variant="danger"
            onClick={() => setConfirmDeletion(!confirmDeletion)}
          >
            No
          </Button>
          <Button variant="secondary" onClick={deleteHandler}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Card id={styles.card}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <img src={product.imageUrl} id={styles.image} alt={product.name} />
          </div>
          <div className="col-md-6 mb-3 text-center">
            <h3 className={styles.info}>Name: {product.name}</h3>
            <h3 className={styles.info}>Price: {product.price} €</h3>
            <h3 className={styles.info}>
              Percentage Of Alcohol: {product.percentageOfAlcohol}%
            </h3>
            <h3 className={styles.info}>Color: {product.color}</h3>
            <h3 className={styles.info}>Type: {product.type}</h3>
            <h3 className={styles.info}>Manufactuer: {manufactuer.name}</h3>
          </div>
          <div id={styles.shortDescription}>
            <h4>{product.shortDescription}</h4>
          </div>
        </div>
      </Card>
      <div id={styles.row}>
        <div className={styles.column}>
          <Link to="edit">
            <button className="btn btn-success w-100 h-100">Edit</button>
          </Link>
        </div>
        <div className={styles.column}>
          <button
            onClick={() => setConfirmDeletion(!confirmDeletion)}
            className="btn btn-danger w-100 h-100"
          >
            Delete
          </button>
        </div>
        <div className={styles.column}>
          <button
            onClick={wishlistHandler}
            className="btn btn-info w-100 h-100 text-white"
          >
            Add/Remove from wishlist
          </button>
        </div>
        <div id={styles.minusColumn}>
          <i
            className="bi bi-terminal-dash"
            id={styles.minus}
            onClick={decreaseAmountHandler}
          ></i>
        </div>
        <div id={styles.amount}>
          <h1>{amount}</h1>
        </div>
        <div id={styles.plusColumn}>
          <i
            className="bi bi-terminal-plus"
            id={styles.plus}
            onClick={increaseAmountHandler}
          ></i>
        </div>
        <div id={styles.addIcon}>
          <i
            className="bi bi-cart-plus-fill"
            id={styles.cart}
            onClick={addToCartHandler}
          ></i>
        </div>
      </div>
    </>
  );
}
