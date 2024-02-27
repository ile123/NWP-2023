import styles from "./Register.module.css";
import { Card, Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../../constants/RoleConstants";

export default function Register() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (name === "") {
      setError("No name was entered");
      handleShow();
    } else if (email === "") {
      setError("No email was entered");
      handleShow();
    } else if (password === "" || repeatPassword === "") {
      setError("One of the password fields is empty");
      handleShow();
    } else if (password !== repeatPassword) {
      setError("Passwords are not the same.");
      handleShow();
    } else {
      await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          role: role
        }),
      })
        .then((response) => {
          if (response.status === 400) {
            setError("User with given email already exists!");
            handleShow();
            throw new Error("User with given email already exists!");
          } else if (response.status === 500) {
            setError("Server error!");
            handleShow();
            throw new Error("Server error");
          } else {
            return response.json();
          }
        })
        .then(() => navigate("/login"))
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    setRole(ROLES.CUSTOMER);
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registration error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Card id={styles.card}>
        <Card.Header id={styles.header}>Register</Card.Header>
        <form onSubmit={submitHandler}>
          <Card.Body>
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name..."
                  className="form-control mb-3"
                  onChange={(e) => setName(e.target.value)}
                  onBlur={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email..."
                  className="form-control mb-3"
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password..."
                  className="form-control mb-3"
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="password"
                  name="repeatPassword"
                  placeholder="Enter Password Again..."
                  className="form-control mb-3"
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  onBlur={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <select
                  className="form-select"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value={ROLES.CUSTOMER}>Customer</option>
                  <option value={ROLES.ADMIN}>Admin</option>
                </select>
              </div>
            </div>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-center">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </Card.Footer>
        </form>
      </Card>
    </>
  );
}
