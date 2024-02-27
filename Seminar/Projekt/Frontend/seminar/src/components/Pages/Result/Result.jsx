import { useState, useEffect } from "react";
import styles from "./Result.module.css"
import NavigationBar from "../../UI/NavigationBar/NavigationBar";
import ItemCard from "../../UI/ItemCard/ItemCard";
import { Modal, Button } from "react-bootstrap";
import DisplayResult from "../../UI/DisplayResult/DisplayResult";

export default function Result() {

  const [products, setProducts] = useState([]);
  const [manufactuers, setManufactuers] = useState([]);
  const [manufactuer, setManufactuer] = useState("");
  const [type, setType] = useState("");
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

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${manufactuer}/${type}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if(response.status === 401) {
            setProducts([]);
            throw new Error("ERROR: No Products found!");
        } else {
            return response.json();
        }
      })
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }, [type]);


  const firstFilterHandler = (value) => {
    setManufactuer(value);
  }

  const secondFilterHandler = (value) => {
    setType(value);
  }

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
              {manufactuers.length > 0 && <div>
                <select
                    name="manufactuer"
                    className="form-select"
                    onChange={(e) => firstFilterHandler(e)}
                    id={styles.select}
                >
                    {manufactuers.map((item, key) => {
                        return <option id={styles.result} key={key} value={item._id}>{item.name}</option>
                    })}
                </select>
                <select
                    name="type"
                    className="form-select"
                    onChange={(e) => secondFilterHandler(e.target.value)}
                    id={styles.select}
                >
                    <option value="">All</option>
                    <option value="Ale">Ale</option>
                    <option value="Mead">Mead</option>
                    <option value="Lager">Lager</option>
                    <option value="Darkel">Darkel</option>
                    <option value="IPA">IPA</option>
                </select>
              </div>}
            </div>
          </div>
          <div>
            {products.length > 0 && (
              <DisplayResult products={products} />
            )}
          </div>
        </div>
      </div>
    </>
  );

}