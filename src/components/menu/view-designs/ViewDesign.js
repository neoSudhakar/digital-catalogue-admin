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

const today = new Date().toISOString().slice(0, 10);

const DUMMY_LIST = [
  {
    id: "d1",
    title: "Design 1",
    description: "This is the first Design.",
    price: 300,
    main_group: "Diamond",
    category: "Diamond Jewelery",
    design_number: 1,
    created_date: today,
    style: "Style 2",
    product: "Product 2",
    model: "Model 2",
    size: "Size 2",
    worker: "Worker 2",
    pieces: 1,
    gross_weight: 120,
    stone_weight: 130,
    net_weight: 140,
    component_weight: 150,
    ghat_weight: 160,
    remark: "Remarks description...",
    images:[
      {image: "https://picsum.photos/536/354", isDefault: true},
      {image: "https://picsum.photos/536/301", isDefault: false},
      {image: "https://picsum.photos/536/302", isDefault: false},
      {image: "https://picsum.photos/536/303" , isDefault: false},
    ]
  },
  {
    id: "d2",
    title: "Design 2",
    description: "This is the second Design.",
    price: 350,
    main_group: "Gold",
    category: "Gold Jewelery",
    design_number: 2,
    created_date: today,
    style: "Style 3",
    product: "Product 3",
    model: "Model 3",
    size: "Size 3",
    worker: "Worker 3",
    pieces: 1,
    gross_weight: 130,
    stone_weight: 130,
    net_weight: 140,
    component_weight: 150,
    ghat_weight: 160,
    remark: "Remarks description...",
    images:[
      {image: "https://picsum.photos/536/355", isDefault: true},
      {image: "https://picsum.photos/536/304", isDefault: false},
      {image: "https://picsum.photos/536/305", isDefault: false},
      {image: "https://picsum.photos/536/306" , isDefault: false},
    ]
  },
  {
    id: "d3",
    title: "Design 3",
    description: "This is the third Design.",
    price: 390,
    main_group: "Diamond",
    category: "Diamond Jewelery",
    design_number: 1,
    created_date: today,
    style: "Style 2",
    product: "Product 2",
    model: "Model 2",
    size: "Size 2",
    worker: "Worker 2",
    pieces: 1,
    gross_weight: 140,
    stone_weight: 130,
    net_weight: 140,
    component_weight: 150,
    ghat_weight: 160,
    remark: "Remarks description...",
    images:[
      {image: "https://picsum.photos/536/353", isDefault: true},
      {image: "https://picsum.photos/536/307", isDefault: false},
      {image: "https://picsum.photos/536/308", isDefault: false},
      {image: "https://picsum.photos/536/309" , isDefault: false},
    ]
  },
  {
    id: "d4",
    title: "Design 4",
    description: "This is the fourth Design.",
    price: 400,
    main_group: "Gold",
    category: "Gold Jewelery",
    design_number: 2,
    created_date: today,
    style: "Style 1",
    product: "Product 1",
    model: "Model 1",
    size: "Size 1",
    worker: "Worker 1",
    pieces: 1,
    gross_weight: 120,
    stone_weight: 130,
    net_weight: 140,
    component_weight: 150,
    ghat_weight: 160,
    remark: "Remarks description...",
    images:[
      {image: "https://picsum.photos/536/352", isDefault: true},
      {image: "https://picsum.photos/536/310", isDefault: false},
      {image: "https://picsum.photos/536/311", isDefault: false},
      {image: "https://picsum.photos/536/312" , isDefault: false},
    ]
  },
  {
    id: "d5",
    title: "Design 5",
    description: "This is the fifth Design.",
    price: 450,
    main_group: "Diamond",
    category: "Diamond Jewelery",
    design_number: 1,
    created_date: today,
    style: "Style 2",
    product: "Product 2",
    model: "Model 2",
    size: "Size 2",
    worker: "Worker 2",
    pieces: 1,
    gross_weight: 130,
    stone_weight: 130,
    net_weight: 140,
    component_weight: 150,
    ghat_weight: 160,
    remark: "Remarks description...",
    images:[
      {image: "https://picsum.photos/536/351", isDefault: true},
      {image: "https://picsum.photos/536/313", isDefault: false},
      {image: "https://picsum.photos/536/314", isDefault: false},
      {image: "https://picsum.photos/536/315" , isDefault: false},
    ]
  },
  {
    id: "d6",
    title: "Design 6",
    description: "This is the sixth Design.",
    price: 500,
    main_group: "Gold",
    category: "Gold Jewelery",
    design_number: 2,
    created_date: today,
    style: "Style 3",
    product: "Product 3",
    model: "Model 3",
    size: "Size 3",
    worker: "Worker 3",
    pieces: 1,
    gross_weight: 140,
    stone_weight: 130,
    net_weight: 140,
    component_weight: 150,
    ghat_weight: 160,
    remark: "Remarks description...",
    images:[
      {image: "https://picsum.photos/536/356", isDefault: true},
      {image: "https://picsum.photos/536/316", isDefault: false},
      {image: "https://picsum.photos/536/317", isDefault: false},
      {image: "https://picsum.photos/536/318" , isDefault: false},
    ]
  },
  {
    id: "d7",
    title: "Design 7",
    description: "This is the seventh Design.",
    price: 550,
    main_group: "Diamond",
    category: "Diamond Jewelery",
    design_number: 2,
    created_date: today,
    style: "Style 2",
    product: "Product 2",
    model: "Model 2",
    size: "Size 2",
    worker: "Worker 2",
    pieces: 1,
    gross_weight: 120,
    stone_weight: 130,
    net_weight: 140,
    component_weight: 150,
    ghat_weight: 160,
    remark: "Remarks description...",
    images:[
      {image: "https://picsum.photos/536/357", isDefault: true},
      {image: "https://picsum.photos/536/319", isDefault: false},
      {image: "https://picsum.photos/536/320", isDefault: false},
      {image: "https://picsum.photos/536/321" , isDefault: false},
    ]
  },
  {
    id: "d8",
    title: "Design 8",
    description: "This is the eighth Design.",
    price: 600,
    main_group: "Gold",
    category: "Gold Jewelery",
    design_number: 1,
    created_date: today,
    style: "Style 3",
    product: "Product 3",
    model: "Model 3",
    size: "Size 3",
    worker: "Worker 3",
    pieces: 1,
    gross_weight: 130,
    stone_weight: 130,
    net_weight: 140,
    component_weight: 150,
    ghat_weight: 160,
    remark: "Remarks description...",
    images:[
      {image: "https://picsum.photos/536/358", isDefault: true},
      {image: "https://picsum.photos/536/322", isDefault: false},
      {image: "https://picsum.photos/536/323", isDefault: false},
      {image: "https://picsum.photos/536/324" , isDefault: false},
    ]
  },
  {
    id: "d9",
    title: "Design 9",
    description: "This is the ninth Design.",
    price: 650,
    main_group: "Diamond",
    category: "Diamond Jewelery",
    design_number: 2,
    created_date: today,
    style: "Style 1",
    product: "Product 1",
    model: "Model 1",
    size: "Size 1",
    worker: "Worker 1",
    pieces: 1,
    gross_weight: 140,
    stone_weight: 130,
    net_weight: 140,
    component_weight: 150,
    ghat_weight: 160,
    remark: "Remarks description...",
    images:[
      {image: "https://picsum.photos/536/359", isDefault: true},
      {image: "https://picsum.photos/536/325", isDefault: false},
      {image: "https://picsum.photos/536/326", isDefault: false},
      {image: "https://picsum.photos/536/327" , isDefault: false},
    ]
  },
  {
    id: "d10",
    title: "Design 10",
    description: "This is the tenth Design.",
    price: 700,
    main_group: "Gold",
    category: "Gold Jewelery",
    design_number: 1,
    created_date: today,
    style: "Style 2",
    product: "Product 2",
    model: "Model 2",
    size: "Size 2",
    worker: "Worker 2",
    pieces: 1,
    gross_weight: 120,
    stone_weight: 130,
    net_weight: 140,
    component_weight: 150,
    ghat_weight: 160,
    remark: "Remarks description...",
    images:[
      {image: "https://picsum.photos/536/360", isDefault: true},
      {image: "https://picsum.photos/536/328", isDefault: false},
      {image: "https://picsum.photos/536/329", isDefault: false},
      {image: "https://picsum.photos/536/330" , isDefault: false},
    ]
  },
  {
    id: "d11",
    title: "Design 11",
    description: "This is the 11th Design.",
    price: 750,
    main_group: "Diamond",
    category: "Diamond Jewelery",
    design_number: 2,
    created_date: today,
    style: "Style 1",
    product: "Product 1",
    model: "Model 1",
    size: "Size 1",
    worker: "Worker 1",
    pieces: 1,
    gross_weight: 130,
    stone_weight: 130,
    net_weight: 140,
    component_weight: 150,
    ghat_weight: 160,
    remark: "Remarks description...",
    images:[
      {image: "https://picsum.photos/536/361", isDefault: true},
      {image: "https://picsum.photos/536/331", isDefault: false},
      {image: "https://picsum.photos/536/332", isDefault: false},
      {image: "https://picsum.photos/536/333" , isDefault: false},
    ]
  },
  {
    id: "d12",
    title: "Design 12",
    description: "This is the 12th Design.",
    price: 750,
    main_group: "Gold",
    category: "Gold Jewelery",
    design_number: 1,
    created_date: today,
    style: "Style 2",
    product: "Product 2",
    model: "Model 2",
    size: "Size 2",
    worker: "Worker 2",
    pieces: 1,
    gross_weight: 140,
    stone_weight: 130,
    net_weight: 140,
    component_weight: 150,
    ghat_weight: 160,
    remark: "Remarks description...",
    images:[
      {image: "https://picsum.photos/536/362", isDefault: true},
      {image: "https://picsum.photos/536/334", isDefault: false},
      {image: "https://picsum.photos/536/335", isDefault: false},
      {image: "https://picsum.photos/536/336" , isDefault: false},
    ]
  },
  {
    id: "d13",
    title: "Design 13",
    description: "This is the 13th Design.",
    price: 750,
    main_group: "Gold",
    category: "Gold Jewelery",
    design_number: 1,
    created_date: today,
    style: "Style 3",
    product: "Product 3",
    model: "Model 3",
    size: "Size 3",
    worker: "Worker 1",
    pieces: 1,
    gross_weight: 100,
    stone_weight: 100,
    net_weight: 100,
    component_weight: 100,
    ghat_weight: 100,
    remark: "Remarks description...",
    images:[
      {image: "https://picsum.photos/536/363", isDefault: true},
      {image: "https://picsum.photos/536/337", isDefault: false},
      {image: "https://picsum.photos/536/338", isDefault: false},
      {image: "https://picsum.photos/536/339" , isDefault: false},
    ]
  },
];

