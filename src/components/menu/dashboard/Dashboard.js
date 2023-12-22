
import { useEffect, useState } from "react";
import { getAccountLoader, getUserId } from "../../../util/auth";
import BarChartClassComponent from "./BarChartClassComponent";
import Chart from "./Chart";
import classes from "./Dashboard.module.css";
import PieChartClassComponent from "./PieChartClassComponent";
import Tile from "./Tile";
import { useQuery } from "@tanstack/react-query";
import { fetchAccountOrdersForManufacturer, fetchAccounts, fetchAccountsForSystem, fetchAccountsVsUsersForSystem, fetchAllDesigns, fetchAssignedDesignsForManufacturer, fetchCatalogueDesigns, fetchOrderedDesignsForUser, fetchOrders, fetchOrdersForManufacturer, fetchUsersForSystem } from "../../../util/http";
import { useNavigate } from "react-router-dom";

export default function Dashboard(){
    const navigate = useNavigate()

    const {accountType, id: accountId} = getAccountLoader()
    const userId = getUserId();

    const isRetailer = accountType === "Retailer";
    const isManufacturer = accountType === "Manufacturer";
    const isSystem = accountType === "system";


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

    const {data: accountsForSystemData} = useQuery({
        queryKey: ["AccountsForSystem"],
        queryFn: fetchAccountsForSystem,
    })

    if(accountsForSystemData){
        console.log("accountsForSystemData is",accountsForSystemData);
    }

    const {data: usersForSystemData} = useQuery({
        queryKey: ["usersForSystem"],
        queryFn: fetchUsersForSystem,
    })

    if(usersForSystemData){
        console.log("usersForSystemData is",usersForSystemData);
    }


    if(assignedDesignsData){
        console.log("assignedDesignsData is", assignedDesignsData);
    }


    function handleClick(identifier){
        if(identifier === "total-designs"){
            if(isRetailer){
                navigate("/catalogue");
            }
            else{
                navigate("/view-designs");
            }
        }

        if(identifier === "orders"){
            navigate("/order-form");
        }

        if(identifier === "retailers"){
            navigate("/settings");
        }

        if(identifier === "orders-by-retailers"){
            if(!isRetailer){
                navigate("/order-form");
            }
        }
    }


    return <div className={classes["whole"]}>
        {/* <h1>My Dashboard</h1> */}
        <menu className={classes["whole-tiles-and-charts"]}>
            <section className={classes["whole-tiles"]}>
                {isSystem && <Tile title="Accounts" count={accountsForSystemData ? accountsForSystemData.length : 0} filterCount={1} />}
                {isSystem && <Tile title="Users" count={usersForSystemData ? usersForSystemData.length : 0} filterCount={1} />}
                {!isSystem && <Tile title="Total designs" count={designsData ? designsData.length : 0} filterCount={1} onClick={()=>handleClick("total-designs")} />}
                {isRetailer && <Tile title="Ordered designs" count={orderedDesignsForUser ? orderedDesignsForUser.length : 0} filterCount={2} />}
                {isManufacturer && <Tile title="Assigned designs" count={assignedDesignsData ? assignedDesignsData.length : 0} filterCount={2} />}
                {isManufacturer && <Tile title="Orders" count={ordersData ? ordersData.length : 0} filterCount={1} onClick={()=>handleClick("orders")} />}
                {isManufacturer && <Tile title="Retailers" count={retailerAccountsCount}  onClick={()=>handleClick("retailers")}/>}
            </section>
            <section className={classes["whole-charts"]}>
                <Chart title={`${!isSystem ? "Orders by retailers" : "Accounts Vs Users"}`} chartComponent={<BarChartClassComponent dashboard isSystem={isSystem}/>} companyName="Tasks in catalogue" onClick={()=>handleClick("orders-by-retailers")} />
                {!isSystem && <Chart title="Recent orders" chartComponent={<PieChartClassComponent/>} filterCount={1} companyName="Tasks in catalogue" />}
            </section>
        </menu>
        
    </div>
}