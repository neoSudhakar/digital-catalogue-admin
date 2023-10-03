import { useDispatch, useSelector } from "react-redux";
import TogglerIcon from "../icons/toggler-icon";
import classes from "./Header.module.css";
import { uiActions } from "../store/ui-slice";
import { motion } from "framer-motion";
import LikeIcon from "../icons/like-icon";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";

export default function Header(){
    const dispatch = useDispatch();
    const isDashboardOpen= useSelector(state=>state.ui.isDashboardOpen);

    function handleToggleDashboard(){
        dispatch(uiActions.toggleDashboard());
    }

    return <motion.header className={`${classes.header} ${classes.full}`}>
    <div className={classes["logo-toggler"]}>
        <p className={classes.toggler} onClick={handleToggleDashboard}><TogglerIcon/></p>
        <div className={classes["logo-container"]}>
                <img src={Logo}/>
                <h2>Digital Catalogue</h2>
        </div>
    </div>
    
    <nav>
        <ul className={classes.list}>
            <li>
                <Link><LikeIcon/></Link>
            </li>
            
        </ul>
    </nav>
</motion.header>
}