export default function ViewDesign() {
  const token = useRouteLoaderData("root");
  const dispatch = useDispatch();

  const [isDrawerOPen, setIsDrawerOPen]= useState(false);

  const selectedFilters = useSelector((state) => state.ui.selectedFilters);

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
    "Style 1": false,
    "Style 2": false,
    "Style 3": false,
  }, handleCloseFilters);

  const {
    field: productFilters,
    handleFieldCheckChange: handleProductCheckChange,
  } = useCheck({
    "Product 1": false,
    "Product 2": false,
    "Product 3": false,
  }, handleCloseFilters);

  const {
    field: modelFilters,
    handleFieldCheckChange: handleModelCheckChange,
  } = useCheck({
    "Model 1": false,
    "Model 2": false,
    "Model 3": false,
  }, handleCloseFilters);

  const { field: sizeFilters, handleFieldCheckChange: handleSizeCheckChange } =
    useCheck({
      "Size 1": false,
      "Size 2": false,
      "Size 3": false,
    }, handleCloseFilters);

  const {
    field: weightRangeFilters,
    handleFieldCheckChange: handleWtCheckChange,
  } = useCheck({
    "0-10grms": false,
    "10-20grms": false,
    "20-50grms": false,
    "50-100grms": false,
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

  const [designList, setDesignList] = useState([]);

  useEffect(() => {
    getVeiwDesign();
  },[]);

  const getVeiwDesign = () => {
    axios.get('http://localhost:8080/api/designs')
      .then((res) =>  {
        console.log('response is list Designs: ',res.data)
        setDesignList(res.data);
      })
        .catch((err) => console.log('error is : ', err))
  }

  function handleShowDetails(item) {
    console.log(item);
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

  //console.log(selectedFilters);

  function handleOpenFilters() {
    setIsDrawerOPen(true);
  }

  function handleCloseFilters(){
    setIsDrawerOPen(false);
  }

  let filteredList = DUMMY_LIST.filter((item) => {
    if (mainGrpFilters["Diamond"] && item.main_group === "Diamond") {
      return true;
    }
    if (mainGrpFilters["Gold"] && item.main_group === "Gold") {
      return true;
    }

    if (categoryFilters["Gold Jewelery"] && item.category === "Gold Jewelery") {
      return true;
    }
    if (
      categoryFilters["Diamond Jewelery"] &&
      item.category === "Diamond Jewelery"
    ) {
      return true;
    }

    if (designNumFilters["D.No:1"] && item.design_number === 1) {
      return true;
    }
    if (designNumFilters["D.No:2"] && item.design_number === 2) {
      return true;
    }

    if (styleFilters["Style 1"] && item.style === "Style 1") {
      return true;
    }
    if (styleFilters["Style 2"] && item.style === "Style 2") {
      return true;
    }
    if (styleFilters["Style 3"] && item.style === "Style 3") {
      return true;
    }

    if (productFilters["Product 1"] && item.product === "Product 1") {
      return true;
    }
    if (productFilters["Product 2"] && item.product === "Product 2") {
      return true;
    }
    if (productFilters["Product 3"] && item.product === "Product 3") {
      return true;
    }

    if (modelFilters["Model 1"] && item.model === "Model 1") {
      return true;
    }
    if (modelFilters["Model 2"] && item.model === "Model 2") {
      return true;
    }
    if (modelFilters["Model 3"] && item.model === "Model 3") {
      return true;
    }

    if (sizeFilters["Size 1"] && item.size === "Size 1") {
      return true;
    }
    if (sizeFilters["Size 2"] && item.size === "Size 2") {
      return true;
    }
    if (sizeFilters["Size 3"] && item.size === "Size 3") {
      return true;
    }

    if (weightRangeFilters["0-10grms"] && item.gross_weight <= 10) {
      return true;
    }
    if (
      weightRangeFilters["10-20grms"] &&
      item.gross_weight > 10 &&
      item.gross_weight <= 20
    ) {
      return true;
    }
    if (
      weightRangeFilters["20-50grms"] &&
      item.gross_weight > 20 &&
      item.gross_weight <= 50
    ) {
      return true;
    }
    if (
      weightRangeFilters["50-100grms"] &&
      item.gross_weight > 50 &&
      item.gross_weight <= 100
    ) {
      return true;
    }

    return false;
  });

  if (filteredList.length === 0) {
    filteredList = DUMMY_LIST;
  }

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
                              <label htmlFor="1">1</label>
                            </p>
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="2"
                                name="D.No:2"
                                checked={designNumFilters["D.No:2"]}
                                onChange={handleDesignNumCheckChange}
                              />
                              <label htmlFor="2">2</label>
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
                                id="Style 1"
                                name="Style 1"
                                checked={styleFilters["Style 1"]}
                                onChange={handleStyleCheckChange}
                              />
                              <label htmlFor="Style 1">Style 1</label>
                            </p>
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="Style 2"
                                name="Style 2"
                                checked={styleFilters["Style 2"]}
                                onChange={handleStyleCheckChange}
                              />
                              <label htmlFor="Style 2">Style 2</label>
                            </p>
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="Style 3"
                                name="Style 3"
                                checked={styleFilters["Style 3"]}
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
                                id="Product 1"
                                name="Product 1"
                                checked={productFilters["Product 1"]}
                                onChange={handleProductCheckChange}
                              />
                              <label htmlFor="Product 1">Product 1</label>
                            </p>
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="Product 2"
                                name="Product 2"
                                checked={productFilters["Product 2"]}
                                onChange={handleProductCheckChange}
                              />
                              <label htmlFor="Product 2">Product 2</label>
                            </p>
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="Product 3"
                                name="Product 3"
                                checked={productFilters["Product 3"]}
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
                                id="Model 1"
                                name="Model 1"
                                checked={modelFilters["Model 1"]}
                                onChange={handleModelCheckChange}
                              />
                              <label htmlFor="Model 1">Model 1</label>
                            </p>
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="Model 2"
                                name="Model 2"
                                checked={modelFilters["Model 2"]}
                                onChange={handleModelCheckChange}
                              />
                              <label htmlFor="Model 2">Model 2</label>
                            </p>
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="Model 3"
                                name="Model 3"
                                checked={modelFilters["Model 3"]}
                                onChange={handleModelCheckChange}
                              />
                              <label htmlFor="Model 3">Model 3</label>
                            </p>
                            <p className={classes.opt}>Size</p>
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="Size 1"
                                name="Size 1"
                                checked={sizeFilters["Size 1"]}
                                onChange={handleSizeCheckChange}
                              />
                              <label htmlFor="Size 1">Size 1</label>
                            </p>
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="Size 2"
                                name="Size 2"
                                checked={sizeFilters["Size 2"]}
                                onChange={handleSizeCheckChange}
                              />
                              <label htmlFor="Size 2">Size 2</label>
                            </p>
                            <p className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id="Size 3"
                                name="Size 3"
                                checked={sizeFilters["Size 3"]}
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
                      <label htmlFor="1">1</label>
                    </p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="2"
                        name="D.No:2"
                        checked={designNumFilters["D.No:2"]}
                        onChange={handleDesignNumCheckChange}
                      />
                      <label htmlFor="2">2</label>
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
                        id="Style 1"
                        name="Style 1"
                        checked={styleFilters["Style 1"]}
                        onChange={handleStyleCheckChange}
                      />
                      <label htmlFor="Style 1">Style 1</label>
                    </p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Style 2"
                        name="Style 2"
                        checked={styleFilters["Style 2"]}
                        onChange={handleStyleCheckChange}
                      />
                      <label htmlFor="Style 2">Style 2</label>
                    </p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Style 3"
                        name="Style 3"
                        checked={styleFilters["Style 3"]}
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
                        id="Product 1"
                        name="Product 1"
                        checked={productFilters["Product 1"]}
                        onChange={handleProductCheckChange}
                      />
                      <label htmlFor="Product 1">Product 1</label>
                    </p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Product 2"
                        name="Product 2"
                        checked={productFilters["Product 2"]}
                        onChange={handleProductCheckChange}
                      />
                      <label htmlFor="Product 2">Product 2</label>
                    </p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Product 3"
                        name="Product 3"
                        checked={productFilters["Product 3"]}
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
                        id="Model 1"
                        name="Model 1"
                        checked={modelFilters["Model 1"]}
                        onChange={handleModelCheckChange}
                      />
                      <label htmlFor="Model 1">Model 1</label>
                    </p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Model 2"
                        name="Model 2"
                        checked={modelFilters["Model 2"]}
                        onChange={handleModelCheckChange}
                      />
                      <label htmlFor="Model 2">Model 2</label>
                    </p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Model 3"
                        name="Model 3"
                        checked={modelFilters["Model 3"]}
                        onChange={handleModelCheckChange}
                      />
                      <label htmlFor="Model 3">Model 3</label>
                    </p>
                    <p className={classes.opt}>Size</p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Size 1"
                        name="Size 1"
                        checked={sizeFilters["Size 1"]}
                        onChange={handleSizeCheckChange}
                      />
                      <label htmlFor="Size 1">Size 1</label>
                    </p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Size 2"
                        name="Size 2"
                        checked={sizeFilters["Size 2"]}
                        onChange={handleSizeCheckChange}
                      />
                      <label htmlFor="Size 2">Size 2</label>
                    </p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Size 3"
                        name="Size 3"
                        checked={sizeFilters["Size 3"]}
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
        >
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
                  <img src={item.images[0].image} alt={item.title} />
                  <p className={classes.title}>{item.title}</p>
                  <p>{item.description}</p>
                </motion.li>
              );
            })}
          </AnimatePresence>
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
