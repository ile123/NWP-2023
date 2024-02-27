import styles from "./Details.module.css";
import { data } from "../../data/products";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../context/CartContext";
import Modal from "../Modal/Modal";

export default function Details() {
  const { product } = useParams();
  const [productInformation, setProductInformation] = useState({});
  const { cart, setCart } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setProductInformation(data.find((item) => item.link === product));
  }, [product]);

  const addToCart = () => {
    setShowModal(true);
    const item = cart.find((productCart) => productCart.name === product);
    if (item === undefined) {
      setCart([...cart, { name: product, amount: 1 }]);
    } else {
      const updatedCart = cart.map((productCart) => {
        if (productCart.name === product) {
          return {
            ...productCart,
            amount: productCart.amount + 1,
          };
        }
        return productCart;
      });
      setCart(updatedCart);
    }
  };

  const closeModalHandler = () => {
    setShowModal(false);
  }

  return (
    <>
      {!showModal ? (<div id={styles.container}>
        <img
          src={productInformation.image}
          alt={productInformation.name}
          id={styles.image}
        />
        <h2>{productInformation.name}</h2>
        <button onClick={addToCart}>Add To Cart</button>
      </div>) : (<Modal onModalClose={closeModalHandler} />)}
    </>
  );
}
