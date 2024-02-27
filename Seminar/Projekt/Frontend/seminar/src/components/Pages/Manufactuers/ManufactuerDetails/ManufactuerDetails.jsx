import { useEffect, useState, useContext } from "react";
import styles from "./ManufactuerDetails.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, Modal, Button } from "react-bootstrap";
import UserContext from "../../../../context/UserContext";

export default function ManufactuerDetails() {
  const [manufactuer, setManufactuer] = useState({});
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const { userCart } = useContext(UserContext);

  const { id } = useParams();

  const deleteHandler = () => {
    fetch(`http://localhost:5000/api/manufactuers/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "Role": userCart.userRole
      },
    })
      .then((response) => {
        if (response.status === 400) {
          setError(
            "There are products with this manufactuer, so the manufactuer cannot be deleted"
          );
          handleShow();
          throw new Error("There are products with this manufacturer");
        } else if(response.status === 401) {
          setError(
            "Only users with the role of admin can do this operation"
          );
          handleShow();
          throw new Error("Only users with the role of admin can do this operation");
        } else if (response.status === 500) {
          setError("Server error");
          handleShow();
          throw new Error("Server error");
        } else if (response.status === 404) {
          setError("Manufactuer with given ID does not exist");
          handleShow();
          throw new Error("Manufacturer not found");
        } else {
          return response.json();
        }
      })
      .then(() => navigate("/manufacturers"))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/manufactuers/${id}`, {
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
  }, [id]);

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

      <Modal
        show={confirmDeletion}
        onHide={() => setConfirmDeletion(!confirmDeletion)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Deletion Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this manufactuer?
        </Modal.Body>
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
            <img
              src={manufactuer.imageUrl}
              id={styles.image}
              alt={manufactuer.name}
            />
          </div>
          <div className="col-md-6 mb-3 text-center">
            <h3 className={styles.info}>Name: {manufactuer.name}</h3>
            <h3 className={styles.info}>
              Year of Establishment: {manufactuer.yearOfEstablishment}
            </h3>
            <h3 className={styles.info}>Country: {manufactuer.country}</h3>
          </div>
          <div id={styles.shortDescription}>
            <h4>{manufactuer.shortDescription}</h4>
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
      </div>
    </>
  );
}
