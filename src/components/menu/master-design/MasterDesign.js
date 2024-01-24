import { Link } from "react-router-dom";
import classes from "./MasterDesign.module.css";
import { getPermissionsObj } from "../../../util/auth";

export default function MasterDesign(){

    const permissions= getPermissionsObj();

    return <div className={classes["master-design"]}>
        <h1 className={classes.head}>Master Design</h1>
        <div className={classes.master}>
            {permissions && permissions.features.MasterDesign.edit ?
            <Link className={classes.button} to="/master-design/creation"
                disabled={permissions && !permissions.features.MasterDesign.edit}
            >
                Create Master Design
            </Link>:
            <span className={classes.disabled}>
                Create Master Design
            </span>
            }
        </div>
    </div>
}