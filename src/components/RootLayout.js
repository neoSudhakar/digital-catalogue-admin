import { Outlet, useLoaderData } from "react-router-dom";
import classes from "./RootLayout.module.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

export default function RootLayout(){
    function handleContextMenu(event){
        event.preventDefault();
    }
    

    const token = useLoaderData();

    const isDashboardOpen= useSelector(state=>state.ui.isDashboardOpen);
 //key="sidebar" key="right"
    return <motion.div  className={`${classes.root} ${!token ? classes.auth : ""}`} onContextMenu={handleContextMenu}>
                <Header/>
                { token && (
                    <>
                        {isDashboardOpen && <Sidebar key="sidebar"/>} 
                        <motion.div className={`${classes.right} ${!isDashboardOpen ? classes.full : ""}`}>
                            <Outlet/>
                        </motion.div>
                    </>
                     )}
                {!token && <Outlet/>}
                            
    </motion.div>
     
}