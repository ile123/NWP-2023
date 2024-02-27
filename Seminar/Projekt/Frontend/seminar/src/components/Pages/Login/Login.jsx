import styles from "./Login.module.css";
import { Card, Modal, Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../context/UserContext";

export default function Login() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserCart } = useContext(UserContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if(email === "") {
      setError("No name was entered");
      handleShow();
    }
    else if(password === "") {
      setError("No email was entered");
      handleShow();
    } else {
        await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      })
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem("token", data.token);
            setUserCart({ userRole: data.role, name: data.user, cart: [] });
            navigate("/");
        });
    }
  }

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
        <Card.Header id={styles.header}>Login</Card.Header>
        <form onSubmit={submitHandler}>
          <Card.Body>
            <div className="row">
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
