import styles from "./Main.module.css";
import NavigationBar from "../../UI/NavigationBar/NavigationBar";
import { useContext } from "react";
import UserContext from "../../../context/UserContext";

export default function Main() {

  const { userCart } = useContext(UserContext);

  return (
    <>
      <div id={styles.container}>
        <div id={styles.navigation}>
          <NavigationBar />
        </div>
        <div id={styles.content}>
          {userCart.name === "" ?  <h3>You are not logged in</h3> : <h3>Welcome, {userCart.name}</h3>}
        </div>
      </div>
    </>
  );
}
