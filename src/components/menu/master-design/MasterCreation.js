import { useRef, useState } from "react";
import CreationTable from "./CreationTable";
import classes from "./MasterCreation.module.css";
// import SelectComponent from "./Select";
// import InputComponent from "./Input";
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
import ImageComponent from "./ImageComponent";
import useSelect from "../../../hooks/useSelect";

export default function MasterCreation() {

  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState([]);
  //const [image_urlTouch, setImageUrlTouch] = useState(false);
  const [imageUrlFile, setImageUrlFile] = useState([]);

  //const image_urlHasErr = image_urlTouch && !image_url;

  const [rowDataArr, setRowDataArr] = useState([]);

  const today = new Date().toISOString().slice(0, 10);
  const [createdDate, setCreatedDate] = useState(today);

  function createdDateHandleChange(event) {
    setCreatedDate(event.target.value);
  }

  const [enteredRowData, setEnteredRowData] = useState([]);
  // const [enteredFormData, setEnteredFormData] = useState();

  // handle image -----------------------------

 


  const handleImageUpload = async () => {

    /*  fileList.forEach(async (fl, index) => {
      if (!fl.url && !fl.preview) {
        fl.preview = await getBase64(fl.originFileObj);
      }
 
      setImageUrl([...imageUrl, (fl.url || fl.preview)]);
     
      // setImageUrlFile(formData);
   // }
   // )
   //setImageUrl(fileNew[0]);
    setIsDrawerOpen(false);
    //  handleImageData(formData);
  } */
    // )
    setIsDrawerOpen(false);
}



    


  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // const imageUpload = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const [fileNew, setFileNew] = useState();
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
      createdDate: createdDate,
      mainGroup: mainGroup,
      category: category,
      style: style,
      product: product,
      model: model,
      size: size,
      worker: worker,
      pieces: pieces,
      crossWeight: grossWeight,
      stoneWeight: stoneWeight,
      setWeight: netWeight,
      componentWeight: componentWeight,
      ghatWt: ghatWt,
      remark: remark,
      designDetails: enteredRowData,
    };
    //console.log(fileNew[0])
    for(let key of Object.keys(event.target.files)) {
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
    .then(result => console.log('Files successfully uploaded!'))
    .catch(error => console.log('error occurred!')); 
 // }
  
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

  //};


  //-----------------------------------------------

  const {
    inputVal: mainGroup,
    isValid: mainGroupIsValid,
    hasErr: mainGroupHasErr,
    touchFn: mainGroupTouchFn,
    resetFn: mainGroupResetFn,
    handleBlur: mainGroupHandleBlur,
    handleChange: mainGroupHandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);
  // useSelect((inputValue) => inputValue);


  const {
    inputVal: category,
    isValid: categoryIsValid,
    hasErr: categoryHasErr,
    touchFn: categoryTouchFn,
    resetFn: categoryResetFn,
    handleBlur: categoryHandleBlur,
    handleChange: categoryHandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);
  // useSelect((inputValue) => inputValue);

  const {
    inputVal: style,
    isValid: styleIsValid,
    hasErr: styleHasErr,
    touchFn: styleTouchFn,
    resetFn: styleResetFn,
    handleBlur: styleHandleBlur,
    handleChange: styleHandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);
  // useSelect((inputValue) => inputValue);

  const {
    inputVal: product,
    isValid: productIsValid,
    hasErr: productHasErr,
    touchFn: productTouchFn,
    resetFn: productResetFn,
    handleBlur: productHandleBlur,
    handleChange: productHandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);
  // useSelect((inputValue) => inputValue);

  const {
    inputVal: model,
    isValid: modelIsValid,
    hasErr: modelHasErr,
    touchFn: modelTouchFn,
    resetFn: modelResetFn,
    handleBlur: modelHandleBlur,
    handleChange: modelHandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);
  // useSelect((inputValue) => inputValue);

  const {
    inputVal: size,
    isValid: sizeIsValid,
    hasErr: sizeHasErr,
    touchFn: sizeTouchFn,
    resetFn: sizeResetFn,
    handleBlur: sizeHandleBlur,
    handleChange: sizeHandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);
  // useSelect((inputValue) => inputValue);

  const {
    inputVal: worker,
    isValid: workerIsValid,
    hasErr: workerHasErr,
    touchFn: workerTouchFn,
    resetFn: workerResetFn,
    handleBlur: workerHandleBlur,
    handleChange: workerHandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);
  // useSelect((inputValue) => inputValue);

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
    inputVal: grossWeight,
    isValid: grossWeightIsValid,
    hasErr: grossWeightHasErr,
    touchFn: grossWeightTouchFn,
    resetFn: grossWeightResetFn,
    handleBlur: grossWeightHandleBlur,
    handleChange: grossWeightHandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);

  const {
    inputVal: stoneWeight,
    isValid: stoneWeightIsValid,
    hasErr: stoneWeightHasErr,
    touchFn: stoneWeightTouchFn,
    resetFn: stoneWeightResetFn,
    handleBlur: stoneWeightHandleBlur,
    handleChange: stoneWeightHandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);

  const {
    inputVal: netWeight,
    isValid: netWeightIsValid,
    hasErr: netWeightHasErr,
    touchFn: netWeightTouchFn,
    resetFn: netWeightResetFn,
    handleBlur: netWeightHandleBlur,
    handleChange: netWeightHandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);

  const {
    inputVal: componentWeight,
    isValid: componentWeightIsValid,
    hasErr: componentWeightHasErr,
    touchFn: componentWeightTouchFn,
    resetFn: componentWeightResetFn,
    handleBlur: componentWeightHandleBlur,
    handleChange: componentWeightHandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);

  const {
    inputVal: ghatWt,
    isValid: ghatWtIsValid,
    hasErr: ghatWtHasErr,
    touchFn: ghatWtTouchFn,
    resetFn: ghatWtResetFn,
    handleBlur: ghatWtHandleBlur,
    handleChange: ghatWtHandleChange,
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
  // useSelect((inputValue) => inputValue);

  const {
    inputVal: stoneGroup,
    isValid: stoneGroupIsValid,
    hasErr: stoneGroupHasErr,
    touchFn: stoneGroupTouchFn,
    resetFn: stoneGroupResetFn,
    handleBlur: stoneGroupHandleBlur,
    handleChange: stoneGroupHandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);
  // useSelect((inputValue) => inputValue);

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
    inputVal: stoneWeight1,
    isValid: stoneWeight1IsValid,
    hasErr: stoneWeight1HasErr,
    touchFn: stoneWeight1TouchFn,
    resetFn: stoneWeight1ResetFn,
    handleBlur: stoneWeight1HandleBlur,
    handleChange: stoneWeight1HandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);

  let formIsValid = false;

  if (
    mainGroupIsValid &&
    categoryIsValid &&
    styleIsValid &&
    productIsValid &&
    modelIsValid &&
    sizeIsValid &&
    workerIsValid &&
    piecesIsValid &&
    grossWeightIsValid &&
    stoneWeightIsValid &&
    netWeightIsValid &&
    componentWeightIsValid &&
    ghatWtIsValid &&
    remarkIsValid &&
    typeIsValid &&
    stoneGroupIsValid &&
    pieces1IsValid &&
    stoneWeight1IsValid
    // image_url
  ) {
    formIsValid = true;
  }

  let rowDataIsValid = false;

  if (
    typeIsValid &&
    stoneGroupIsValid &&
    pieces1IsValid &&
    stoneWeight1IsValid
  ) {
    rowDataIsValid = true;
  }

  function ResetAll() {
    mainGroupResetFn();
    categoryResetFn();
    styleResetFn();
    productResetFn();
    modelResetFn();
    sizeResetFn();
    workerResetFn();
    piecesResetFn();
    grossWeightResetFn();
    stoneWeightResetFn();
    netWeightResetFn();
    componentWeightResetFn();
    ghatWtResetFn();
    remarkResetFn();
    typeResetFn();
    stoneGroupResetFn();
    pieces1ResetFn();
    stoneWeight1ResetFn();

    // setImageUrl();
    // setImageUrlTouch(false);
  }

  function handleAdd() {
    typeTouchFn();
    stoneGroupTouchFn();
    pieces1TouchFn();
    stoneWeight1TouchFn();

    if (!rowDataIsValid) {
      return;
    }

    const enteredData = {
      type: type,
      stoneGroup: stoneGroup,
      pieces: pieces1,
      stoneWeight: stoneWeight1,
      unitOfMeasurement: "Grms/Cts"
    };

    setEnteredRowData((prev) => [...prev, { ...enteredData }]);

    const index = rowDataArr.length + 1;
    const formattedRowData = {
      Sno: index,
      type,
      stoneGroup: stoneGroup,
      stoneWt: stoneWeight1,
      pcs: pieces1,
      UOM: "Grms",
    };

    setRowDataArr((prev) => [...prev, { ...formattedRowData }]);
  }

  const handleSave = (event) =>{
    //  setImageUrlTouch(true);

    mainGroupTouchFn();
    categoryTouchFn();
    styleTouchFn();
    productTouchFn();
    modelTouchFn();
    sizeTouchFn();
    workerTouchFn();
    piecesTouchFn();
    grossWeightTouchFn();
    stoneWeightTouchFn();
    netWeightTouchFn();
    componentWeightTouchFn();
    ghatWtTouchFn();
    remarkTouchFn();
    typeTouchFn();
    stoneGroupTouchFn();
    pieces1TouchFn();
    stoneWeight1TouchFn();


    let formData = new FormData();
    const enteredFormData = {
      createdDate: createdDate,
      mainGroup: mainGroup,
      category: category,
      style: style,
      product: product,
      model: model,
      size: size,
      worker: worker,
      pieces: pieces,
      crossWeight: grossWeight,
      stoneWeight: stoneWeight,
      setWeight: netWeight,
      componentWeight: componentWeight,
      ghatWt: ghatWt,
      remark: remark,
      designDetails: enteredRowData,
    };
    //console.log(fileNew[0])
    for (let key of Object.keys(event.target.file)) {
     // console.log("key and images are >>>", key, " ...images ...", fileNew[key])
      if (key !== 'length') {
        formData.append('images',[event.target.file[key]]);
      }
    }

    console.log(formData.get('images'))
    formData.append('design',
      new Blob([JSON.stringify(enteredFormData)], {
        type: 'application/json'
      }));

    fetch('http://localhost:8080/api/designs', {
      method: 'POST',
      body: formData,
    }).then(response => response.json())
      .then(result => console.log('Files successfully uploaded!'))
      .catch(error => console.log('error occurred!'));
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



  const mainGroupClasses = `${classes.group} ${mainGroupHasErr ? classes["invalid"] : ""}`;
  const categoryClasses = `${classes.group} ${categoryHasErr ? classes["invalid"] : ""}`;
  const styleClasses = `${classes.group} ${styleHasErr ? classes["invalid"] : ""}`;
  const productClasses = `${classes.group} ${productHasErr ? classes["invalid"] : ""}`;
  const modelClasses = `${classes.group} ${modelHasErr ? classes["invalid"] : ""}`;
  const sizeClasses = `${classes.group} ${sizeHasErr ? classes["invalid"] : ""}`;
  const workerClasses = `${classes.group} ${workerHasErr ? classes["invalid"] : ""}`;

  const piecesClasses = `${classes["num-group"]} ${piecesHasErr ? classes["invalid"] : ""}`;
  const grossWeightClasses = `${classes["num-group"]} ${grossWeightHasErr ? classes["invalid"] : ""}`;
  const stoneWeightClasses = `${classes["num-group"]} ${stoneWeightHasErr ? classes["invalid"] : ""}`;
  const netWeightClasses = `${classes["num-group"]} ${netWeightHasErr ? classes["invalid"] : ""}`;
  const componentWeightClasses = `${classes["num-group"]} ${componentWeightHasErr ? classes["invalid"] : ""}`;
  const ghatWtClasses = `${classes["num-group"]} ${ghatWtHasErr ? classes["invalid"] : ""}`;

  const remarkClasses = `${classes.remarks} ${remarkHasErr ? classes["invalid"] : ""}`;

  const typeClasses = `${classes.group} ${typeHasErr ? classes["invalid"] : ""}`;
  const stoneGroupClasses = `${classes.group} ${stoneGroupHasErr ? classes["invalid"] : ""}`;
  const pieces1Classes = `${classes["num-group"]} ${pieces1HasErr ? classes["invalid"] : ""}`;
  const stoneWeight1Classes = `${classes["num-group"]} ${stoneWeight1HasErr ? classes["invalid"] : ""}`;

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
  {//console.log(handlePreview(fileList[0]))}
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
                  value={createdDate}
                  onChange={createdDateHandleChange}
                  //   onBlur={createdDateHandleBlur}
                  className={classes.date}
                  type="date"
                />
                <section className={classes.fields}>
                  <div className={mainGroupClasses} style={{ minWidth: "30%" }}>
                    <label htmlFor="mainGroup">Main Group</label>
                    <select
                      id="mainGroup"
                      value={mainGroup}
                      onBlur={mainGroupHandleBlur}
                      onChange={mainGroupHandleChange}
                      name="mainGroup"
                      placeholder="Select a main group"
                    >
                      <option value="" disabled hidden>
                        Select an option
                      </option>
                      <option value="Diamond">Diamond</option>
                      <option value="Gold">Gold</option>
                      <option value="Silver">Silver</option>
                    </select>
              
                    {/* <SelectComponent
                                placeholder={"Select main group"}
                                id="mainGroup"
                                onChangeFn={mainGroupHandleChange}
                                onBlurFn ={mainGroupHandleBlur}
                                value={mainGroup}
                                options={[
                                    {
                                        value: "Gold",
                                        label: "Gold"
                                    },
                                    {
                                        value: "Diamond",
                                        label: "Diamond"
                                    },
                                    {
                                        value: "Silver",
                                        label: "Silver"
                                    }
                                ]}
                                name="mainGroup"
                            /> */}
                            {mainGroupHasErr && <p className={classes.err}>Select a main group!</p>}
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
                    
                    {/* <SelectComponent
                                placeholder={"Select a category"}
                                id="category"
                                onChangeFn={categoryHandleChange}
                                onBlurFn ={categoryHandleBlur}
                                value={category}
                                options={[
                                    {
                                        value: "gold jewellery",
                                        label: "Gold Jewellery"
                                    },
                                    {
                                        value: "diamond jewellery",
                                        label: "Diamond Jewellery"
                                    },
                                    {
                                        value: "silver jewellery",
                                        label: "Silver Jewellery"
                                    } 
                                ]}
                                name="category"
                            /> */}
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
                    
                    {/* <SelectComponent
                                placeholder={"Select a style"}
                                id="style"
                                onChangeFn={styleHandleChange}
                                onBlurFn ={styleHandleBlur}
                                value={style}
                                options={[
                                    {
                                        value: "Style1",
                                        label: "Style1"
                                    },
                                    {
                                        value: "Style2",
                                        label: "Style2"
                                    },
                                    {
                                        value: "Style3",
                                        label: "Style3"
                                    }
                                ]}
                                name="style"
                            /> */}
                            {styleHasErr && <p className={classes.err}>Select a style!</p>}
                  </div>
                  <div className={productClasses} style={{ minWidth: "30%" }}>
                    <label htmlFor="product">Product</label>
                    <select
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
                    
                    {/* <SelectComponent
                                placeholder={"Select a product"}
                                id="product"
                                onChangeFn={productHandleChange}
                                onBlurFn ={productHandleBlur}
                                value={product}
                                options={[
                                    {
                                        value: "Product1",
                                        label: "Product1"
                                    },
                                    {
                                        value: "Product2",
                                        label: "Product2"
                                    },
                                    {
                                        value: "Product3",
                                        label: "Product3"
                                    }
                                ]}
                                name="product"
                            /> */}
                            {productHasErr && <p className={classes.err}>Select a product!</p>}
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
                    {/* <SelectComponent
                                placeholder={"Select model"}
                                id="model"
                                onChangeFn={modelHandleChange}
                                onBlurFn ={modelHandleBlur}
                                value={model}
                                options={[
                                    {
                                        value: "Model1",
                                        label: "Model1"
                                    },
                                    {
                                        value: "Model2",
                                        label: "Model2"
                                    },
                                    {
                                        value: "Model3",
                                        label: "Model3"
                                    }
                                ]}
                                name="model"
                            /> */}
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
                    {/* <SelectComponent
                                placeholder={"Select size"}
                                id="size"
                                onChangeFn={sizeHandleChange}
                                onBlurFn ={sizeHandleBlur}
                                value={size}
                                options={[
                                    {
                                        value: "Size1",
                                        label: "Size1"
                                    },
                                    {
                                        value: "Size2",
                                        label: "Size2"
                                    },
                                    {
                                        value: "Size3",
                                        label: "Size3"
                                    }
                                ]}
                                name="size"
                            /> */}
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
                    {/* <SelectComponent
                                placeholder={"Select worker"}
                                name={"worker"}
                                id="worker"
                                onChangeFn={workerHandleChange}
                                onBlurFn ={workerHandleBlur}
                                value={worker}
                                options={[
                                    {
                                        value: "Worker1",
                                        label: "Worker1"
                                    },
                                    {
                                        value: "Worker2",
                                        label: "Worker2"
                                    },
                                    {
                                        value: "Worker3",
                                        label: "Worker3"
                                    }
                                ]}
                            /> */}
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
                  <div className={grossWeightClasses}>
                    <label htmlFor="grossWeight">Gross Wt</label>
                    <input
                      value={grossWeight}
                      onBlur={grossWeightHandleBlur}
                      onChange={grossWeightHandleChange}
                      id="grossWeight"
                      type="number"
                      name="grossWeight"
                      placeholder="Enter Gross Wt"
                      width="100%"
                      height="2rem"
                    />
                    {grossWeightHasErr && <p className={classes.err}>Enter valid gross wt!</p>}
                  </div>
                  <div className={stoneWeightClasses}>
                    <label htmlFor="stoneWeight">stone Wt</label>
                    <input
                      value={stoneWeight}
                      onBlur={stoneWeightHandleBlur}
                      onChange={stoneWeightHandleChange}
                      id="stoneWeight"
                      name="stoneWeight"
                      placeholder="Enter stone Wt"
                      width="100%"
                      type="number"
                      height="2rem"
                    />
                    {stoneWeightHasErr && <p className={classes.err}>Enter valid stone wt!</p>}
                  </div>
                  <div className={netWeightClasses}>
                    <label htmlFor="netWeight">Net Wt</label>
                    <input
                      value={netWeight}
                      onBlur={netWeightHandleBlur}
                      onChange={netWeightHandleChange}
                      id="netWeight"
                      name="netWeight"
                      type="number"
                      placeholder="Enter Net Wt"
                      width="100%"
                      height="2rem"
                    />
                    {netWeightHasErr && <p className={classes.err}>Enter valid net wt!</p>}
                  </div>
                  <div className={componentWeightClasses}>
                    <label htmlFor="componentWeight">Com- Wt</label>
                    <input
                      value={componentWeight}
                      onBlur={componentWeightHandleBlur}
                      onChange={componentWeightHandleChange}
                      id="componentWeight"
                      type="number"
                      name="componentWeight"
                      placeholder="Enter Com- Wt"
                      width="100%"
                      height="2rem"
                    />
                    {componentWeightHasErr && <p className={classes.err}>Enter valid com- wt!</p>}
                  </div>
                  <div className={ghatWtClasses}>
                    <label htmlFor="ghatWt">Ghat Wt</label>
                    <input
                      value={ghatWt}
                      onBlur={ghatWtHandleBlur}
                      onChange={ghatWtHandleChange}
                      id="ghatWt"
                      name="ghatWt"
                      placeholder="Enter Ghat Wt"
                      width="100%"
                      height="2rem"
                      type="number"
                    />
                    {ghatWtHasErr && <p className={classes.err}>Enter valid ghat wt!</p>}
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
                    
                    {/* <SelectComponent
                                placeholder={"Select a type"}
                                name={"type"}
                                id="type"
                                onChangeFn={typeHandleChange}
                                onBlurFn ={typeHandleBlur}
                                value={type}
                                options={[
                                    {
                                        value: "Type1",
                                        label: "Type1"
                                    },
                                    {
                                        value: "Type2",
                                        label: "Type2"
                                    },
                                    {
                                        value: "Type3",
                                        label: "Type3"
                                    }
                                ]}
                            /> */}
                        {typeHasErr && <p className={classes.err}>Select a type!</p>}
                  </div>
                  <div className={stoneGroupClasses} style={{ minWidth: "20%" }}>
                    <label htmlFor="stoneGroup">Stone Group</label>
                    <select
                      value={stoneGroup}
                      onBlur={stoneGroupHandleBlur}
                      onChange={stoneGroupHandleChange}
                      id="stoneGroup"
                      name="stoneGroup"
                      placeholder={"Select stone group"}
                    >
                      <option value="Stone Group 1">Stone Group 1</option>
                      <option value="" disabled hidden>
                        Select an option
                      </option>
                      <option value="Stone Group 2">Stone Group 2</option>
                    </select>
                    
                    {/* <SelectComponent
                              placeholder={"Select stone group"}
                                name={"stoneGroup"}
                                onChangeFn={stoneGroupHandleChange}
                                onBlurFn ={stoneGroupHandleBlur}
                                value={stoneGroup}
                                id='stoneGroup'
                                options={[
                                    {
                                        value: "Stone Group 1",
                                        label: "Stone Group 1"
                                    },
                                    {
                                        value: "Stone Group 2",
                                        label: "Stone Group 2"
                                    },
                                ]}
                            /> */}
                      {stoneGroupHasErr && <p className={classes.err}>Select a stone group!</p>}
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
                  <div className={stoneWeight1Classes}>
                    <label htmlFor="stoneWeight1">Weight</label>
                    <input
                      value={stoneWeight1}
                      onBlur={stoneWeight1HandleBlur}
                      onChange={stoneWeight1HandleChange}
                      id="stoneWeight1"
                      name="stoneWeight1"
                      placeholder="Enter Gross Wt"
                      width="100%"
                      height="2rem"
                    />
                    {stoneWeight1HasErr && <p className={classes.err}>Select a stone wt!</p>}
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
              <ImageComponent fileList={fileList}/>
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
           {/*  <Upload
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleUploadChange}
          >
            {fileList.length >= 4 ? null : uploadButton}
          </Upload> */}
            <div className="uk-margin-medium-top">
              <label>Upload Files</label>
              <input type="file"
                onChange={(event) => uploadJSONFiles(event)}
                multiple />
            </div> 


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
