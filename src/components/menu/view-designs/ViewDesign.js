import { useEffect, useState } from "react";
import classes from "./ViewDesign.module.css";
import { useRouteLoaderData } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../store/ui-slice";
import WrongIcon from "../../../icons/wrong-icon";
import useCheck from "../../../hooks/use-check";
import { Drawer } from "antd";
import DesignDetails from "./DesignDetails";
import axios from "axios";
import { Spin } from "antd";
const today = new Date().toISOString().slice(0, 10);


const DUMMY_LIST = [
  {
    id: "1",
    // title: "Design "+id,
    // description: "This is the first Design.",
    // price: 300,
    mainGroup: "Diamond",
    category: "Diamond Jewelery",
    designNumber: 1,
    createdDate: today,
    style: "Style 2",
    product: "Product 2",
    model: "Model 2",
    size: "Size 2",
    worker: "Worker 2",
    pieces: 1,
    grossWeight: 120,
    stoneWeight: 130,
    netWeight: 140,
    componentWeight: 150,
    ghatWt: 160,
    remark: "Remarks description...",
    detailsSet: [
      {
        type: 'composite',
        stoneGroup: 'stoneGroup1',
        pieces: 122,
        stoneWeight: 12,
        unitOfMeasurement: 'Grm/Cts'
      },
      {
        type: 'stone',
        stoneGroup: 'stoneGroup2',
        pieces: 150,
        stoneWeight: 19,
        unitOfMeasurement: 'Grm/Cts'
      },
    ],
    designImages:[
      {imageUrl: "https://picsum.photos/536/354",},
      {imageUrl: "https://picsum.photos/536/301", },
      {imageUrl: "https://picsum.photos/536/302", },
      {imageUrl: "https://picsum.photos/536/303" , },
    ]
  },
  {
    id: "2",
    // title: "Design 2",
    // description: "This is the second Design.",
    // price: 350,
    mainGroup: "Gold",
    category: "Gold Jewelery",
    designNumber: 2,
    createdDate: today,
    style: "Style 3",
    product: "Product 3",
    model: "Model 3",
    size: "Size 3",
    worker: "Worker 3",
    pieces: 1,
    grossWeight: 130,
    stoneWeight: 130,
    netWeight: 140,
    componentWeight: 150,
    ghatWt: 160,
    remark: "Remarks description...",
    detailsSet: [
      {
        type: 'composite',
        stoneGroup: 'stoneGroup1',
        pieces: 122,
        stoneWeight: 12,
        unitOfMeasurement: 'Grm/Cts'
      },
      {
        type: 'stone',
        stoneGroup: 'stoneGroup2',
        pieces: 150,
        stoneWeight: 19,
        unitOfMeasurement: 'Grm/Cts'
      },
    ],
    designImages:[
      {imageUrl: "https://picsum.photos/536/355", },
      {imageUrl: "https://picsum.photos/536/304", },
      {imageUrl: "https://picsum.photos/536/305", },
      {imageUrl: "https://picsum.photos/536/306" , },
    ]
  },
  {
    id: "3",
    // title: "Design 3",
    // description: "This is the third Design.",
    // price: 390,
    mainGroup: "Diamond",
    category: "Diamond Jewelery",
    designNumber: 1,
    createdDate: today,
    style: "Style 2",
    product: "Product 2",
    model: "Model 2",
    size: "Size 2",
    worker: "Worker 2",
    pieces: 1,
    grossWeight: 140,
    stoneWeight: 130,
    netWeight: 140,
    componentWeight: 150,
    ghatWt: 160,
    remark: "Remarks description...",
    detailsSet: [
      {
        type: 'composite',
        stoneGroup: 'Stone Group 1',
        pieces: 122,
        stoneWeight: 12,
        unitOfMeasurement: 'Grm/Cts'
      },
      {
        type: 'stone',
        stoneGroup: 'Stone Group 2',
        pieces: 150,
        stoneWeight: 19,
        unitOfMeasurement: 'Grm/Cts'
      },
    ],
    designImages:[
      {imageUrl: "https://picsum.photos/536/353", },
      {imageUrl: "https://picsum.photos/536/307", },
      {imageUrl: "https://picsum.photos/536/308", },
      {imageUrl: "https://picsum.photos/536/309" , },
    ]
  },
  {
    id: "4",
    // title: "Design 4",
    // description: "This is the fourth Design.",
    // price: 400,
    mainGroup: "Gold",
    category: "Gold Jewelery",
    designNumber: 2,
    createdDate: today,
    style: "Style 1",
    product: "Product 1",
    model: "Model 1",
    size: "Size 1",
    worker: "Worker 1",
    pieces: 1,
    grossWeight: 120,
    stoneWeight: 130,
    netWeight: 140,
    componentWeight: 150,
    ghatWt: 160,
    remark: "Remarks description...",
    detailsSet: [
      {
        type: 'composite',
        stoneGroup: 'Stone Group 1',
        pieces: 122,
        stoneWeight: 12,
        unitOfMeasurement: 'Grm/Cts'
      },
      {
        type: 'stone',
        stoneGroup: 'Stone Group 2',
        pieces: 150,
        stoneWeight: 19,
        unitOfMeasurement: 'Grm/Cts'
      },
    ],
    designImages:[
      {imageUrl: "https://picsum.photos/536/352", },
      {imageUrl: "https://picsum.photos/536/310", },
      {imageUrl: "https://picsum.photos/536/311", },
      {imageUrl: "https://picsum.photos/536/312" , },
    ]
  },
  {
    id: "5",
    // title: "Design 5",
    // description: "This is the fifth Design.",
    // price: 450,
    mainGroup: "Diamond",
    category: "Diamond Jewelery",
    designNumber: 1,
    createdDate: today,
    style: "Style 2",
    product: "Product 2",
    model: "Model 2",
    size: "Size 2",
    worker: "Worker 2",
    pieces: 1,
    grossWeight: 130,
    stoneWeight: 130,
    netWeight: 140,
    componentWeight: 150,
    ghatWt: 160,
    remark: "Remarks description...",
    detailsSet: [
      {
        type: 'composite',
        stoneGroup: 'Stone Group 1',
        pieces: 122,
        stoneWeight: 12,
        unitOfMeasurement: 'Grm/Cts'
      },
      {
        type: 'stone',
        stoneGroup: 'Stone Group 2',
        pieces: 150,
        stoneWeight: 19,
        unitOfMeasurement: 'Grm/Cts'
      },
    ],
    designImages:[
      {imageUrl: "https://picsum.photos/536/351", },
      {imageUrl: "https://picsum.photos/536/313", },
      {imageUrl: "https://picsum.photos/536/314", },
      {imageUrl: "https://picsum.photos/536/315" ,},
    ]
  },
  {
    id: "6",
    // title: "Design 6",
    // description: "This is the sixth Design.",
    // price: 500,
    mainGroup: "Gold",
    category: "Gold Jewelery",
    designNumber: 2,
    createdDate: today,
    style: "Style 3",
    product: "Product 3",
    model: "Model 3",
    size: "Size 3",
    worker: "Worker 3",
    pieces: 1,
    grossWeight: 140,
    stoneWeight: 130,
    netWeight: 140,
    componentWeight: 150,
    ghatWt: 160,
    remark: "Remarks description...",
    detailsSet: [
      {
        type: 'composite',
        stoneGroup: 'Stone Group 1',
        pieces: 122,
        stoneWeight: 12,
        unitOfMeasurement: 'Grm/Cts'
      },
      {
        type: 'stone',
        stoneGroup: 'Stone Group 2',
        pieces: 150,
        stoneWeight: 19,
        unitOfMeasurement: 'Grm/Cts'
      },
    ],
    designImages:[
      {imageUrl: "https://picsum.photos/536/356"},
      {imageUrl: "https://picsum.photos/536/316"},
      {imageUrl: "https://picsum.photos/536/317", },
      {imageUrl: "https://picsum.photos/536/318" , },
    ]
  },
  {
    id: "7",
    // title: "Design 7",
    // description: "This is the seventh Design.",
    // price: 550,
    mainGroup: "Diamond",
    category: "Diamond Jewelery",
    designNumber: 2,
    createdDate: today,
    style: "Style 2",
    product: "Product 2",
    model: "Model 2",
    size: "Size 2",
    worker: "Worker 2",
    pieces: 1,
    grossWeight: 120,
    stoneWeight: 130,
    netWeight: 140,
    componentWeight: 150,
    ghatWt: 160,
    remark: "Remarks description...",
    detailsSet: [
      {
        type: 'composite',
        stoneGroup: 'Stone Group 1',
        pieces: 122,
        stoneWeight: 12,
        unitOfMeasurement: 'Grm/Cts'
      },
      {
        type: 'stone',
        stoneGroup: 'Stone Group 2',
        pieces: 150,
        stoneWeight: 19,
        unitOfMeasurement: 'Grm/Cts'
      },
    ],
    designImages:[
      {imageUrl: "https://picsum.photos/536/357"},
      {imageUrl: "https://picsum.photos/536/319"},
      {imageUrl: "https://picsum.photos/536/320"},
      {imageUrl: "https://picsum.photos/536/321" },
    ]
  },
  {
    id: "8",
    // title: "Design 8",
    // description: "This is the eighth Design.",
    // price: 600,
    mainGroup: "Gold",
    category: "Gold Jewelery",
    designNumber: 1,
    createdDate: today,
    style: "Style 3",
    product: "Product 3",
    model: "Model 3",
    size: "Size 3",
    worker: "Worker 3",
    pieces: 1,
    grossWeight: 130,
    stoneWeight: 130,
    netWeight: 140,
    componentWeight: 150,
    ghatWt: 160,
    remark: "Remarks description...",
    detailsSet: [
      {
        type: 'composite',
        stoneGroup: 'Stone Group 1',
        pieces: 122,
        stoneWeight: 12,
        unitOfMeasurement: 'Grm/Cts'
      },
      {
        type: 'stone',
        stoneGroup: 'Stone Group 2',
        pieces: 150,
        stoneWeight: 19,
        unitOfMeasurement: 'Grm/Cts'
      },
    ],
    designImages:[
      {imageUrl: "https://picsum.photos/536/358",},
      {imageUrl: "https://picsum.photos/536/322", },
      {imageUrl: "https://picsum.photos/536/323", },
      {imageUrl: "https://picsum.photos/536/324" , },
    ]
  },
  {
    id: "9",
    // title: "Design 9",
    // description: "This is the ninth Design.",
    // price: 650,
    mainGroup: "Diamond",
    category: "Diamond Jewelery",
    designNumber: 2,
    createdDate: today,
    style: "Style 1",
    product: "Product 1",
    model: "Model 1",
    size: "Size 1",
    worker: "Worker 1",
    pieces: 1,
    grossWeight: 140,
    stoneWeight: 130,
    netWeight: 140,
    componentWeight: 150,
    ghatWt: 160,
    remark: "Remarks description...",
    detailsSet: [
      {
        type: 'composite',
        stoneGroup: 'Stone Group 1',
        pieces: 122,
        stoneWeight: 12,
        unitOfMeasurement: 'Grm/Cts'
      },
      {
        type: 'stone',
        stoneGroup: 'Stone Group 2',
        pieces: 150,
        stoneWeight: 19,
        unitOfMeasurement: 'Grm/Cts'
      },
    ],
    designImages:[
      {imageUrl: "https://picsum.photos/536/359", },
      {imageUrl: "https://picsum.photos/536/325", },
      {imageUrl: "https://picsum.photos/536/326",  },
      {imageUrl: "https://picsum.photos/536/327" ,  },
    ]
  },
  {
    id: "10",
    // title: "Design 10",
    // description: "This is the tenth Design.",
    // price: 700,
    mainGroup: "Gold",
    category: "Gold Jewelery",
    designNumber: 1,
    createdDate: today,
    style: "Style 2",
    product: "Product 2",
    model: "Model 2",
    size: "Size 2",
    worker: "Worker 2",
    pieces: 1,
    grossWeight: 120,
    stoneWeight: 130,
    netWeight: 140,
    componentWeight: 150,
    ghatWt: 160,
    remark: "Remarks description...",
    detailsSet: [
      {
        type: 'composite',
        stoneGroup: 'Stone Group 1',
        pieces: 122,
        stoneWeight: 12,
        unitOfMeasurement: 'Grm/Cts'
      },
      {
        type: 'stone',
        stoneGroup: 'Stone Group 2',
        pieces: 150,
        stoneWeight: 19,
        unitOfMeasurement: 'Grm/Cts'
      },
    ],
    designImages:[
      {imageUrl: "https://picsum.photos/536/360",  },
      {imageUrl: "https://picsum.photos/536/328",  },
      {imageUrl: "https://picsum.photos/536/329",  },
      {imageUrl: "https://picsum.photos/536/330" ,  },
    ]
  },
  {
    id: "11",
    // title: "Design 11",
    // description: "This is the 11th Design.",
    // price: 750,
    mainGroup: "Diamond",
    category: "Diamond Jewelery",
    designNumber: 2,
    createdDate: today,
    style: "Style 1",
    product: "Product 1",
    model: "Model 1",
    size: "Size 1",
    worker: "Worker 1",
    pieces: 1,
    grossWeight: 130,
    stoneWeight: 130,
    netWeight: 140,
    componentWeight: 150,
    ghatWt: 160,
    remark: "Remarks description...",
    detailsSet: [
      {
        type: 'composite',
        stoneGroup: 'Stone Group 1',
        pieces: 122,
        stoneWeight: 12,
        unitOfMeasurement: 'Grm/Cts'
      },
      {
        type: 'stone',
        stoneGroup: 'Stone Group 2',
        pieces: 150,
        stoneWeight: 19,
        unitOfMeasurement: 'Grm/Cts'
      },
    ],
    designImages:[
      {imageUrl: "https://picsum.photos/536/361",  },
      {imageUrl: "https://picsum.photos/536/331",  },
      {imageUrl: "https://picsum.photos/536/332", },
      {imageUrl: "https://picsum.photos/536/333" ,  },
    ]
  },
  {
    id: "12",
    // title: "Design 12",
    // description: "This is the 12th Design.",
    // price: 750,
    mainGroup: "Gold",
    category: "Gold Jewelery",
    designNumber: 1,
    createdDate: today,
    style: "Style 2",
    product: "Product 2",
    model: "Model 2",
    size: "Size 2",
    worker: "Worker 2",
    pieces: 1,
    grossWeight: 140,
    stoneWeight: 130,
    netWeight: 140,
    componentWeight: 150,
    ghatWt: 160,
    remark: "Remarks description...",
    detailsSet: [
      {
        type: 'composite',
        stoneGroup: 'Stone Group 1',
        pieces: 122,
        stoneWeight: 12,
        unitOfMeasurement: 'Grm/Cts'
      },
      {
        type: 'stone',
        stoneGroup: 'Stone Group 2',
        pieces: 150,
        stoneWeight: 19,
        unitOfMeasurement: 'Grm/Cts'
      },
    ],
    designImages:[
      {imageUrl: "https://picsum.photos/536/362",  },
      {imageUrl: "https://picsum.photos/536/334",  },
      {imageUrl: "https://picsum.photos/536/335",  },
      {imageUrl: "https://picsum.photos/536/336" ,  },
    ]
  },
  {
    id: "13",
    // title: "Design 13",
    // description: "This is the 13th Design.",
    // price: 750,
    mainGroup: "Gold",
    category: "Gold Jewelery",
    designNumber: 1,
    createdDate: today,
    style: "Style 3",
    product: "Product 3",
    model: "Model 3",
    size: "Size 3",
    worker: "Worker 1",
    pieces: 1,
    grossWeight: 100,
    stoneWeight: 100,
    netWeight: 100,
    componentWeight: 100,
    ghatWt: 100,
    remark: "Remarks description...",
    detailsSet: [
      {
        type: 'composite',
        stoneGroup: 'Stone Group 1',
        pieces: 122,
        stoneWeight: 12,
        unitOfMeasurement: 'Grm/Cts'
      },
      {
        type: 'stone',
        stoneGroup: 'Stone Group 2',
        pieces: 150,
        stoneWeight: 19,
        unitOfMeasurement: 'Grm/Cts'
      },
    ],
    designImages:[
      {imageUrl: "https://picsum.photos/536/363",  },
      {imageUrl: "https://picsum.photos/536/337",  },
      {imageUrl: "https://picsum.photos/536/338",  },
      {imageUrl: "https://picsum.photos/536/339" ,  },
    ]
  },
];

