import { useState, useEffect } from "react";
import styles from "./Products.module.css";
import { Link } from "react-router-dom";
import NavigationBar from "../../UI/NavigationBar/NavigationBar";
import ItemCard from "../../UI/ItemCard/ItemCard";
import { Modal, Button } from "react-bootstrap";
import Filter from "../../UI/Filter/Filter";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeTypeHandler = (data) => {
    console.log(data);
    setProducts(data);
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/products", {
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
        } else {
          return response.json();
        }
      })
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }, []);

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
      <div id={styles.container}>
        <div id={styles.navigation}>
          <NavigationBar />
        </div>
        <div>
          <div id={styles.row}>
            <div className={styles.column}>
              <Link to="/products/add-new-product">
                <button
                  id={
                    products.length > 0
                      ? styles.button
                      : styles.buttonNoProducts
                  }
                >
                  <i className="bi bi-file-plus"></i>
                </button>
              </Link>
            </div>
            {products.length > 0 && <div className={styles.column}>
                <Filter onTypeChange={changeTypeHandler} />
            </div>}
          </div>
          <div>
            {products.length > 0 ? (
              <div id={styles.scrollable}>
                <div id={styles.itemContainer}>
                  {products.map((item, key) => (
                    <div id={styles.item} key={key}>
                      <ItemCard
                        id={item._id}
                        name={item.name}
                        imageUrl={item.imageUrl}
                        type="product"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <h3 id={styles.noProducts}>No products in the DB.</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
