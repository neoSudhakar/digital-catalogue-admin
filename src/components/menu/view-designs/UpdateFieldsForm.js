import Button from "../../../UI/Button";
import ErrorBlock from "../../../UI/ErrorBlock";
import classes from "./DesignFields.module.css";
import { useState, useEffect } from "react";

export default function UpdateFieldsForm({cardItem, onAction, onCloseModal, updateDesignFieldsIsPending}){


  const [groupData, setGroupData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [styleData, setStyleData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [modelData, setModelData] = useState([]);
    const [sizeData, setSizeData] = useState([]);
    const [workerData, setWorkerData] = useState([]);

  const fetchGroupData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/groups');
      
      if (response.status === 204) {
       
      } 
      else if(response.status === 200){
        const data = await response.json();
        //console.log(data);
        setGroupData(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchCategoryData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/categories');
      
      if (response.status === 204) {
       
      } 
      else if(response.status === 200){
        const data = await response.json();
        //console.log(data);
        setCategoryData(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchStyleData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/styles');
      
      if (response.status === 204) {
       
      } 
      else if(response.status === 200){
        const data = await response.json();
        //console.log(data);
        setStyleData(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchProductData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/products');
      
      if (response.status === 204) {
       
      } 
      else if(response.status === 200){
        const data = await response.json();
        //console.log(data);
        setProductData(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchModelData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/models');
      
      if (response.status === 204) {
       
      } 
      else if(response.status === 200){
        const data = await response.json();
        //console.log(data);
        setModelData(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchSizeData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/sizes');
      
      if (response.status === 204) {
       
      } 
      else if(response.status === 200){
        const data = await response.json();
        //console.log(data);
        setSizeData(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchWorkerData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/workers');
      
      if (response.status === 204) {
       
      } 
      else if(response.status === 200){
        const data = await response.json();
        //console.log(data);
        setWorkerData(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(()=> {
    fetchCategoryData();
    fetchGroupData();
    fetchModelData();
        fetchProductData();
        fetchSizeData();
        fetchStyleData();
        fetchWorkerData();
  },[]);

console.log(cardItem.mainGroup)

const [mainGroupVal, setMainGroupVal] = useState(cardItem.mainGroup? cardItem.mainGroup: "");
const [categoryVal, setCategoryVal] = useState(cardItem.category? cardItem.category: "");
const [styleVal, setStyleVal] = useState(cardItem.style? cardItem.style: "");
const [productVal, setProductVal] = useState(cardItem.product? cardItem.product: "");
const [sizeVal, setSizeVal] = useState(cardItem.size? cardItem.size: "");
const [modelVal, setModelVal] = useState(cardItem.model? cardItem.model: "");
const [workerVal, setWorkerVal] = useState(cardItem.worker? cardItem.worker: "");

function handleOnChangeMaingrp(event) {
  setMainGroupVal(event.target.value)
}

function handleOnChangeCategory(event) {
  setCategoryVal(event.target.value)
}

function handleOnChangeStyle(event) {
  setStyleVal(event.target.value)
}

function handleOnChangeProduct(event) {
  setProductVal(event.target.value)
}

function handleOnChangeModel(event) {
  setModelVal(event.target.value)
}

function handleOnChangeSize(event) {
  setSizeVal(event.target.value)
}

function handleOnChangeWorker(event) {
  setWorkerVal(event.target.value)
}

    function handleSubmit(event) {
        event.preventDefault();
    
        const form = new FormData(event.target);
        const formData = Object.fromEntries(form);

        onAction(formData);

        // onCloseModal();
    }
    
    const cancelStyleObj = {
        backgroundColor: "white",
        color: "blue",
        border: "1px solid blue",
    };
    const saveStyleObj = { backgroundColor: "blue" };

    return(
    <>
    <form className={classes.form} onSubmit={handleSubmit} style={{paddingTop: "2rem"}}>
    <div className={classes["input-grp"]}>
      <label htmlFor="designNumber">Design Number</label>
      <input
        id="designNumber"
        name="designNumber"
        type="number"
        defaultValue={cardItem.designNumber}
      />
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="mainGroup">Main Group</label>
      {/* <input
        id="mainGroup"
        name="mainGroup"
        type="text"
        defaultValue={cardItem.mainGroup}
      /> */}
      <select name="mainGroup" id="mainGroup" value={mainGroupVal} onChange={handleOnChangeMaingrp} >
        <option value="" disabled hidden>
          Select an option
        </option>
        {groupData && groupData.map((item) =>(
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="category">Category</label>
      {/* <input
        id="category"
        name="category"
        type="text"
        defaultValue={cardItem.category}
      /> */}
      <select name="category" id="category" value={categoryVal} onChange={handleOnChangeCategory} >
        <option value="" disabled hidden>
          Select an option
        </option>
        {categoryData && categoryData.map((item) =>(
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="style">Style</label>
      {/* <input
        id="style"
        name="style"
        type="text"
        defaultValue={cardItem.style}
      /> */}
      <select name="style" id="style" value={styleVal} onChange={handleOnChangeStyle}>
        <option value="" disabled hidden>
          Select an option
        </option>
        {styleData && styleData.map((item) =>(
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="product">Product</label>
      {/* <input
        id="product"
        name="product"
        type="text"
        defaultValue={cardItem.product}
      /> */}
      <select name="product" id="product" value={productVal} onChange={handleOnChangeProduct} >
        <option value="" disabled hidden>
          Select an option
        </option>
        {productData && productData.map((item) =>(
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="model">Model</label>
      {/* <input
        id="model"
        name="model"
        type="text"
        defaultValue={cardItem.model}
      /> */}
      <select name="model" id="model" value={modelVal} onChange={handleOnChangeModel} >
        <option value="" disabled hidden>
          Select an option
        </option>
        {modelData && modelData.map((item) =>(
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="size">Size</label>
      {/* <input
        id="size"
        name="size"
        type="text"
        defaultValue={cardItem.size}
      /> */}
      <select name="size" id="size" value={sizeVal} onChange={handleOnChangeSize} >
        <option value="" disabled hidden>
          Select an option
        </option>
        {sizeData && sizeData.map((item) =>(
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="worker">Worker</label>
      {/* <input
        id="worker"
        name="worker"
        type="text"
        defaultValue={cardItem.worker}
      /> */}
      <select name="worker" id="worker" value={workerVal} onChange={handleOnChangeWorker} >
        <option value="" disabled hidden>
          Select an option
        </option>
        {workerData && workerData.map((item) =>(
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="pieces">Pieces</label>
      <input
        id="pieces"
        name="pieces"
        type="number"
        defaultValue={cardItem.pieces}
      />
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="grossWeight">Gross Wt</label>
      <input
        id="grossWeight"
        name="grossWeight"
        type="number"
        defaultValue={cardItem.grossWeight}
      />
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="stoneWeight">Stone Wt</label>
      <input
        id="stoneWeight"
        name="stoneWeight"
        type="number"
        defaultValue={cardItem.stoneWeight}
      />
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="netWeight">Net Wt</label>
      <input
        id="netWeight"
        name="netWeight"
        type="number"
        defaultValue={cardItem.netWeight}
      />
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="componentWeight">Component Wt</label>
      <input
        id="componentWeight"
        name="componentWeight"
        type="number"
        defaultValue={cardItem.componentWeight}
      />
    </div>
    <div className={classes["input-grp"]}>
      <label htmlFor="ghatWeight">Ghat Wt</label>
      <input
        id="ghatWeight"
        name="ghatWeight"
        type="number"
        defaultValue={cardItem.ghatWt}
      />
    </div>
    <div className={classes.actions}>
      {!updateDesignFieldsIsPending && <div>
        <Button
          key="back"
          type="button"
          style={cancelStyleObj}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button key="submit" style={saveStyleObj} type="submit">
          Update
        </Button>
      </div>}
      {updateDesignFieldsIsPending && <p>Updating...</p>}
    </div>
  </form>
  </>
  )
}