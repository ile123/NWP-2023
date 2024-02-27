import styles from "./NavigationBar.module.css";
import { Link } from "react-router-dom";
import beerIcon from "../../../assets/images/beer_icon.png";
import { useEffect, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import UserContext from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function NavigationBar() {
  const [isJWTValid, setIsJWTValid] = useState(true);
  const { userCart, setUserCart } = useContext(UserContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsJWTValid(false);
      return;
    }
    const decodedToken = jwtDecode(token);
    if (!decodedToken) {
      setIsJWTValid(false);
      return;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTime) {
      setIsJWTValid(false);
      localStorage.removeItem("token");
    }
  }, []);

  useEffect(() => {
    if(!isJWTValid) navigate("/");
  }, [isJWTValid, navigate]);

  useEffect(() => {
    if (isJWTValid === false) {
      setUserCart({
        userRole: "",
        name: "",
        cart: [],
      });
      console.log("Uslo je");
    }
  }, [isJWTValid, setUserCart]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="bg-success col-auto col-md-2 min-vh-100 w-auto">
          <Link
            to="/"
            className="text-decoration-none text-white d-flex align-items-center"
          >
            <div className="row mt-3 mb-2">
              <div className="col-md-4">
                <img width={70} height={70} src={beerIcon} />
              </div>
              <div className="col-md-1">
                <h2 className="mt-3">MacGrath</h2>
              </div>
            </div>
          </Link>
          {userCart.name !== "" ? (
            <ul className="nav nav-tabs flex-column">
              <li className="nav-item nav-tabs">
                <Link to="/products" className="text-decoration-none">
                  <div className="row mt-3 mb-2">
                    <div className="col-md-3">
                      <i className="bi bi-amd text-white display-4" />
                    </div>
                    <div className="col-md-1">
                      <h3 className="mt-3 text-white">Products</h3>
                    </div>
                  </div>
                </Link>
              </li>
              <li className="nav-item nav-tabs">
                <Link to="/manufacturers" className="text-decoration-none">
                  <div className="row mt-3 mb-2">
                    <div className="col-md-3">
                      <i className="bi bi-file-earmark-person-fill text-white display-4" />
                    </div>
                    <div className="col-md-1">
                      <h3 className="mt-3 text-white">Manufacturers</h3>
                    </div>
                  </div>
                </Link>
              </li>
              <li className="nav-item nav-tabs">
                <Link to="/cart" className="text-decoration-none">
                  <div className="row mt-3 mb-2">
                    <div className="col-md-3">
                      <i className="bi bi-cart-x-fill text-white display-4" />
                    </div>
                    <div className="col-md-1">
                      <h3 className="mt-3 text-white">Cart</h3>
                    </div>
                  </div>
                </Link>
              </li>
              <li className="nav-item nav-tabs">
                <Link to="/wishlist" className="text-decoration-none">
                  <div className="row mt-3 mb-2">
                    <div className="col-md-3">
                      <i className="bi bi-moon-stars-fill text-white display-4" />
                    </div>
                    <div className="col-md-1">
                      <h3 className="mt-3 text-white">Wishlist</h3>
                    </div>
                  </div>
                </Link>
              </li>
              <li className="nav-item nav-tabs">
                <Link to="/obrana" className="text-decoration-none">
                  <div className="row mt-3 mb-2">
                    <div className="col-md-3">
                      <i className="bi bi-shield-fill-x text-white display-4" />
                    </div>
                    <div className="col-md-1">
                      <h3 className="mt-3 text-white">Obrana</h3>
                    </div>
                  </div>
                </Link>
              </li>
              <li className="nav-item" onClick={logoutHandler}>
                <button id={styles.logoutButton}>
                  <div className="row mt-3 mb-2">
                    <div className="col-md-5">
                      <i className="bi bi-person-dash-fill text-white display-4" />
                    </div>
                    <div className="col-md-1">
                      <h3 className="mt-3 text-white">Logout</h3>
                    </div>
                  </div>
                </button>
              </li>
            </ul>
          ) : (
            <ul className="nav nav-tabs flex-column">
              <li className="nav-item nav-tabs">
                <Link to="/login" className="text-decoration-none">
                  <div className="row mt-3 mb-2">
                    <div className="col-md-3">
                      <i className="bi bi-radioactive text-white display-4" />
                    </div>
                    <div className="col-md-1">
                      <h3 className="mt-3 text-white">Login</h3>
                    </div>
                  </div>
                </Link>
              </li>
              <li className="nav-item nav-tabs">
                <Link to="/register" className="text-decoration-none">
                  <div className="row mt-3 mb-2">
                    <div className="col-md-3">
                      <i className="bi bi-radar text-white display-4" />
                    </div>
                    <div className="col-md-1">
                      <h3 className="mt-3 text-white">Register</h3>
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
          )}
          <h5 id={styles.madeBy}>Made by: Ilario Batistić</h5>
        </div>
      </div>
    </div>
  );
}