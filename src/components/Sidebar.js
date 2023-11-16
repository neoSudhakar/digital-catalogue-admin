import {
  Form,
  Link,
  NavLink,
  useNavigate,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";
import Logo from "../assets/logo.svg";
import classes from "./Sidebar.module.css";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/ui-slice";
import {
  AiFillSlackSquare,
  AiFillSketchSquare,
  AiFillCodeSandboxSquare,
  AiOutlineCodepenCircle,
  AiOutlineLogout,
} from "react-icons/ai";
import { useEffect, useState } from "react";
import { getAccountLoader } from "../util/auth";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const submit = useSubmit();
  const token = useRouteLoaderData("root");
  const account = getAccountLoader();

  console.log(account);

  const accountType = account?.accountType;

  console.log("account type is", accountType);

  function handleLogout() {
    submit(null, { method: "post", action: "/logout" });
  }
  // initial={{x:-30, opacity:0}} animate={{x:0, opacity:1}} exit={{x:-30, opacity:0}}
  return (
    <motion.div className={classes.sidebar}>
      <section
        className={classes["fields"]}
        style={{
          marginTop: "1rem",
          padding: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <NavLink
          onClick={() => dispatch(uiActions.toggleDashboard())}
          to="/"
          className={({ isActive }) => (isActive ? classes.active : "")}
          end
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            margin: "0rem 0",
            padding: "0.7rem 0",
            width: "100%",
            borderRadius: "1rem",
          }}
        >
          <AiFillSlackSquare style={{ padding: "0 1rem 0 0" }} />
          <span
            style={{
              fontSize: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 0 0 0.5rem",
            }}
          >
            Dashboard
          </span>
        </NavLink>
        {accountType === "Manufacturer" && <NavLink
          onClick={() => dispatch(uiActions.toggleDashboard())}
          to="/master-design"
          className={({ isActive }) => (isActive ? classes.active : "")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            margin: "0rem 0",
            padding: "0.7rem 0",
            width: "100%",
            borderRadius: "1rem",
          }}
        >
          <AiFillSketchSquare style={{ padding: "0 1rem 0 0" }} />
          <span
            style={{
              fontSize: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 0 0 0.5rem",
            }}
          >
            Mater Design
          </span>
        </NavLink>}
        {accountType === "Retailer" && <NavLink
          onClick={() => {
            dispatch(uiActions.closeCatalogueDesignDetails());
            dispatch(uiActions.toggleDashboard());
          }}
          to="/catalogue"
          className={({ isActive }) => (isActive ? classes.active : "")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            margin: "0rem 0",
            padding: "0.7rem 0",
            width: "100%",
            borderRadius: "1rem",
          }}
        >
          <AiFillCodeSandboxSquare style={{ padding: "0 1rem 0 0" }} />
          <span
            style={{
              fontSize: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 0 0 0.5rem",
            }}
          >
            Catalogue
          </span>
        </NavLink>}
        {accountType === "Manufacturer" && <NavLink
          onClick={() => {
            dispatch(uiActions.closeDesignDetails());
            dispatch(uiActions.toggleDashboard());
          }}
          to="/view-designs"
          className={({ isActive }) => (isActive ? classes.active : "")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            margin: "0rem 0",
            padding: "0.7rem 0",
            width: "100%",
            borderRadius: "1rem",
          }}
        >
          <AiFillCodeSandboxSquare style={{ padding: "0 1rem 0 0" }} />
          <span
            style={{
              fontSize: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 0 0 0.5rem",
            }}
          >
            View Designs
          </span>
        </NavLink>}
        {accountType === "Manufacturer" && <NavLink
          onClick={() => dispatch(uiActions.toggleDashboard())}
          to="/order-form"
          className={({ isActive }) => (isActive ? classes.active : "")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            margin: "0rem 0",
            padding: "0.7rem 0",
            width: "100%",
            borderRadius: "1rem",
          }}
        >
          <AiOutlineCodepenCircle style={{ padding: "0 1rem 0 0" }} />
          <span
            style={{
              fontSize: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 0 0 0.5rem",
            }}
          >
            Order Form
          </span>
        </NavLink>}
        {accountType === "Manufacturer" && <NavLink
          onClick={() => dispatch(uiActions.toggleDashboard())}
          to="/settings"
          className={({ isActive }) => (isActive ? classes.active : "")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            margin: "0rem 0",
            padding: "0.7rem 0",
            width: "100%",
            borderRadius: "1rem",
          }}
        >
          <AiOutlineCodepenCircle style={{ padding: "0 1rem 0 0" }} />
          <span
            style={{
              fontSize: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 0 0 0.5rem",
            }}
          >
            Settings
          </span>
        </NavLink>}

        <Link
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            margin: "0rem 0",
            padding: "0.7rem 0",
            width: "100%",
            borderRadius: "1rem",
          }}
        >
          <AiOutlineLogout style={{ padding: "0 1rem 0 0" }} />
          <span
            style={{
              fontSize: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 0 0 0.5rem",
            }}
          >
            Logout
          </span>
        </Link>
        {/* {token && <Link onClick={handleLogout}>Logout</Link>} */}
      </section>
      {/* {token && <Form method="post" action="/logout" className={classes.action}>
            <button className={classes.logout}>Logout</button>
        </Form>} */}
    </motion.div>
  );
}
