import { Outlet } from "react-router-dom";
import classes from "./RootLayout.module.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

export default function RootLayout(){
    // function handleContextMenu(event){
    //     event.preventDefault();
    // }
    // onContextMenu={handleContextMenu}

    const isDashboardOpen= useSelector(state=>state.ui.isDashboardOpen);
 //key="sidebar" key="right"
    return <motion.div  className={classes.root}>
                <Header/>
                {isDashboardOpen && <Sidebar key="sidebar"/>} 
                <motion.div className={`${classes.right} ${!isDashboardOpen ? classes.full : ""}`}>
                    <Outlet/>
                </motion.div>
    </motion.div>
     
}