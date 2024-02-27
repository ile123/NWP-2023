import styles from "./Manufactuers.module.css";
import NavigationBar from "../../UI/NavigationBar/NavigationBar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemCard from "../../UI/ItemCard/ItemCard";
import { Modal, Button } from "react-bootstrap";

export default function Manufactuers() {
  const [manufactures, setManufactuers] = useState([]);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/manufactuers', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          if(response.status === 500) {
            setError("Server error");
            handleShow();
            throw new Error('Server error');
          } else {
            return response.json();
          }
        })
        .then((data) => setManufactuers(data))
        .catch((error) => console.log(error));
  }, []);

  return (
    <>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Manufactuer error</Modal.Title>
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
            <Link to="/manufacturers/add-new-manufactuer">
              <button id={ manufactures.length > 0 ? styles.button : styles.buttonNoManufactures}>
                <i className="bi bi-file-plus"></i>
              </button>
            </Link>
          </div>
          <div>
            {manufactures.length > 0 ? (
              <div id={styles.scrollable}>
                <div id={styles.itemContainer}>
                  {manufactures.map((item, key) => (
                    <div id={styles.item} key={key}>
                      <ItemCard id={item._id} name={item.name} imageUrl={item.imageUrl} type="manufactuer" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <h3 id={styles.noManufactuers}>No manufacturers in the DB.</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
