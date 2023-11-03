import { Link } from "react-router-dom";
import classes from "./MasterDesign.module.css";

export default function MasterDesign(){

    return <div className={classes["master-design"]}>
        <h1 className={classes.head}>MasterDesign</h1>
        <div className={classes.master}>
            <Link className={classes.button} to="/master-design/creation">
                Create Master Design
            </Link>
        </div>
    </div>
}