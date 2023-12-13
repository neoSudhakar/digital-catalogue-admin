import { Button, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { fetchAccountsForSystem } from '../../../../util/http'
import { useQuery } from '@tanstack/react-query';
import styles from "../Permissions.module.css"
import classes from "./ManufacturersPermissions.module.css"
import MultipleSelect from '../../../../UI/select-multiple/MultipleSelect';

export default function ManufacturersPermissions() {

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

    const [selectedManufacturer, setSelectedManufacturer] = useState();

    function handleManufacturerChange(value){
        setSelectedManufacturer(value);
    }

    const DUMMY_FEATURES = [
        {key: "Dashboard", name: "Dashboard", view: false, edit: false, delete: false},
        {key: "MasterDesign", name: "Master Design", view: false, edit: false, delete: false},
        {key: "ViewDesigns", name: "View Designs", view: false, edit: false, delete: false},
        {key: "OrderForm", name: "Order Form", view: false, edit: false, delete: false},
        {key: "Reports", name: "Reports", view: false, edit: false, delete: false},
        {key: "Settings", name: "Settings", view: false, edit: false, delete: false},
    ]

    const [features, setFeatures] = useState(DUMMY_FEATURES);

    function handleCheckboxChange(index, identifier){
        setFeatures((prev)=>{
            const list = [...prev];
            const selectedFeature = prev[index];
            const updatedSelectedFeature = {...selectedFeature, [identifier]: !selectedFeature[identifier]}
            list[index] = updatedSelectedFeature;
            return [...list];
        });
    }
    
    function handleSave(){
        console.log("features : ", features);
    }

  return (
    <div style={{paddingTop: "1rem", width: "100%"}}>
      {/* <Select className={styles["select"]} id='manufacturer' defaultValue="" onChange={handleManufacturerChange}>
            <Select.Option value="">All</Select.Option>
            {accountsForSystemData && accountsForSystemData.map((account)=>(
                <Select.Option key={account.id} value={account.id}>{account.name}</Select.Option>
            ))}
      </Select> */}

      <MultipleSelect options={options}/>

      <section className={classes["table-container"]}>
        <table className={classes["table"]}>
            <thead>
                <tr>
                    <th>Feature</th>
                    <th>Permissions</th>
                </tr>
            </thead>
            <tbody>
                {DUMMY_FEATURES.map((feature, index)=>(
                    <tr key={feature.key}>
                        <td>{feature.name}</td>
                        <td>
                                <input type="checkbox" id={"View"+feature.key} onChange={()=>handleCheckboxChange(index, "view")} />
                                <label className={classes["view"]} htmlFor={"View"+feature.key}>View</label>

                                <input type="checkbox" id={"Edit"+feature.key} onChange={()=>handleCheckboxChange(index, "edit")}  />
                                <label className={classes["edit"]} htmlFor={"Edit"+feature.key}>Edit</label>

                                <input type="checkbox" id={"Delete"+feature.key} onChange={()=>handleCheckboxChange(index, "delete")}  />
                                <label className={classes["delete"]} htmlFor={"Delete"+feature.key}>Delete</label>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <Button className={classes["save"]} onClick={handleSave}>Save</Button>
      </section>
    </div>
  )
}