export default function ViewDesign() {
  const token = useRouteLoaderData("root");
  const dispatch = useDispatch();

  const [isDrawerOPen, setIsDrawerOPen]= useState(false);

  const selectedFilters = useSelector((state) => state.ui.selectedFilters);

  const [designList, setDesignList] = useState([]);

  const [load, setLoad] = useState(false);

  useEffect(() => {
    getVeiwDesign();
    setLoad[true];
  },[]);

  const getVeiwDesign = () => {
    
    try {
    axios.get('http://18.204.204.183:8080/api/designs')
      .then((res) =>  {
       // console.log('response is list Designs: ',res.data)
        setDesignList(res.data);
        setLoad[false];
      })
        .catch((err) => console.log('error is : ', err))
    }
    catch (err){
      console.log(err);
    }
  }
  


  const {
    field: mainGrpFilters,
    handleFieldCheckChange: handleMainGroupCheckChange,
  } = useCheck({
    Gold: false,
    Diamond: false,
  }, handleCloseFilters);

  const {
    field: categoryFilters,
    handleFieldCheckChange: handleCategoryCheckChange,
  } = useCheck({
    "Gold Jewelery": false,
    "Diamond Jewelery": false,
  }, handleCloseFilters);

  const {
    field: designNumFilters,
    handleFieldCheckChange: handleDesignNumCheckChange,
  } = useCheck({
    "D.No:1": false,
    "D.No:2": false,
  }, handleCloseFilters);

  const {
    field: styleFilters,
    handleFieldCheckChange: handleStyleCheckChange,
  } = useCheck({
    "Style1": false,
    "Style2": false,
    "Style3": false,
  }, handleCloseFilters);

  const {
    field: productFilters,
    handleFieldCheckChange: handleProductCheckChange,
  } = useCheck({
    "Product1": false,
    "Product2": false,
    "Product3": false,
  }, handleCloseFilters);

  const {
    field: modelFilters,
    handleFieldCheckChange: handleModelCheckChange,
  } = useCheck({
    "Model1": false,
    "Model2": false,
    "Model3": false,
  }, handleCloseFilters);

  const { field: sizeFilters, handleFieldCheckChange: handleSizeCheckChange } =
    useCheck({
      "Size1": false,
      "Size2": false,
      "Size3": false,
    }, handleCloseFilters);

  const {
    field: weightRangeFilters,
    handleFieldCheckChange: handleWtCheckChange,
  } = useCheck({
    "0-10grms": false,
    "10-20grms": false,
    "20-50grms": false,
    "50-100grms": false,
    "100-200grms": false,
    ">200grms": false,
  }, handleCloseFilters);

  const {
    mainGrpFilter: isMainGrpFilterExpanded,
    categoryFilter: isCategoryFilterExpanded,
    designFilter: isDesignFilterExpanded,
    styleFilter: isStyleFilterExpanded,
    productFilter: isProductFilterExpanded,
    wtFilter: isWtFilterExpanded,
    moreFilter: isMoreFilterExpanded,
  } = useSelector((state) => state.ui.filters);

  const [isShow, setIsShow] = useState(false);
  const [cardItem, setCardItem] = useState(null);

  function handleShowDetails(item) {
  //  console.log(item);
    setCardItem(item);
    setIsShow(true);
  }
  function handleGoBack() {
    setIsShow(false);
  }

  function handleExpandMainGrpFilter() {
    dispatch(uiActions.expandFilter("mainGrpFilter"));
  }
  function handleExpandCategoryFilter() {
    dispatch(uiActions.expandFilter("categoryFilter"));
  }
  function handleExpandDesignFilter() {
    dispatch(uiActions.expandFilter("designFilter"));
  }
  function handleExpandMoreFilter() {
    dispatch(uiActions.expandFilter("moreFilter"));
  }
  function handleExpandProductFilter() {
    dispatch(uiActions.expandFilter("productFilter"));
  }
  function handleExpandStyleFilter() {
    dispatch(uiActions.expandFilter("styleFilter"));
  }
  function handleExpandWtFilter() {
    dispatch(uiActions.expandFilter("wtFilter"));
  }

  function handleRemoveFilter(id, event, setFn) {
    // const filterOption= document.getElementById(id);
    const { name } = event;
    setFn((prev) => {
      return { ...prev, [name]: false };
    });
    // console.log(event);
    // console.log(event[id]);
    // console.log(id1, name, checked);
    // event[checked]=false;
    // console.log(id1, name, checked);
    // event[id]=false;
    dispatch(uiActions.removeFilter(id));
  }

  function handleClearAllFilters() {
    for (let obj of selectedFilters) {
      const { setFn, event } = obj;
      const { name } = event;
      setFn((prev) => {
        return { ...prev, [name]: false };
      });
    }
    dispatch(uiActions.clearFilters());
  }

 // console.log(selectedFilters);

  function handleOpenFilters() {
    setIsDrawerOPen(true);
  }

  function handleCloseFilters(){
    setIsDrawerOPen(false);
  }

  let filteredList = designList.filter((item) => {
    const isMainGroupMatch =
      Object.values(mainGrpFilters).every((value) => value === false) ||
      mainGrpFilters[item.mainGroup];
    
    const isCategoryMatch =
      Object.values(categoryFilters).every((value) => value === false) ||
      categoryFilters[item.category];
  
    const isDesignNumMatch =
      Object.values(designNumFilters).every((value) => value === false) ||
      designNumFilters[`D.No:${item.designNumber}`];
  
    const isStyleMatch =
      Object.values(styleFilters).every((value) => value === false) ||
      styleFilters[item.style];
  
    const isProductMatch =
      Object.values(productFilters).every((value) => value === false) ||
      productFilters[item.product];
  
    const isModelMatch =
      Object.values(modelFilters).every((value) => value === false) ||
      modelFilters[item.model];
  
    const isSizeMatch =
      Object.values(sizeFilters).every((value) => value === false) ||
      sizeFilters[item.size];
  
    const isWeightMatch =
      Object.values(weightRangeFilters).every((value) => value === false) ||
      (weightRangeFilters["0-10grms"] && item.grossWeight <= 10) ||
      (weightRangeFilters["10-20grms"] &&
        item.grossWeight > 10 &&
        item.grossWeight <= 20) ||
      (weightRangeFilters["20-50grms"] &&
        item.grossWeight > 20 &&
        item.grossWeight <= 50) ||
      (weightRangeFilters["50-100grms"] &&
        item.grossWeight > 50 &&
        item.grossWeight <= 100) || 
      (weightRangeFilters["100-200grms"] &&
        item.grossWeight > 100 &&
        item.grossWeight <= 200) ||
      (weightRangeFilters[">200grms"] &&
        item.grossWeight >200);
  
    return (
      isMainGroupMatch &&
      isCategoryMatch &&
      isDesignNumMatch &&
      isStyleMatch &&
      isProductMatch &&
      isModelMatch &&
      isSizeMatch &&
      isWeightMatch
    );
  });

  let content = (
    <div key="whole-designs" className={classes["whole-designs-page"]}>
      <div className={classes.designs}>
        <div className={classes["head-content"]}>
          <h1>View All Designs</h1>
          <section className={classes["filters-sm"]}>
            <button onClick={handleOpenFilters}>Filter By</button>
            <Drawer title="Filter By" placement="bottom" height={"90vh"} onClose={handleCloseFilters} open={isDrawerOPen}>
              <section className={classes["drawer-filters"]}>
                    <div className={classes["drawer-each-filter"]}>
                      <div
                        className={classes["drawer-filter-field"]}
                        onClick={handleExpandMainGrpFilter}
                      >
                        <span className={classes.title}>Main Group</span>
                        <motion.span
                          animate={{ rotate: isMainGrpFilterExpanded ? 180 : 0 }}
                          className={classes.symbol}
                        >
                          &#9650;
                        </motion.span>
                      </div>
                      <AnimatePresence>
                        {isMainGrpFilterExpanded && (
                          <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className={classes["drawer-filter-options"]}
                          >
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="Diamond"
                                name="Diamond"
                                checked={mainGrpFilters["Diamond"]}
                                onChange={handleMainGroupCheckChange}
                              />
                              <label htmlFor="Diamond">Diamond</label>
                            </p>
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="Gold"
                                name="Gold"
                                checked={mainGrpFilters["Gold"]}
                                onChange={handleMainGroupCheckChange}
                              />
                              <label htmlFor="Gold">Gold</label>
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className={classes["drawer-each-filter"]}>
                      <div
                        className={classes["drawer-filter-field"]}
                        onClick={handleExpandCategoryFilter}
                      >
                        <span className={classes.title}>CATEGORY</span>
                        <motion.span
                          animate={{ rotate: isCategoryFilterExpanded ? 180 : 0 }}
                          className={classes.symbol}
                        >
                          &#9650;
                        </motion.span>
                      </div>
                      <AnimatePresence>
                        {isCategoryFilterExpanded && (
                          <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className={classes["drawer-filter-options"]}
                          >
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="Diamond Jewelery"
                                name="Diamond Jewelery"
                                checked={categoryFilters["Diamond Jewelery"]}
                                onChange={handleCategoryCheckChange}
                              />
                              <label htmlFor="Diamond Jewelery">Diamond Jewelery</label>
                            </p>
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="Gold Jewelery"
                                name="Gold Jewelery"
                                checked={categoryFilters["Gold Jewelery"]}
                                onChange={handleCategoryCheckChange}
                              />
                              <label htmlFor="Gold Jewelery">GOLD Jewelery</label>
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className={classes["drawer-each-filter"]}>
                      <div
                        className={classes["drawer-filter-field"]}
                        onClick={handleExpandDesignFilter}
                      >
                        <span className={classes.title}>DESIGN NO.</span>
                        <motion.span
                          animate={{ rotate: isDesignFilterExpanded ? 180 : 0 }}
                          className={classes.symbol}
                        >
                          &#9650;
                        </motion.span>
                      </div>
                      <AnimatePresence>
                        {isDesignFilterExpanded && (
                          <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className={classes["drawer-filter-options"]}
                          >
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="1"
                                name="D.No:1"
                                checked={designNumFilters["D.No:1"]}
                                onChange={handleDesignNumCheckChange}
                              />
                              <label htmlFor="1">D.No:1</label>
                            </p>
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="2"
                                name="D.No:2"
                                checked={designNumFilters["D.No:2"]}
                                onChange={handleDesignNumCheckChange}
                              />
                              <label htmlFor="2">D.No:1</label>
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className={classes["drawer-each-filter"]}>
                      <div
                        className={classes["drawer-filter-field"]}
                        onClick={handleExpandStyleFilter}
                      >
                        <span className={classes.title}>STYLE</span>
                        <motion.span
                          animate={{ rotate: isStyleFilterExpanded ? 180 : 0 }}
                          className={classes.symbol}
                        >
                          &#9650;
                        </motion.span>
                      </div>
                      <AnimatePresence>
                        {isStyleFilterExpanded && (
                          <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className={classes["drawer-filter-options"]}
                          >
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="Style1"
                                name="Style1"
                                checked={styleFilters["Style1"]}
                                onChange={handleStyleCheckChange}
                              />
                              <label htmlFor="Style 1">Style 1</label>
                            </p>
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="Style2"
                                name="Style2"
                                checked={styleFilters["Style2"]}
                                onChange={handleStyleCheckChange}
                              />
                              <label htmlFor="Style 2">Style 2</label>
                            </p>
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="Style3"
                                name="Style3"
                                checked={styleFilters["Style3"]}
                                onChange={handleStyleCheckChange}
                              />
                              <label htmlFor="Style 3">Style 3</label>
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className={classes["drawer-each-filter"]}>
                      <div
                        className={classes["drawer-filter-field"]}
                        onClick={handleExpandProductFilter}
                      >
                        <span className={classes.title}>PRODUCT</span>
                        <motion.span
                          animate={{ rotate: isProductFilterExpanded ? 180 : 0 }}
                          className={classes.symbol}
                        >
                          &#9650;
                        </motion.span>
                      </div>
                      <AnimatePresence>
                        {isProductFilterExpanded && (
                          <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className={classes["drawer-filter-options"]}
                          >
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="Product1"
                                name="Product1"
                                checked={productFilters["Product1"]}
                                onChange={handleProductCheckChange}
                              />
                              <label htmlFor="Product 1">Product 1</label>
                            </p>
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="Product2"
                                name="Product2"
                                checked={productFilters["Product2"]}
                                onChange={handleProductCheckChange}
                              />
                              <label htmlFor="Product 2">Product 2</label>
                            </p>
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="Product3"
                                name="Product3"
                                checked={productFilters["Product3"]}
                                onChange={handleProductCheckChange}
                              />
                              <label htmlFor="Product 3">Product 3</label>
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className={classes["drawer-each-filter"]}>
                      <div
                        className={classes["drawer-filter-field"]}
                        onClick={handleExpandWtFilter}
                      >
                        <span className={classes.title}>Weight Range</span>
                        <motion.span
                          animate={{ rotate: isWtFilterExpanded ? 180 : 0 }}
                          className={classes.symbol}
                        >
                          &#9650;
                        </motion.span>
                      </div>
                      <AnimatePresence>
                        {isWtFilterExpanded && (
                          <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className={classes["drawer-filter-options"]}
                          >
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="wt 1"
                                name="0-10grms"
                                checked={weightRangeFilters["0-10grms"]}
                                onChange={handleWtCheckChange}
                              />
                              <label htmlFor="wt 1">0-10grms</label>
                            </p>
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="wt 2"
                                name="10-20grms"
                                checked={weightRangeFilters["10-20grms"]}
                                onChange={handleWtCheckChange}
                              />
                              <label htmlFor="wt 2">10-20grms</label>
                            </p>
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="wt 3"
                                name="20-50grms"
                                checked={weightRangeFilters["20-50grms"]}
                                onChange={handleWtCheckChange}
                              />
                              <label htmlFor="wt 3">20-50grms</label>
                            </p>
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="wt 4"
                                name="50-100grms"
                                checked={weightRangeFilters["50-100grms"]}
                                onChange={handleWtCheckChange}
                              />
                              <label htmlFor="wt 4">50-100grms</label>
                            </p>
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="wt 5"
                                name="100-200grms"
                                checked={weightRangeFilters["100-200grms"]}
                                onChange={handleWtCheckChange}
                              />
                              <label htmlFor="wt 5">100-200grms</label>
                            </p>
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="wt 6"
                                name=">200grms"
                                checked={weightRangeFilters[">200grms"]}
                                onChange={handleWtCheckChange}
                              />
                              <label htmlFor="wt 6">{`> `}200grms</label>
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className={classes["drawer-each-filter"]}>
                      <div
                        className={classes["drawer-filter-field"]}
                        onClick={handleExpandMoreFilter}
                      >
                        <span className={classes.title}>MORE FILTERS</span>
                        <motion.span
                          animate={{ rotate: isMoreFilterExpanded ? 180 : 0 }}
                          className={classes.symbol}
                        >
                          &#9650;
                        </motion.span>
                      </div>
                      <AnimatePresence>
                        {isMoreFilterExpanded && (
                          <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className={classes["drawer-filter-options"]}
                          >
                            <p className={classes.opt}>Model</p>
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="Model1"
                                name="Model1"
                                checked={modelFilters["Model1"]}
                                onChange={handleModelCheckChange}
                              />
                              <label htmlFor="Model 1">Model 1</label>
                            </p>
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="Model2"
                                name="Model2"
                                checked={modelFilters["Model2"]}
                                onChange={handleModelCheckChange}
                              />
                              <label htmlFor="Model 2">Model 2</label>
                            </p>
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="Model3"
                                name="Model3"
                                checked={modelFilters["Model3"]}
                                onChange={handleModelCheckChange}
                              />
                              <label htmlFor="Model 3">Model 3</label>
                            </p>
                            <p className={classes.opt}>Size</p>
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="Size1"
                                name="Size1"
                                checked={sizeFilters["Size1"]}
                                onChange={handleSizeCheckChange}
                              />
                              <label htmlFor="Size 1">Size 1</label>
                            </p>
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="Size2"
                                name="Size2"
                                checked={sizeFilters["Size2"]}
                                onChange={handleSizeCheckChange}
                              />
                              <label htmlFor="Size 2">Size 2</label>
                            </p>
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="Size3"
                                name="Size3"
                                checked={sizeFilters["Size3"]}
                                onChange={handleSizeCheckChange}
                              />
                              <label htmlFor="Size 3">Size 3</label>
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
              </section>
            </Drawer>
          </section>


          <section className={classes.filters}>
            <div className={classes["each-filter"]}>
              <div
                className={classes["filter-field"]}
                onClick={handleExpandMainGrpFilter}
              >
                <span className={classes.title}>Main Group</span>
                <motion.span
                  animate={{ rotate: isMainGrpFilterExpanded ? 180 : 0 }}
                  className={classes.symbol}
                >
                  &#9650;
                </motion.span>
              </div>
              <AnimatePresence>
                {isMainGrpFilterExpanded && (
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className={classes["filter-options"]}
                  >
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Diamond"
                        name="Diamond"
                        checked={mainGrpFilters["Diamond"]}
                        onChange={handleMainGroupCheckChange}
                      />
                      <label htmlFor="Diamond">Diamond</label>
                    </p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Gold"
                        name="Gold"
                        checked={mainGrpFilters["Gold"]}
                        onChange={handleMainGroupCheckChange}
                      />
                      <label htmlFor="Gold">Gold</label>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className={classes["each-filter"]}>
              <div
                className={classes["filter-field"]}
                onClick={handleExpandCategoryFilter}
              >
                <span className={classes.title}>CATEGORY</span>
                <motion.span
                  animate={{ rotate: isCategoryFilterExpanded ? 180 : 0 }}
                  className={classes.symbol}
                >
                  &#9650;
                </motion.span>
              </div>
              <AnimatePresence>
                {isCategoryFilterExpanded && (
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className={classes["filter-options"]}
                  >
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Diamond Jewelery"
                        name="Diamond Jewelery"
                        checked={categoryFilters["Diamond Jewelery"]}
                        onChange={handleCategoryCheckChange}
                      />
                      <label htmlFor="Diamond Jewelery">Diamond Jewelery</label>
                    </p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Gold Jewelery"
                        name="Gold Jewelery"
                        checked={categoryFilters["Gold Jewelery"]}
                        onChange={handleCategoryCheckChange}
                      />
                      <label htmlFor="Gold Jewelery">GOLD Jewelery</label>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className={classes["each-filter"]}>
              <div
                className={classes["filter-field"]}
                onClick={handleExpandDesignFilter}
              >
                <span className={classes.title}>DESIGN NO.</span>
                <motion.span
                  animate={{ rotate: isDesignFilterExpanded ? 180 : 0 }}
                  className={classes.symbol}
                >
                  &#9650;
                </motion.span>
              </div>
              <AnimatePresence>
                {isDesignFilterExpanded && (
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className={classes["filter-options"]}
                  >
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="1"
                        name="D.No:1"
                        checked={designNumFilters["D.No:1"]}
                        onChange={handleDesignNumCheckChange}
                      />
                      <label htmlFor="1">D.No:1</label>
                    </p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="2"
                        name="D.No:2"
                        checked={designNumFilters["D.No:2"]}
                        onChange={handleDesignNumCheckChange}
                      />
                      <label htmlFor="2">D.No:2</label>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className={classes["each-filter"]}>
              <div
                className={classes["filter-field"]}
                onClick={handleExpandStyleFilter}
              >
                <span className={classes.title}>STYLE</span>
                <motion.span
                  animate={{ rotate: isStyleFilterExpanded ? 180 : 0 }}
                  className={classes.symbol}
                >
                  &#9650;
                </motion.span>
              </div>
              <AnimatePresence>
                {isStyleFilterExpanded && (
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className={classes["filter-options"]}
                  >
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Style1"
                        name="Style1"
                        checked={styleFilters["Style1"]}
                        onChange={handleStyleCheckChange}
                      />
                      <label htmlFor="Style 1">Style 1</label>
                    </p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Style2"
                        name="Style2"
                        checked={styleFilters["Style2"]}
                        onChange={handleStyleCheckChange}
                      />
                      <label htmlFor="Style2">Style 2</label>
                    </p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Style3"
                        name="Style3"
                        checked={styleFilters["Style3"]}
                        onChange={handleStyleCheckChange}
                      />
                      <label htmlFor="Style 3">Style 3</label>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className={classes["each-filter"]}>
              <div
                className={classes["filter-field"]}
                onClick={handleExpandProductFilter}
              >
                <span className={classes.title}>PRODUCT</span>
                <motion.span
                  animate={{ rotate: isProductFilterExpanded ? 180 : 0 }}
                  className={classes.symbol}
                >
                  &#9650;
                </motion.span>
              </div>
              <AnimatePresence>
                {isProductFilterExpanded && (
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className={classes["filter-options"]}
                  >
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Product1"
                        name="Product1"
                        checked={productFilters["Product1"]}
                        onChange={handleProductCheckChange}
                      />
                      <label htmlFor="Product 1">Product 1</label>
                    </p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Product2"
                        name="Product2"
                        checked={productFilters["Product2"]}
                        onChange={handleProductCheckChange}
                      />
                      <label htmlFor="Product 2">Product 2</label>
                    </p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Product3"
                        name="Product3"
                        checked={productFilters["Product3"]}
                        onChange={handleProductCheckChange}
                      />
                      <label htmlFor="Product 3">Product 3</label>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className={classes["each-filter"]}>
              <div
                className={classes["filter-field"]}
                onClick={handleExpandWtFilter}
              >
                <span className={classes.title}>Weight Range</span>
                <motion.span
                  animate={{ rotate: isWtFilterExpanded ? 180 : 0 }}
                  className={classes.symbol}
                >
                  &#9650;
                </motion.span>
              </div>
              <AnimatePresence>
                {isWtFilterExpanded && (
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className={classes["filter-options"]}
                  >
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="wt 1"
                        name="0-10grms"
                        checked={weightRangeFilters["0-10grms"]}
                        onChange={handleWtCheckChange}
                      />
                      <label htmlFor="wt 1">0-10grms</label>
                    </p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="wt 2"
                        name="10-20grms"
                        checked={weightRangeFilters["10-20grms"]}
                        onChange={handleWtCheckChange}
                      />
                      <label htmlFor="wt 2">10-20grms</label>
                    </p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="wt 3"
                        name="20-50grms"
                        checked={weightRangeFilters["20-50grms"]}
                        onChange={handleWtCheckChange}
                      />
                      <label htmlFor="wt 3">20-50grms</label>
                    </p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="wt 4"
                        name="50-100grms"
                        checked={weightRangeFilters["50-100grms"]}
                        onChange={handleWtCheckChange}
                      />
                      <label htmlFor="wt 4">50-100grms</label>
                    </p>
                    <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="wt 5"
                                name="100-200grms"
                                checked={weightRangeFilters["100-200grms"]}
                                onChange={handleWtCheckChange}
                              />
                              <label htmlFor="wt 5">100-200grms</label>
                            </p>
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="wt 6"
                                name=">200grms"
                                checked={weightRangeFilters[">200grms"]}
                                onChange={handleWtCheckChange}
                              />
                              <label htmlFor="wt 6">{`> `}200grms</label>
                            </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className={classes["each-filter"]}>
              <div
                className={classes["filter-field"]}
                onClick={handleExpandMoreFilter}
              >
                <span className={classes.title}>MORE FILTERS</span>
                <motion.span
                  animate={{ rotate: isMoreFilterExpanded ? 180 : 0 }}
                  className={classes.symbol}
                >
                  &#9650;
                </motion.span>
              </div>
              <AnimatePresence>
                {isMoreFilterExpanded && (
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className={classes["filter-options"]}
                  >
                    <p className={classes.opt}>Model</p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Model1"
                        name="Model1"
                        checked={modelFilters["Model1"]}
                        onChange={handleModelCheckChange}
                      />
                      <label htmlFor="Model 1">Model 1</label>
                    </p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Model2"
                        name="Model2"
                        checked={modelFilters["Model2"]}
                        onChange={handleModelCheckChange}
                      />
                      <label htmlFor="Model 2">Model 2</label>
                    </p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Model3"
                        name="Model3"
                        checked={modelFilters["Model3"]}
                        onChange={handleModelCheckChange}
                      />
                      <label htmlFor="Model 3">Model 3</label>
                    </p>
                    <p className={classes.opt}>Size</p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Size1"
                        name="Size1"
                        checked={sizeFilters["Size1"]}
                        onChange={handleSizeCheckChange}
                      />
                      <label htmlFor="Size 1">Size 1</label>
                    </p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Size2"
                        name="Size2"
                        checked={sizeFilters["Size2"]}
                        onChange={handleSizeCheckChange}
                      />
                      <label htmlFor="Size 2">Size 2</label>
                    </p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Size3"
                        name="Size3"
                        checked={sizeFilters["Size3"]}
                        onChange={handleSizeCheckChange}
                      />
                      <label htmlFor="Size 3">Size 3</label>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>
          <AnimatePresence>
          {selectedFilters.length > 0 && (
              <motion.ul initial={{y:-20, opacity:0}} animate={{y:0, opacity:1}} exit={{y:-20, opacity:0}} className={classes["selected-filters"]}>
                {selectedFilters.map((eachFilter) => {
                  return (
                    <motion.li
                      layout
                      key={eachFilter.id}
                      onClick={() =>
                        handleRemoveFilter(
                          eachFilter.id,
                          eachFilter.event,
                          eachFilter.setFn
                        )
                      }
                    >
                      <span>{eachFilter.label}</span>
                      <WrongIcon />
                    </motion.li>
                  );
                })}
                <motion.span
                  layout
                  onClick={handleClearAllFilters}
                  className={classes.clear}
                >
                  Clear All
                </motion.span>
              </motion.ul>
          )}
          </AnimatePresence>
        </div>

        <motion.ul
          variants={{
            hidden: { y: -20, opacity: 0 },
            visible: {
              transition: { staggerChildren: 0.05 },
              y: 0,
              opacity: 1,
            },
          }}
          initial="hidden"
          animate="visible"
          className={classes["cards-container"]}
        > {load && <Spin tip="Loading" size="large" style={{alignItems:'center', alignContent:'center'}}></Spin> }
          {load && filteredList.length===0 && <p style={{marginTop:"10rem auto", width:"100%", textAlign: "center"}}>No results found!</p>}
          {filteredList.length>0 && (
            <AnimatePresence>
            {filteredList.map((item) => {
              return (
                <motion.li
                  layout
                  variants={{
                    hidden: { opacity: 0, scale: 0.5 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  // initial="hidden"
                  // animate="visible"
                  exit={{ opacity: 1, scale: 1 }}
                  onClick={() => handleShowDetails(item)}
                  key={item.id}
                  className={classes.card}
                >
                  <img src={item.designImages[0].imageUrl} alt={item.title} />
                  <p className={classes.title}>Design {item.id}</p>
                  <p>Gross Weight: {item.grossWeight} Grms</p>
                </motion.li>
              );
            })}
          </AnimatePresence>
          )}
        </motion.ul>
      </div>
    </div>
  );

  if (isShow) {
    content = (
      <DesignDetails onGoBack={handleGoBack} cardItem={cardItem}/>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">{content}</AnimatePresence>
    </>
  );
}