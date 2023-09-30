import { useDispatch, useSelector } from "react-redux";
import TogglerIcon from "../icons/toggler-icon";
import classes from "./Header.module.css";
import { uiActions } from "../store/ui-slice";
import { motion } from "framer-motion";
import LikeIcon from "../icons/like-icon";
import { Link } from "react-router-dom";

export default function Header(){
    const dispatch = useDispatch();
    const isDashboardOpen= useSelector(state=>state.ui.isDashboardOpen);

    function handleToggleDashboard(){
        dispatch(uiActions.toggleDashboard());
    }

    return <motion.header className={`${classes.header} ${!isDashboardOpen ? classes.full : ""}`}>
    <p className={classes.toggler} onClick={handleToggleDashboard}><TogglerIcon/></p>
    <nav>
        <ul className={classes.list}>
            <li>
                <Link><LikeIcon/></Link>
            </li>
            
        </ul>
    </nav>
</motion.header>
}