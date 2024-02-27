import styles from "./Modal.module.css";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Modal(props) {
  const modalRoot = document.getElementById("modal");
  const [modalEl] = useState(document.createElement("div"));

  useEffect(() => {
    modalRoot.appendChild(modalEl);
    return () => {
      modalRoot.removeChild(modalEl);
    };
  }, [modalEl, modalRoot]);

  const handleModalClose = () => {
    props.onModalClose();
  };

  return createPortal(
    <div id={styles.modal}>
      <div>
        <h1 id={styles.header}>Notification</h1>
        <p id={styles.modalMessage}>Item added to cart, do you want to go to the cart now?</p>
        <div id={styles.buttonRow}>
            <div>
                <button onClick={handleModalClose} id={styles.noButton}>No</button>
            </div>
            <div>
               <Link to="/cart">
                    <button id={styles.yesButton}>Yes</button>
                </Link> 
            </div>
        </div>
      </div>
    </div>,
    modalEl
  );
}
