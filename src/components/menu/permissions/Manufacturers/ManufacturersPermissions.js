import { Button, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { fetchAccountsForSystem } from '../../../../util/http'
import { useQuery } from '@tanstack/react-query';
import styles from "../Permissions.module.css"
import classes from "./ManufacturersPermissions.module.css"
import MultipleSelect from '../../../../UI/select-multiple/MultipleSelect';

export default function ManufacturersPermissions() {
    const [selectedAccountIdsArr, setSelectedAccountIdsArr] = useState([]);

    const [options, setOptions] = useState([]);

    const {data: accountsForSystemData} = useQuery({
        queryKey: ["AccountsForSystem"],
        queryFn: fetchAccountsForSystem,
    })

    useEffect(()=>{
        if(accountsForSystemData){
            const mapped_list=accountsForSystemData.map((account)=>{
                return { label: account.name, value: account.id };
            })
            setOptions(mapped_list);
        }
    },[accountsForSystemData]);

    const DUMMY_FEATURES = [
        {key: "Dashboard", name: "Dashboard",},
        {key: "MasterDesign", name: "Master Design",},
        {key: "ViewDesigns", name: "View Designs",},
        {key: "OrderForm", name: "Order Form",},
        {key: "Reports", name: "Reports",},
        {key: "Settings", name: "Settings",},
    ]

    const DUMMY_FEATURE_PERMISSIONS ={
        Dashboard: {view: false, edit: false, delete: false},
        MasterDesign: {view: false, edit: false, delete: false},
        ViewDesigns: {view: false, edit: false, delete: false},
        OrderForm: {view: false, edit: false, delete: false},
        Reports: {view: false, edit: false, delete: false},
        Settings: {view: false, edit: false, delete: false},

    }

    const [feature_permissions, setFeaturePermissions] = useState(DUMMY_FEATURE_PERMISSIONS); 

    function handleCheckboxChange(feature, identifier){
        setFeaturePermissions((prev)=>{
            return {...prev, [feature]: {...prev[feature], [identifier]: !prev[feature][identifier]}};
        });
    }
    
    function handleSave(){
        console.log("feature_permissions obj : ", feature_permissions);
        console.log("selected account ids array :", selectedAccountIdsArr);
        const finalObject = {accountIds: selectedAccountIdsArr, features: feature_permissions};
        console.log("final Object : ", finalObject);
        localStorage.setItem("PERMISSIONS", JSON.stringify(finalObject));
        // setSelectedAccountIdsArr([]);
        // setFeaturePermissions(DUMMY_FEATURE_PERMISSIONS);
    }

  return (
    <div style={{paddingTop: "1rem", width: "100%"}}>

      <label>Select Manufacturers : </label>
      <MultipleSelect options={options} onSetSelectedValues={setSelectedAccountIdsArr}/>

      <section className={classes["table-container"]}>
        <table className={classes["table"]}>
            <thead>
                <tr>
                    <th>Feature</th>
                    <th>Permissions</th>
                </tr>
            </thead>
            <tbody>
                {DUMMY_FEATURES.map((feature)=>(
                    <tr key={feature.key}>
                        <td>{feature.name}</td>
                        <td>
                                <input type="checkbox" id={"View"+feature.key} onChange={()=>handleCheckboxChange(feature.key,"view")} />
                                <label className={classes["view"]} htmlFor={"View"+feature.key}>View</label>

                                <input type="checkbox" id={"Edit"+feature.key} onChange={()=>handleCheckboxChange(feature.key,"edit")}  />
                                <label className={classes["edit"]} htmlFor={"Edit"+feature.key}>Edit</label>

                                <input type="checkbox" id={"Delete"+feature.key} onChange={()=>handleCheckboxChange(feature.key,"delete")}  />
                                <label className={classes["delete"]} htmlFor={"Delete"+feature.key}>Delete</label>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <Button className={classes["save"]} onClick={handleSave} disabled={selectedAccountIdsArr.length === 0}>Save</Button>
      </section>
    </div>
  )
}
