import styles from "./EditManufactuer.module.css";
import UserContext from "../../../../context/UserContext";
import { Card, Modal, Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditManufactuer() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [yearOfEstablishment, setYearOfEstablishment] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [country, setCountry] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { userCart } = useContext(UserContext);

  const { id } = useParams();

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
          throw new Error('Manufactuer not found');
        } else if (response.status === 500) {
          setError("Server error");
          handleShow();
          throw new Error('Server error');
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setName(data.name);
        setYearOfEstablishment(data.yearOfEstablishment);
        setShortDescription(data.shortDescription);
        setCountry(data.country);
        setImageUrl(data.imageUrl);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (name === "") {
      setError("No name was entered");
      handleShow();
    } else if (yearOfEstablishment === "") {
      setError("No year of establishment was entered");
      handleShow();
    } else if (shortDescription === "") {
      setError("No short description was entered");
      handleShow();
    } else if (country === "") {
      setError("No country was entered");
      handleShow();
    } else if (imageUrl === "") {
      setError("No image url was entered");
      handleShow();
    } else {
      await fetch(`http://localhost:5000/api/manufactuers/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Role": userCart.userRole
        },
        body: JSON.stringify({
          name: name,
          yearOfEstablishment: yearOfEstablishment,
          shortDescription: shortDescription,
          country: country,
          imageUrl: imageUrl,
        }),
      })
        .then((response) => {
          if(response.status === 500) {
            setError("Server error");
            handleShow();
            throw new Error('Server error');
          } else if(response.status === 401) {
            setError(
              "Only users with the role of admin can do this operation"
            );
            handleShow();
            throw new Error("Only users with the role of admin can do this operation");
          } else if(response.status === 404) {
            setError("Manufactuer with given ID not found");
            handleShow();
            throw new Error('Manufactuer with given ID not found');
          } else {
            return response.json();
          }
        })
        .then(() => {
          navigate("/manufacturers");
        });
    }
  };

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

      <Card id={styles.card}>
        <Card.Header id={styles.header}>
          <h3>Add New Manufactuer</h3>
        </Card.Header>
        <form onSubmit={submitHandler}>
          <Card.Body>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  placeholder="Enter Name..."
                  className="form-control"
                  type="text"
                  name="name"
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="yearOfEstablishment"
                  placeholder="Enter Year Of Establishment..."
                  className="form-control"
                  defaultValue={yearOfEstablishment}
                  onChange={(e) => setYearOfEstablishment(e.target.value)}
                  onBlur={(e) => setYearOfEstablishment(e.target.value)}
                />
              </div>
              <div className="w-100"></div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="shortDescription"
                  placeholder="Enter Short Description..."
                  className="form-control"
                  defaultValue={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  onBlur={(e) => setShortDescription(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="country"
                  placeholder="Enter Country..."
                  className="form-control"
                  defaultValue={country}
                  onChange={(e) => setCountry(e.target.value)}
                  onBlur={(e) => setCountry(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="Enter Image URL..."
                  className="form-control"
                  defaultValue={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  onBlur={(e) => setImageUrl(e.target.value)}
                />
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
    </>
  );
}
