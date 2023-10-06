import { useDispatch, useSelector } from "react-redux";
import TogglerIcon from "../icons/toggler-icon";
import classes from "./Header.module.css";
import { uiActions } from "../store/ui-slice";
import { motion } from "framer-motion";
import LikeIcon from "../icons/like-icon";
import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";
import Logo from "../assets/logo.svg";
import CartIcon from "../icons/cart-icon";
import ChatIcon from "../icons/chat-icon";
import NotificationIcon from "../icons/notification-icon";
import Image from "../assets/upload-image.png";
import ChevronDownIcon from "../icons/chevron-down-icon";
import { useState } from "react";

export default function Header() {
  const token = useRouteLoaderData("root");
  const submit = useSubmit();
  const dispatch = useDispatch();
  const isDashboardOpen = useSelector((state) => state.ui.isDashboardOpen);

  function handleToggleDashboard() {
    dispatch(uiActions.toggleDashboard());
  }

  const [showUser, setShowUser] = useState(false);

  function handleShowUser() {
    setShowUser((prevState) => !prevState);
  }

  function handleLogout() {
    handleShowUser();
    submit(null, { method: "post", action: "/logout" });
  }

  return (
    <motion.header className={`${classes.header} ${classes.full}`}>
      <div className={classes["logo-toggler"]}>
        {token && (
          <p className={classes.toggler} onClick={handleToggleDashboard}>
            <TogglerIcon />
          </p>
        )}
        <div className={classes["logo-container"]}>
          <img src={Logo} />
          <h2>Digital Catalogue</h2>
        </div>
      </div>

      {token && <nav>
        <ul className={classes.list}>
          <li>
            <Link>
              <CartIcon />
            </Link>
          </li>
          <li>
            <Link>
              <ChatIcon />
            </Link>
          </li>
          <li>
            <Link>
              <NotificationIcon />
            </Link>
          </li>
          <li>
            <div className={classes["user-image-text"]}>
              <img
                className={classes.image}
                src={
                  "https://media.istockphoto.com/id/1090878494/photo/close-up-portrait-of-young-smiling-handsome-man-in-blue-polo-shirt-isolated-on-gray-background.webp?b=1&s=170667a&w=0&k=20&c=c3TaqVe9-0EcHl7mjO-9YChSvGBDhvzUai6obs1Ibz4="
                }
              />
              <p className={classes.para}>
                Hi, <span className={classes.name}>Michael</span>
              </p>
            </div>
          </li>
          <li>
            <span className={classes.chevron} onClick={handleShowUser}>
                <ChevronDownIcon />
            </span>
            {showUser && <div className={classes["user-details"]}>
                        <div className={classes["user-container"]}>
                            <div className={classes.icon}>M</div>
                            <div className={classes.content}>
                                <h3>Michael</h3>
                                <span className={classes.email}>michael123@gmail.com</span>
                            </div>
                        </div>
                        
                        <div className={classes.fields}>
                            <p>My Cart</p>
                            <p>Wishlist</p>
                        </div>

                        <div className={classes.fields}>
                            <p>Notifications</p>
                            <p>Messages</p>
                        </div>
                        
                        <div className={classes.fields}>
                            <p>Public Profile</p>
                            <p>Edit Profile</p>
                        </div>
                        
                        <div className={classes.fields}>
                            <p>Help</p>
                            <p>Settings</p>
                        </div>
                        <div className={classes.actions}>
                            <button className={classes.logout}  onClick={handleLogout}>Logout</button>
                        </div>
                        
            </div>}
          </li>
        </ul>
      </nav>}
    </motion.header>
  );
}
