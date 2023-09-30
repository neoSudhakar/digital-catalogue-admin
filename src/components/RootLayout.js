import { Outlet } from "react-router-dom";
import classes from "./RootLayout.module.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

export default function RootLayout(){
    const isDashboardOpen= useSelector(state=>state.ui.isDashboardOpen);
 //key="sidebar" key="right"
    return <motion.div className={classes.root}>
            <AnimatePresence mode="sync">
                {isDashboardOpen && <Sidebar key="sidebar"/>} 
                <motion.div key="right" className={`${classes.right} ${!isDashboardOpen ? classes.full : ""}`}>
                    <Header/>
                    <Outlet/>
                </motion.div>
            </AnimatePresence>
    </motion.div>
     
}