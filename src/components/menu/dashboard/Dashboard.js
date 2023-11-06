
import BarChartClassComponent from "./BarChartClassComponent";
import Chart from "./Chart";
import classes from "./Dashboard.module.css";
import PieChartClassComponent from "./PieChartClassComponent";
import Tile from "./Tile";

export default function Dashboard(){
    return <div className={classes["whole"]}>
        {/* <h1>My Dashboard</h1> */}
        <menu className={classes["whole-tiles-and-charts"]}>
            <section className={classes["whole-tiles"]}>
                <Tile title="Completed tasks" count={0} filterCount={1} />
                <Tile title="Incomplete tasks" count={34} filterCount={2} />
                <Tile title="Overdue tasks" count={3} filterCount={1} />
                <Tile title="Total tasks" count={34} />
            </section>
            <section className={classes["whole-charts"]}>
                <Chart title="Incomplete tasks by project" chartComponent={<BarChartClassComponent/>} companyName="Tasks in catalogue" />
                <Chart title="Tasks by completion status this month" chartComponent={<PieChartClassComponent/>} filterCount={1} companyName="Tasks in catalogue" />
            </section>
        </menu>
        
    </div>
}