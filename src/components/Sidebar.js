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
  AiOutlineFileText,
  AiOutlineSetting,
  AiOutlineLogout,
} from "react-icons/ai";
import { IoBagHandle } from 'react-icons/io5';
import { BiBarChart, BiLineChart, BiShoppingBag, BiTable } from 'react-icons/bi';
import { GiBigDiamondRing, GiCutDiamond, GiDiamondHard, GiDiamonds, GiDoubleNecklace, GiNecklaceDisplay, GiRingBox } from 'react-icons/gi';
import {FaRegUserCircle} from 'react-icons/fa';
import {GoStop} from 'react-icons/go';
import {TbPackages} from "react-icons/tb";
import { MdOutlineVisibility } from 'react-icons/md';
import { useEffect, useState } from "react";
import { getAccountLoader, getPermissionsObj } from "../util/auth";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const submit = useSubmit();
  const token = useRouteLoaderData("root");
  const account = getAccountLoader();
  const permissionsObj = getPermissionsObj();
  console.log("permissions object:", permissionsObj)

  console.log(account);

  const accountType = account?.accountType;

  console.log("account type is", accountType);

  function handleLogout() {
    submit(null, { method: "post", action: "/logout" });
  }
  // initial={{x:-30, opacity:0}} animate={{x:0, opacity:1}} exit={{x:-30, opacity:0}}
  // permissionsObj.accountIds.includes(account.id) && permissionsObj.features["MasterDesign"].view &&
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
        {<NavLink
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
            padding: "0.05rem 0",
            width: "100%",
            borderRadius: "1rem",
          }}
        >
          <BiBarChart style={{ padding: "0 1rem 0" , fontSize: 55}} />
          <span
            style={{
              fontSize: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 0 0 0",
            }}
          >
            Dashboard
          </span>
        </NavLink>}
        {(accountType === "Manufacturer" && permissionsObj.accountIds.includes(account.id) && permissionsObj.features["MasterDesign"].view) && <NavLink
          onClick={() => dispatch(uiActions.toggleDashboard())}
          to="/master-design"
          className={({ isActive }) => (isActive ? classes.active : "")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            margin: "0rem 0",
            padding: "0.05rem 0",
            width: "100%",
            borderRadius: "1rem",
          }}
        >
          <GiDiamondHard style={{ padding: "0 1rem" , fontSize: 55}} />
          <span
            style={{
              fontSize: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 0 0 0rem",
            }}
          >
            Master Design
          </span>
        </NavLink>}

        {accountType === "system" && <NavLink
          onClick={() => dispatch(uiActions.toggleDashboard())}
          to="/account-and-user"
          className={({ isActive }) => (isActive ? classes.active : "")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            margin: "0rem 0",
            padding: "0.05rem 0",
            width: "100%",
            borderRadius: "1rem",
          }}
        >
          <FaRegUserCircle style={{ padding: "0 1rem" , fontSize: 55}} />
          <span
            style={{
              fontSize: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 0 0 0rem",
            }}
          >
            Account & User
          </span>
        </NavLink>}

        {accountType === "system" && <NavLink
          onClick={() => dispatch(uiActions.toggleDashboard())}
          to="/permissions"
          className={({ isActive }) => (isActive ? classes.active : "")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            margin: "0rem 0",
            padding: "0.05rem 0",
            width: "100%",
            borderRadius: "1rem",
          }}
        >
          <GoStop style={{ padding: "0 1rem" , fontSize: 55}} />
          <span
            style={{
              fontSize: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 0 0 0rem",
            }}
          >
            Permissions
          </span>
        </NavLink>}

        {accountType === "system" && <NavLink
          onClick={() => dispatch(uiActions.toggleDashboard())}
          to="/packages"
          className={({ isActive }) => (isActive ? classes.active : "")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            margin: "0rem 0",
            padding: "0.05rem 0",
            width: "100%",
            borderRadius: "1rem",
          }}
        >
          <TbPackages style={{ padding: "0 1rem" , fontSize: 55}} />
          <span
            style={{
              fontSize: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 0 0 0rem",
            }}
          >
            Packages
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
            padding: "0.05rem 0",
            width: "100%",
            borderRadius: "1rem",
          }}
        >
          <GiNecklaceDisplay style={{ padding: "0 1rem 0", fontSize: 55 }} />
          <span
            style={{
              fontSize: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 0 0 0rem",
            }}
          >
            Catalogue
          </span>
        </NavLink>}
        {accountType === "Retailer" && <NavLink
          onClick={() => {
            dispatch(uiActions.closeCatalogueDesignDetails());
            dispatch(uiActions.toggleDashboard());
          }}
          to="/orders"
          className={({ isActive }) => (isActive ? classes.active : "")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            margin: "0rem 0",
            padding: "0.05rem 0",
            width: "100%",
            borderRadius: "1rem",
          }}
        >
          <BiShoppingBag style={{ padding: "0 1rem 0", fontSize: 55 }} />
          <span
            style={{
              fontSize: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 0 0 0rem",
            }}
          >
            Orders
          </span>
        </NavLink>}
        
        {accountType === "Manufacturer" && permissionsObj.accountIds.includes(account.id) && permissionsObj.features["ViewDesigns"].view && <NavLink
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
            padding: "0.05rem 0",
            width: "100%",
            borderRadius: "1rem",
          }}
        >
          <GiNecklaceDisplay style={{ padding: "0 1rem", fontSize: 55 }} />
          <span
            style={{
              fontSize: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 0 0 0rem",
            }}
          >
            View Designs
          </span>
        </NavLink>}

        {(accountType === "Manufacturer" &&  permissionsObj.accountIds.includes(account.id) && permissionsObj.features["OrderForm"].view) && <NavLink
          onClick={() => dispatch(uiActions.toggleDashboard())}
          to="/order-form"
          className={({ isActive }) => (isActive ? classes.active : "")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            margin: "0rem 0",
            padding: "0.05rem 0",
            width: "100%",
            borderRadius: "1rem",
          }}
        >
          <BiShoppingBag style={{ padding: "0 1rem" , fontSize: 55}} />
          <span
            style={{
              fontSize: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 0 0 0rem",
            }}
          >
            Order Form
          </span>
        </NavLink>}

        {((accountType === "Manufacturer" &&  permissionsObj.accountIds.includes(account.id) && permissionsObj.features["Reports"].view) || (accountType==="system") || (accountType==="Retailer")) && <NavLink
          onClick={() => {
            dispatch(uiActions.closeCatalogueDesignDetails());
            dispatch(uiActions.toggleDashboard());
          }}
          to="/reports"
          className={({ isActive }) => (isActive ? classes.active : "")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            margin: "0rem 0",
            padding: "0.05rem 0",
            width: "100%",
            borderRadius: "1rem",
          }}
        >
          <AiOutlineFileText style={{ padding: "0 1rem", fontSize: 55}} />
          <span
            style={{
              fontSize: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 0 0 0rem",
            }}
          >
            Reports
          </span>
        </NavLink>}
        
        {((accountType === "Manufacturer" &&  permissionsObj.accountIds.includes(account.id) && permissionsObj.features["Reports"].view) || (accountType==="system") || (accountType==="Retailer") )&& <NavLink
          onClick={() => dispatch(uiActions.toggleDashboard())}
          to="/settings"
          className={({ isActive }) => (isActive ? classes.active : "")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            margin: "0rem 0",
            padding: "0.05rem 0",
            width: "100%",
            borderRadius: "1rem",
          }}
        >
          <AiOutlineSetting style={{ padding: "0 1rem", fontSize: 55 }} />
          <span
            style={{
              fontSize: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 0 0 0rem",
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
            padding: "0.05rem 0",
            width: "100%",
            borderRadius: "1rem",
          }}
        >
          <AiOutlineLogout style={{ padding: "0 1rem" , fontSize: 55}} />
          <span
            style={{
              fontSize: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 0 0 0rem",
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