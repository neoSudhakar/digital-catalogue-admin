import FilterIcon from "../../../icons/filter-icon";
import classes from "./Dashboard.module.css";

export default function Dashboard(){
    return <div className={classes["whole"]}>
        <h1>My Dashboard</h1>
        <menu className={classes["whole-tiles-and-charts"]}>
            <section className={classes["whole-tiles"]}>
                <div className={classes["each-tile"]}>
                    <span className={classes["title"]}>Title</span>
                    <span className={classes["count"]}>0</span>
                    <div className={classes["filter"]}>
                        <FilterIcon/>
                        <span>No Filters</span></div>
                </div>
                <div className={classes["each-tile"]}>
                    <span className={classes["title"]}>Title</span>
                    <span className={classes["count"]}>0</span>
                    <div className={classes["filter"]}>
                        <FilterIcon/>
                        <span>No Filters</span></div>
                </div>
                <div className={classes["each-tile"]}>
                    <span className={classes["title"]}>Title</span>
                    <span className={classes["count"]}>0</span>
                    <div className={classes["filter"]}>
                        <FilterIcon/>
                        <span>No Filters</span></div>
                </div>
                <div className={classes["each-tile"]}>
                    <span className={classes["title"]}>Title</span>
                    <span className={classes["count"]}>0</span>
                    <div className={classes["filter"]}>
                        <FilterIcon/>
                        <span>No Filters</span></div>
                </div>
            </section>
        </menu>
        
    </div>
}