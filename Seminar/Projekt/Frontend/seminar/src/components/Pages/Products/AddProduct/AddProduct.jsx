import styles from "./AddProduct.module.css";
import { useEffect, useState, useContext } from "react";
import { Card, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../../context/UserContext";

export default function AddProduct() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const [manufactuers, setManufactuers] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [percentageOfAlcohol, setPercentageOfAlcohol] = useState(0.0);
  const [color, setColor] = useState("");
  const [type, setType] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [manufactuer, setManufactuer] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { userCart } = useContext(UserContext);

  const submitFormHandler = async (e) => {
    e.preventDefault();
    console.log(manufactuer);
    if (name === "") {
      setError("No name was entered");
      handleShow();
    } else if (price === 0.0) {
      setError("No price was entered");
      handleShow();
    } else if (shortDescription === "") {
      setError("No short description was entered");
      handleShow();
    } else if (percentageOfAlcohol === 0.0) {
      setError("No percentage of alcohol was entered");
      handleShow();
    } else if (imageUrl === "") {
      setError("No image url was entered");
      handleShow();
    } else {
      await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Role": userCart.userRole,
        },
        body: JSON.stringify({
          name: name,
          price: price,
          percentageOfAlcohol: percentageOfAlcohol,
          color: color,
          type: type,
          shortDescription: shortDescription,
          imageUrl: imageUrl,
          manufactuer: manufactuer,
        }),
      })
        .then((response) => {
          if (response.status === 404) {
            setError("Manufactuer with given ID not found");
            handleShow();
            throw new Error("Manufactuer with given ID not found");
          } else if (response.status === 401) {
            setError("Only users with the role of admin can do this operation");
            handleShow();
            throw new Error(
              "Only users with the role of admin can do this operation"
            );
          } else if (response.status === 500) {
            setError("Server error");
            handleShow();
            throw new Error("Server error");
          } else {
            return response.json();
          }
        })
        .then(() => navigate("/products"));
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/manufactuers", {
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
      .then((data) => {
        setManufactuers(data);
        setManufactuer(data[0]._id);
        setType("Ale");
        setColor("Green");
      })
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
      {manufactuers.length > 0 ? (
        <Card id={styles.card}>
          <Card.Header id={styles.header}>
            <h3>Add New Product</h3>
          </Card.Header>
          <form onSubmit={submitFormHandler}>
            <Card.Body>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    placeholder="Enter Name..."
                    className="form-control"
                    type="text"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    onBlur={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="number"
                    name="price"
                    placeholder="Enter Price..."
                    step=".01"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                    onBlur={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="w-100"></div>
                <div className="col-md-6 mb-3">
                  <input
                    type="number"
                    name="percentageOfAlcohol"
                    placeholder="Enter Percentage Of Alcohol..."
                    step=".01"
                    className="form-control"
                    onChange={(e) => setPercentageOfAlcohol(e.target.value)}
                    onBlur={(e) => setPercentageOfAlcohol(e.target.value)}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <select
                    name="color"
                    className="form-select"
                    onChange={(e) => setColor(e.target.value)}
                  >
                    <option value="Green">Green</option>
                    <option value="Black">Black</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Brown">Brown</option>
                    <option value="Red">Red</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="imageUrl"
                    placeholder="Enter Image URL..."
                    className="form-control"
                    onChange={(e) => setImageUrl(e.target.value)}
                    onBlur={(e) => setImageUrl(e.target.value)}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="shortDescription"
                    placeholder="Enter Short Description..."
                    className="form-control"
                    onChange={(e) => setShortDescription(e.target.value)}
                    onBlur={(e) => setShortDescription(e.target.value)}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <select
                    name="type"
                    className="form-select"
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="Ale">Ale</option>
                    <option value="Mead">Mead</option>
                    <option value="Lager">Lager</option>
                    <option value="Darkel">Darkel</option>
                    <option value="IPA">IPA</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <select
                    name="manufactuer"
                    className="form-select"
                    onChange={(e) => setManufactuer(e.target.value)}
                  >
                    {manufactuers.map((item, key) => {
                      return (
                        <option value={item._id} key={key}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </Card.Body>
            <Card.Footer id={styles.footer}>
              <button type="submit" className="btn btn-success w-25 h-100">
                Submit
              </button>
            </Card.Footer>
          </form>
        </Card>
      ) : (
        <h3 id={styles.loading}>Loading...</h3>
      )}
    </>
  );
}
