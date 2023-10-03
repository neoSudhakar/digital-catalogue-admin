import { useRef, useState } from "react";
import CreationTable from "./CreationTable";
import classes from "./MasterCreation.module.css";
import useInput from "../../../hooks/use-input";
import { useNavigate } from "react-router-dom";
import { Drawer, Button, Upload, Modal, Select } from "antd";
import { PlusOutlined } from '@ant-design/icons';
// import UploadImage from "../../../assets/upload-image.png"
//import classes from "./DesignDetails.module.css";
import ReactImageMagnify from "react-image-magnify";
import axios, { Axios } from "axios";
import SelectComponent from "./Select";
import UploadImage from "../../../assets/upload-image.png";

export default function MasterCreation() {

  const navigate = useNavigate();
 
  //const [image_urlTouch, setImageUrlTouch] = useState(false);
  //const image_urlHasErr = image_urlTouch && !image_url;
  const [rowDataArr, setRowDataArr] = useState([]);
  const today = new Date().toISOString().slice(0, 10);
  const [created_date, setCreatedDate] = useState(today);
  const [enteredRowData, setEnteredRowData] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const [fileNew, setFileNew] = useState(null);
  const [imageUrl, setImageUrl] = useState([]);


  function created_dateHandleChange(event) {
    setCreatedDate(event.target.value);
  }
  // handle image -----------------------------

  const handleImageUpload = async () => {

    fileList.forEach(async (fl, index) => {
      if (!fl.url && !fl.preview) {
        fl.preview = await getBase64(fl.originFileObj);
      }
 
      setImageUrl([...imageUrl, (fl.url || fl.preview)]);
    })

    setIsDrawerOpen(false);
  }


  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  

  const handleCancel = () => setPreviewOpen(false);


  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };


  const handleUploadChange = ({ fileList: newFileList }) => setFileList(newFileList);



  const uploadJSONFiles = (event) => {
    event.preventDefault();
    let formData = new FormData();
    const enteredFormData = {
      createdDate: created_date,
      mainGroup: main_group,
      category: category,
      style: style,
      product: product,
      model: model,
      size: size,
      worker: worker,
      pieces: pieces,
      crossWeight: gross_weight,
      stoneWeight: stone_weight,
      setWeight: net_weight,
      componentWeight: component_weight,
      ghatWt: ghat_weight,
      remark: remark,
      designDetails: enteredRowData,
    };
    for (let key of Object.keys(event.target.files)) {
      if (key !== 'length') {
        formData.append('images', event.target.files[key]);
      }
    }
    formData.append('design',
      new Blob([JSON.stringify(enteredFormData)], {
        type: 'application/json'
      }));
    fetch('http://localhost:8080/api/designs', {
      method: 'POST',
      body: formData
    }).then(response => response.json())
      .then(result => console.log('Files successfully uploaded!', result))
      .catch(error => console.log('error occurred!', error));
  }


  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

 
  //-----------------------------------------------

  const {
    inputVal: main_group,
    isValid: main_groupIsValid,
    hasErr: main_groupHasErr,
    touchFn: main_groupTouchFn,
    resetFn: main_groupResetFn,
    handleBlur: main_groupHandleBlur,
    handleChange: main_groupHandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);


  const {
    inputVal: category,
    isValid: categoryIsValid,
    hasErr: categoryHasErr,
    touchFn: categoryTouchFn,
    resetFn: categoryResetFn,
    handleBlur: categoryHandleBlur,
    handleChange: categoryHandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);

  const {
    inputVal: style,
    isValid: styleIsValid,
    hasErr: styleHasErr,
    touchFn: styleTouchFn,
    resetFn: styleResetFn,
    handleBlur: styleHandleBlur,
    handleChange: styleHandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);

  // const {
  //   inputVal: product,
  //   isValid: productIsValid,
  //   hasErr: productHasErr,
  //   touchFn: productTouchFn,
  //   resetFn: productResetFn,
  //   handleBlur: productHandleBlur,
  //   handleChange: productHandleChange,
  // } = useInput((inputValue) => inputValue.trim().length !== 0);

  const [product,setProduct] =useState();

  const productHandleChange=(value)=>{
    console.log("VAlue: ", value);
    setProduct((prev)=>value);
    console.log(product);
  }

  const {
    inputVal: model,
    isValid: modelIsValid,
    hasErr: modelHasErr,
    touchFn: modelTouchFn,
    resetFn: modelResetFn,
    handleBlur: modelHandleBlur,
    handleChange: modelHandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);

  const {
    inputVal: size,
    isValid: sizeIsValid,
    hasErr: sizeHasErr,
    touchFn: sizeTouchFn,
    resetFn: sizeResetFn,
    handleBlur: sizeHandleBlur,
    handleChange: sizeHandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);

  const {
    inputVal: worker,
    isValid: workerIsValid,
    hasErr: workerHasErr,
    touchFn: workerTouchFn,
    resetFn: workerResetFn,
    handleBlur: workerHandleBlur,
    handleChange: workerHandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);

  const {
    inputVal: pieces,
    isValid: piecesIsValid,
    hasErr: piecesHasErr,
    touchFn: piecesTouchFn,
    resetFn: piecesResetFn,
    handleBlur: piecesHandleBlur,
    handleChange: piecesHandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);

  const {
    inputVal: gross_weight,
    isValid: gross_weightIsValid,
    hasErr: gross_weightHasErr,
    touchFn: gross_weightTouchFn,
    resetFn: gross_weightResetFn,
    handleBlur: gross_weightHandleBlur,
    handleChange: gross_weightHandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);

  const {
    inputVal: stone_weight,
    isValid: stone_weightIsValid,
    hasErr: stone_weightHasErr,
    touchFn: stone_weightTouchFn,
    resetFn: stone_weightResetFn,
    handleBlur: stone_weightHandleBlur,
    handleChange: stone_weightHandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);

  const {
    inputVal: net_weight,
    isValid: net_weightIsValid,
    hasErr: net_weightHasErr,
    touchFn: net_weightTouchFn,
    resetFn: net_weightResetFn,
    handleBlur: net_weightHandleBlur,
    handleChange: net_weightHandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);

  const {
    inputVal: component_weight,
    isValid: component_weightIsValid,
    hasErr: component_weightHasErr,
    touchFn: component_weightTouchFn,
    resetFn: component_weightResetFn,
    handleBlur: component_weightHandleBlur,
    handleChange: component_weightHandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);

  const {
    inputVal: ghat_weight,
    isValid: ghat_weightIsValid,
    hasErr: ghat_weightHasErr,
    touchFn: ghat_weightTouchFn,
    resetFn: ghat_weightResetFn,
    handleBlur: ghat_weightHandleBlur,
    handleChange: ghat_weightHandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);

  const {
    inputVal: remark,
    isValid: remarkIsValid,
    hasErr: remarkHasErr,
    touchFn: remarkTouchFn,
    resetFn: remarkResetFn,
    handleBlur: remarkHandleBlur,
    handleChange: remarkHandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);

  const {
    inputVal: type,
    isValid: typeIsValid,
    hasErr: typeHasErr,
    touchFn: typeTouchFn,
    resetFn: typeResetFn,
    handleBlur: typeHandleBlur,
    handleChange: typeHandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);

  const {
    inputVal: stone_group,
    isValid: stone_groupIsValid,
    hasErr: stone_groupHasErr,
    touchFn: stone_groupTouchFn,
    resetFn: stone_groupResetFn,
    handleBlur: stone_groupHandleBlur,
    handleChange: stone_groupHandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);

  const {
    inputVal: pieces1,
    isValid: pieces1IsValid,
    hasErr: pieces1HasErr,
    touchFn: pieces1TouchFn,
    resetFn: pieces1ResetFn,
    handleBlur: pieces1HandleBlur,
    handleChange: pieces1HandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);

  const {
    inputVal: stone_weight1,
    isValid: stone_weight1IsValid,
    hasErr: stone_weight1HasErr,
    touchFn: stone_weight1TouchFn,
    resetFn: stone_weight1ResetFn,
    handleBlur: stone_weight1HandleBlur,
    handleChange: stone_weight1HandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);

  let formIsValid = false;

  if (
    main_groupIsValid &&
    categoryIsValid &&
    styleIsValid &&
    productIsValid &&
    modelIsValid &&
    sizeIsValid &&
    workerIsValid &&
    piecesIsValid &&
    gross_weightIsValid &&
    stone_weightIsValid &&
    net_weightIsValid &&
    component_weightIsValid &&
    ghat_weightIsValid &&
    remarkIsValid &&
    typeIsValid &&
    stone_groupIsValid &&
    pieces1IsValid &&
    stone_weight1IsValid
    // image_url
  ) {
    formIsValid = true;
  }

  let rowDataIsValid = false;

  if (
    typeIsValid &&
    stone_groupIsValid &&
    pieces1IsValid &&
    stone_weight1IsValid
  ) {
    rowDataIsValid = true;
  }


  function ResetAll() {
    main_groupResetFn();
    categoryResetFn();
    styleResetFn();
    productResetFn();
    modelResetFn();
    sizeResetFn();
    workerResetFn();
    piecesResetFn();
    gross_weightResetFn();
    stone_weightResetFn();
    net_weightResetFn();
    component_weightResetFn();
    ghat_weightResetFn();
    remarkResetFn();
    typeResetFn();
    stone_groupResetFn();
    pieces1ResetFn();
    stone_weight1ResetFn();

    // setImageUrl();
    // setImageUrlTouch(false);
  }

  function handleAdd() {
   
    typeTouchFn();
    stone_groupTouchFn();
    pieces1TouchFn();
    stone_weight1TouchFn();

    if (!rowDataIsValid) {
      return;
    }

    const enteredData = {
      type: type,
      stoneGroup: stone_group,
      sieces: pieces1,
      stoneWeight: stone_weight1,
      unitOfMeasurement: "Grms/Cts"
    };

    setEnteredRowData((prev) => [...prev, { ...enteredData }]);

    const index = rowDataArr.length + 1;
    const formattedRowData = {
      Sno: index,
      type,
      stoneGroup: stone_group,
      stoneWt: stone_weight1,
      pcs: pieces1,
      UOM: "Grms",
    };

    setRowDataArr((prev) => [...prev, { ...formattedRowData }]);
  }



  const handleSave = (event) => {
    
    
  //  setImageUrlTouch(true);
    main_groupTouchFn();
    categoryTouchFn();
    styleTouchFn();
    productTouchFn();
    modelTouchFn();
    sizeTouchFn();
    workerTouchFn();
    piecesTouchFn();
    gross_weightTouchFn();
    stone_weightTouchFn();
    net_weightTouchFn();
    component_weightTouchFn();
    ghat_weightTouchFn();
    remarkTouchFn();
    typeTouchFn();
    stone_groupTouchFn();
    pieces1TouchFn();
    stone_weight1TouchFn();


    let formData = new FormData();
    const enteredFormData = {
      createdDate: created_date,
      mainGroup: main_group,
      category: category,
      style: style,
      product: product,
      model: model,
      size: size,
      worker: worker,
      pieces: pieces,
      crossWeight: gross_weight,
      stoneWeight: stone_weight,
      setWeight: net_weight,
      componentWeight: component_weight,
      ghatWt: ghat_weight,
      remark: remark,
      designDetails: enteredRowData,
    };

    formData.append('images', fileList);
   
    console.log(formData.get('images'))
    formData.append('design',
      new Blob([JSON.stringify(enteredFormData)], {
        type: 'application/json'
      }));

    fetch('http://localhost:8080/api/designs', {
      method: 'POST',
      body: formData,
    }).then(response => response.json())
      .then(res => console.log('Files successfully uploaded!', res))
      .catch(err => console.log('error occurred!', err));
     // alert.show("Design Added..")
      window.alert("Master Design Added..")
      ResetAll();
      handleExit();
  }





  function handleExit() {
    navigate("/master-design");
  }




  const [isDrawerOpen, setIsDrawerOpen] = useState(false);


  function handleAddImage() {
    setIsDrawerOpen(true);
  }


  function handleCloseDrawer() {
    setIsDrawerOpen(false);
  }



  const main_groupClasses = `${classes.group} ${main_groupHasErr ? classes["invalid"] : ""}`;
  const categoryClasses = `${classes.group} ${categoryHasErr ? classes["invalid"] : ""}`;
  const styleClasses = `${classes.group} ${styleHasErr ? classes["invalid"] : ""}`;
  // const productClasses = `${classes.group} ${productHasErr ? classes["invalid"] : ""}`;
  const modelClasses = `${classes.group} ${modelHasErr ? classes["invalid"] : ""}`;
  const sizeClasses = `${classes.group} ${sizeHasErr ? classes["invalid"] : ""}`;
  const workerClasses = `${classes.group} ${workerHasErr ? classes["invalid"] : ""}`;

  const piecesClasses = `${classes["num-group"]} ${piecesHasErr ? classes["invalid"] : ""}`;
  const gross_weightClasses = `${classes["num-group"]} ${gross_weightHasErr ? classes["invalid"] : ""}`;
  const stone_weightClasses = `${classes["num-group"]} ${stone_weightHasErr ? classes["invalid"] : ""}`;
  const net_weightClasses = `${classes["num-group"]} ${net_weightHasErr ? classes["invalid"] : ""}`;
  const component_weightClasses = `${classes["num-group"]} ${component_weightHasErr ? classes["invalid"] : ""}`;
  const ghat_weightClasses = `${classes["num-group"]} ${ghat_weightHasErr ? classes["invalid"] : ""}`;

  const remarkClasses = `${classes.remarks} ${remarkHasErr ? classes["invalid"] : ""}`;

  const typeClasses = `${classes.group} ${typeHasErr ? classes["invalid"] : ""}`;
  const stone_groupClasses = `${classes.group} ${stone_groupHasErr ? classes["invalid"] : ""}`;
  const pieces1Classes = `${classes["num-group"]} ${pieces1HasErr ? classes["invalid"] : ""}`;
  const stone_weight1Classes = `${classes["num-group"]} ${stone_weight1HasErr ? classes["invalid"] : ""}`;

  const [selectedFiles, setSelectedFiles] = useState(null);
  const [msg, setMsg] = useState(null);


  function handleSelectFiles(event) {
    setSelectedFiles(event.target.files);
  }


  function handleUploadFiles() {
    if (!selectedFiles) {
      setMsg("No file Selected!");
      return;
    }
    const fd = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      fd.append(`file${i + 1}`, selectedFiles[i]);
    }
  }

  
  return (
    <>
      <main className={classes.container}>
        <header className={classes.header}>
          <p>Master Design Creation</p>
        </header>
        <div className={classes["below-header"]}>
          <div className={classes.below}>
            <fieldset>
              <legend>Entry Details</legend>
              <div className={classes.form}>
                <input
                  value={created_date}
                  onChange={created_dateHandleChange}
                  //   onBlur={created_dateHandleBlur}
                  className={classes.date}
                  type="date"
                />
                <section className={classes.fields}>
                  <div className={main_groupClasses} style={{ minWidth: "30%" }}>
                    <label htmlFor="main_group">Main Group</label>
                    <select
                      id="main_group"
                      value={main_group}
                      onBlur={main_groupHandleBlur}
                      onChange={main_groupHandleChange}
                      name="main_group"
                      placeholder="Select a main group"
                    >
                      <option value="" disabled hidden>
                        Select an option
                      </option>
                      <option value="Diamond">Diamond</option>
                      <option value="Gold">Gold</option>
                      <option value="Silver">Silver</option>
                    </select>
                    {main_groupHasErr && <p className={classes.err}>Select a main group!</p>}                    
                  </div>
                  <div className={categoryClasses} style={{ minWidth: "30%" }}>
                    <label htmlFor="category">Category</label>
                    <select
                      value={category}
                      onBlur={categoryHandleBlur}
                      //  defaultValue="Diamond Jewelery"
                      onChange={categoryHandleChange}
                      id="category"
                      name="category"
                      placeholder="Select a category"
                    >
                      <option value="" disabled hidden>
                        Select an option
                      </option>
                      <option value="Diamond Jewelery">Diamond Jewellery</option>
                      <option value="Gold Jewelery">Gold Jewellery</option>
                      <option value="Silver Jewelery">Silver Jewellery</option>
                    </select>
                    {categoryHasErr && <p className={classes.err}>Select a category!</p>}
                  </div>
                  <div className={styleClasses} style={{ minWidth: "30%" }}>
                    <label htmlFor="style">Style</label>
                    <select
                      value={style}
                      // defaultValue="Style1"
                      onBlur={styleHandleBlur}
                      onChange={styleHandleChange}
                      id="style"
                      name="style"
                      placeholder={"Select a style"}
                    >
                      <option value="Style1">Style1</option>
                      <option value="" disabled hidden>
                        Select an option
                      </option>
                      <option value="Style2">Style2</option>
                      <option value="Style3">Style3</option>
                    </select>
                    {styleHasErr && <p className={classes.err}>Select a style!</p>}
                  </div>
                  <div className={classes.group} style={{ minWidth: "30%" }}>
                    <label htmlFor="product">Product</label>
                    {/* <select
                      value={product}
                      //  defaultValue="Product1"
                      onBlur={productHandleBlur}
                      onChange={productHandleChange}
                      id="product"
                      name="product"
                      placeholder={"Select a product"}
                    >
                      <option value="Product1">Product1</option>
                      <option value="" disabled hidden>
                        Select an option
                      </option>
                      <option value="Product2">Product2</option>
                      <option value="Product3">Product3</option>
                    </select>
                    {productHasErr && <p className={classes.err}>Select a product!</p>}
                    </select> */}
                    {/* {productHasErr && <p className={classes.err}>Select a product!</p>} */}
                    <Select
                                placeholder={"Select a product"}
                                options={[
                                    {
                                        value: "product1",
                                        label: "Product1"
                                    },
                                    {
                                        value: "product2",
                                        label: "Product2"
                                    },
                                    {
                                        value: "product3",
                                        label: "Product3"
                                    }
                                ]}
                                name="product"
                                onChange={productHandleChange}
                                value={product}
                            />
                  </div>
                  <div className={modelClasses}>
                    <label htmlFor="model">Model</label>
                    <select
                      value={model}
                      //  defaultValue="Model1"
                      onBlur={modelHandleBlur}
                      onChange={modelHandleChange}
                      id="model"
                      name="model"
                      placeholder={"Select model"}
                    >
                      <option value="Model1">Model1</option>
                      <option value="" disabled hidden>
                        Select an option
                      </option>
                      <option value="Model2">Model2</option>
                      <option value="Model3">Model3</option>
                    </select>
                    {modelHasErr && <p className={classes.err}>Select a model!</p>}
                  </div>
                  <div className={sizeClasses}>
                    <label htmlFor="size">Size</label>
                    <select
                      value={size}
                      onBlur={sizeHandleBlur}
                      //   defaultValue="Size1"
                      onChange={sizeHandleChange}
                      id="size"
                      name="size"
                      placeholder={"Select size"}
                    >
                      <option value="Size1">Size1</option>
                      <option value="" disabled hidden>
                        Select an option
                      </option>
                      <option value="Size2">Size2</option>
                      <option value="Size3">Size3</option>
                    </select>
                    {sizeHasErr && <p className={classes.err}>Select a size!</p>}
                  </div>
                  <div className={workerClasses}>
                    <label htmlFor="worker">Worker</label>
                    <select
                      value={worker}
                      onBlur={workerHandleBlur}
                      //  defaultValue="Worker1"
                      onChange={workerHandleChange}
                      id="worker"
                      name="worker"
                      placeholder={"Select worker"}
                    >
                      <option value="Worker1">Worker1</option>
                      <option value="" disabled hidden>
                        Select an option
                      </option>
                      <option value="Worker2">Worker2</option>
                      <option value="Worker3">Worker3</option>
                    </select>
                    {workerHasErr && <p className={classes.err}>Select one worker!</p>}
                  </div>
                  <div className={piecesClasses} style={{ maxWidth: "10%" }}>
                    <label htmlFor="pieces">Pcs</label>
                    {/* <input name="pcs" type="number" defaultValue={1}/> */}
                    <input
                      value={pieces}
                      onBlur={piecesHandleBlur}
                      onChange={piecesHandleChange}
                      id="pieces"
                      type="number"
                      name="pieces"
                      placeholder="Enter Pcs"
                    />
                    {piecesHasErr && <p className={classes.err}>Enter valid number!</p>}
                  </div>
                  <div className={gross_weightClasses}>
                    <label htmlFor="gross_weight">Gross Wt</label>
                    <input
                      value={gross_weight}
                      onBlur={gross_weightHandleBlur}
                      onChange={gross_weightHandleChange}
                      id="gross_weight"
                      type="number"
                      name="gross_weight"
                      placeholder="Enter Gross Wt"
                      width="100%"
                      height="2rem"
                    />
                    {gross_weightHasErr && <p className={classes.err}>Enter valid gross wt!</p>}
                  </div>
                  <div className={stone_weightClasses}>
                    <label htmlFor="stone_weight">stone Wt</label>
                    <input
                      value={stone_weight}
                      onBlur={stone_weightHandleBlur}
                      onChange={stone_weightHandleChange}
                      id="stone_weight"
                      name="stone_weight"
                      placeholder="Enter stone Wt"
                      width="100%"
                      type="number"
                      height="2rem"
                    />
                    {stone_weightHasErr && <p className={classes.err}>Enter valid stone wt!</p>}
                  </div>
                  <div className={net_weightClasses}>
                    <label htmlFor="net_weight">Net Wt</label>
                    <input
                      value={net_weight}
                      onBlur={net_weightHandleBlur}
                      onChange={net_weightHandleChange}
                      id="net_weight"
                      name="net_weight"
                      type="number"
                      placeholder="Enter Net Wt"
                      width="100%"
                      height="2rem"
                    />
                    {net_weightHasErr && <p className={classes.err}>Enter valid net wt!</p>}
                  </div>
                  <div className={component_weightClasses}>
                    <label htmlFor="component_weight">Com- Wt</label>
                    <input
                      value={component_weight}
                      onBlur={component_weightHandleBlur}
                      onChange={component_weightHandleChange}
                      id="component_weight"
                      type="number"
                      name="component_weight"
                      placeholder="Enter Com- Wt"
                      width="100%"
                      height="2rem"
                    />
                    {component_weightHasErr && <p className={classes.err}>Enter valid com- wt!</p>}
                  </div>
                  <div className={ghat_weightClasses}>
                    <label htmlFor="ghat_weight">Ghat Wt</label>
                    <input
                      value={ghat_weight}
                      onBlur={ghat_weightHandleBlur}
                      onChange={ghat_weightHandleChange}
                      id="ghat_weight"
                      name="ghat_weight"
                      placeholder="Enter Ghat Wt"
                      width="100%"
                      height="2rem"
                      type="number"
                    />
                    {ghat_weightHasErr && <p className={classes.err}>Enter valid ghat wt!</p>}
                  </div>
                  <div className={remarkClasses}>
                    <label htmlFor="remarks">Remarks</label>
                    <div>
                      <input
                        value={remark}
                        onBlur={remarkHandleBlur}
                        onChange={remarkHandleChange}
                        type="text"
                        id="remarks"
                        placeholder="Description"
                        name="remarks"
                      />
                      {remarkHasErr && <p className={classes.err}>Enter valid description!</p>}
                    </div>
                  </div>
                  <div className={typeClasses} style={{ minWidth: "20%" }}>
                    <label htmlFor="type">Type</label>
                    <select
                      value={type}
                      onBlur={typeHandleBlur}
                      onChange={typeHandleChange}
                      id="type"
                      name="type"
                      placeholder={"Select a type"}
                    >
                      <option value="" disabled hidden>
                        Select an option
                      </option>
                      <option value="Type1">Type1</option>
                      <option value="Type2">Type2</option>
                      <option value="Type3">Type3</option>
                    </select>
                    {typeHasErr && <p className={classes.err}>Select a type!</p>}
                  </div>
                  <div className={stone_groupClasses} style={{ minWidth: "20%" }}>
                    <label htmlFor="stone_group">Stone Group</label>
                    <select
                      value={stone_group}
                      onBlur={stone_groupHandleBlur}
                      onChange={stone_groupHandleChange}
                      id="stone_group"
                      name="stone_group"
                      placeholder={"Select stone group"}
                    >
                      <option value="Stone Group 1">Stone Group 1</option>
                      <option value="" disabled hidden>
                        Select an option
                      </option>
                      <option value="Stone Group 2">Stone Group 2</option>
                    </select>
                    {stone_groupHasErr && <p className={classes.err}>Select a stone group!</p>}
                  </div>
                  <div className={pieces1Classes} style={{ maxWidth: "10%" }}>
                    <label htmlFor="pieces1">Pcs</label>
                    <input
                      value={pieces1}
                      onBlur={pieces1HandleBlur}
                      onChange={pieces1HandleChange}
                      id="pieces1"
                      name="pieces1"
                      placeholder="Enter Pcs"
                      width="100%"
                      height="2rem"
                    />
                    {pieces1HasErr && <p className={classes.err}>Enter valid number!</p>}
                  </div>
                  <div className={stone_weight1Classes}>
                    <label htmlFor="stone_weight1">Weight</label>
                    <input
                      value={stone_weight1}
                      onBlur={stone_weight1HandleBlur}
                      onChange={stone_weight1HandleChange}
                      id="stone_weight1"
                      name="stone_weight1"
                      placeholder="Enter Gross Wt"
                      width="100%"
                      height="2rem"
                    />
                    {stone_weight1HasErr && <p className={classes.err}>Select a stone wt!</p>}
                  </div>
                  <div className={classes["button-container"]}>
                    <button onClick={handleAdd}>ADD</button>
                  </div>
                </section>
              </div>
              <CreationTable rowDataArr={rowDataArr} />
              <div className={classes.actions}>
                <Button className={classes.button} onClick={handleAddImage} style={{ marginRight: "3rem" }}>Add Image</Button>
                <Button className={classes.button} onClick={handleSave}>Save</Button>
                <Button className={classes.button} onClick={ResetAll}>Clear</Button>
                <Button className={classes.button} onClick={handleExit}>Exit</Button>
              </div>
            </fieldset>
            <div className={classes.image}>
              {fileList.length <= 0 ?
                //C:\Users\GaneshSurna\Downloads\WhatsApp Image 2023-10-03 at 2.39.48 PM.jpeg
                //"https://nxtdiv-digital-catalogue.s3.ap-south-1.amazonaws.com/DigitalCatalogue/2023/8/30/20230930202809573_Jewellery.jpg"
                <img src={UploadImage} alt="Design Image" style={{ width: '100%' }} /> :
                <img src={imageUrl} alt="Design Image" style={{ width: '100%' }} />}

            </div>
          </div>
        </div>
      </main>
      <Drawer
        title="ADD IMAGES"
        placement="right"
        open={isDrawerOpen}
        width={"40%"}
        closable={true}
        onClose={handleCloseDrawer}
      >
        <div className={classes.drawer}>
          {/*<input type="file" multiple onChange={handleSelectFiles} />
            <Button onClick={handleUploadFiles}>Upload File</Button>
          {msg && <span>{msg}</span>}
          */}
          <h2>Add Images</h2>
          <div style={{ alignItems: 'center', justifyItems: 'center' }}>
           <Upload
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleUploadChange}
          >
            {fileList.length >= 4 ? null : uploadButton}
          </Upload> 
            {/* <div className="uk-margin-medium-top">
              <label>Upload Files</label>
              <input type="file"
                onChange={(event) => uploadJSONFiles(event)}
                multiple />
            </div> */}
          </div>
          <div style={{ alignItems: 'center', justifyContent: 'center', float: 'center' }}>
            <Button onClick={handleImageUpload}>
              <b>Upload</b>
            </Button>
          </div>
          <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img
              alt="example"
              style={{
                width: '100%',
              }}
              src={previewImage}
            />
          </Modal>

        </div>
      </Drawer>
    </>
  );



}
