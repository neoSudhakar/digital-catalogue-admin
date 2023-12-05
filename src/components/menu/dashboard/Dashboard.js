
import { useEffect, useState } from "react";
import { getAccountLoader, getUserId } from "../../../util/auth";
import BarChartClassComponent from "./BarChartClassComponent";
import Chart from "./Chart";
import classes from "./Dashboard.module.css";
import PieChartClassComponent from "./PieChartClassComponent";
import Tile from "./Tile";
import { useQuery } from "@tanstack/react-query";
import { fetchAccountOrdersForManufacturer, fetchAccounts, fetchAllDesigns, fetchAssignedDesignsForManufacturer, fetchCatalogueDesigns, fetchOrderedDesignsForUser, fetchOrders, fetchOrdersForManufacturer } from "../../../util/http";

export default function Dashboard(){
    const {accountType, id: accountId} = getAccountLoader()
    const userId = getUserId();

    const isRetailer = accountType === "Retailer";


    const {data: designsData} = useQuery({
        queryKey:  [`${isRetailer ? "catalogueDesigns" : "designs"}`],
        queryFn: ({signal})=> (isRetailer ? fetchCatalogueDesigns({signal, accountId: accountId}) : fetchAllDesigns()),
    })

    const {data: ordersData} = useQuery({
        queryKey: ["manufacturer-orders"],
        queryFn: fetchOrdersForManufacturer ,
    });

    const {data: accountsData} = useQuery({
        queryKey: ["accounts"],
        queryFn: fetchAccounts,
    })

    const [retailerAccountsCount, setRetailerAccountsCount] = useState(0);

    useEffect(()=>{
        if(accountsData){
            const retailers = accountsData.filter((account)=>{
                return account.accountType === "Retailer"
            })
            setRetailerAccountsCount(retailers.length);
        }
    },[accountsData])

    const {data: assignedDesignsData} = useQuery({
        queryKey: ["assignedDesigns"],
        queryFn: fetchAssignedDesignsForManufacturer,
    })

    const {data: orderedDesignsForUser} = useQuery({
        queryKey: ["ordered-designs", {userId: userId}],
        queryFn: ({signal})=>fetchOrderedDesignsForUser({signal, userId}),
    })



    if(assignedDesignsData){
        console.log("assignedDesignsData is", assignedDesignsData);
    }


    return <div className={classes["whole"]}>
        {/* <h1>My Dashboard</h1> */}
        <menu className={classes["whole-tiles-and-charts"]}>
            <section className={classes["whole-tiles"]}>
                <Tile title="Total designs" count={designsData ? designsData.length : 0} filterCount={1} />
                {isRetailer && <Tile title="Ordered designs" count={orderedDesignsForUser ? orderedDesignsForUser.length : 0} filterCount={2} />}
                {!isRetailer && <Tile title="Assigned designs" count={assignedDesignsData ? assignedDesignsData.length : 0} filterCount={2} />}
                {!isRetailer && <Tile title="Orders" count={ordersData ? ordersData.length : 0} filterCount={1} />}
                {!isRetailer && <Tile title="Retailers" count={retailerAccountsCount}/>}
            </section>
            <section className={classes["whole-charts"]}>
                <Chart title="Orders by retailers" chartComponent={<BarChartClassComponent dashboard/>} companyName="Tasks in catalogue" />
                <Chart title="Tasks by completion status this month" chartComponent={<PieChartClassComponent/>} filterCount={1} companyName="Tasks in catalogue" />
            </section>
        </menu>
        
    </div>
}