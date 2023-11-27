import { Drawer } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCheck from "../../../../hooks/use-check";
import { uiActions } from "../../../../store/ui-slice";
import classes from "../ViewDesign.module.css";
import WrongIcon from "../../../../icons/wrong-icon";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchAllDesigns, fetchCatalogueDesigns, postCart, postOrder, queryClientObj } from "../../../../util/http";
import LoadingIndicator from "../../../../UI/LoadingIndicator";
import ErrorBlock from "../../../../UI/ErrorBlock";
import { getAccountLoader, getUserId } from "../../../../util/auth";
import styles from "../../catalogue/CatalogueDesignFields.module.css"
import ErrorModal from "../ErrorModal";

const today = new Date().toISOString().slice(0, 10);

export default function DesignCards({ handleShowDetails, catalogue, updatedCardId, setUpdatedCardId, accountId }) {
  const dispatch = useDispatch();

  const [isDrawerOPen, setIsDrawerOPen] = useState(false);

  const selectedFilters = useSelector((state) => state.ui.selectedFilters);

  const [designList, setDesignList] = useState([]);

  const {data, isPending, isError, error} = useQuery({
    queryKey:  [`${catalogue ? "catalogueDesigns" : "designs"}`],
    queryFn: ({signal})=> (catalogue ? fetchCatalogueDesigns({signal, accountId: accountId}) : fetchAllDesigns()),
  })


  const {
    field: mainGrpFilters,
    handleFieldCheckChange: handleMainGroupCheckChange,
  } = useCheck(
    {
      Gold: false,
      Diamond: false,
    },
    handleCloseFilters
  );

  const {
    field: categoryFilters,
    handleFieldCheckChange: handleCategoryCheckChange,
  } = useCheck(
    {
      "Gold Jewelery": false,
      "Diamond Jewelery": false,
    },
    handleCloseFilters
  );

  const {
    field: designNumFilters,
    handleFieldCheckChange: handleDesignNumCheckChange,
  } = useCheck(
    {
      "D.No:1": false,
      "D.No:2": false,
    },
    handleCloseFilters
  );

  const {
    field: styleFilters,
    handleFieldCheckChange: handleStyleCheckChange,
  } = useCheck(
    {
      "Style 1": false,
      Style2: false,
      Style3: false,
    },
    handleCloseFilters
  );

  const {
    field: productFilters,
    handleFieldCheckChange: handleProductCheckChange,
  } = useCheck(
    {
      Product1: false,
      Product2: false,
      Product3: false,
    },
    handleCloseFilters
  );

  const {
    field: modelFilters,
    handleFieldCheckChange: handleModelCheckChange,
  } = useCheck(
    {
      Model1: false,
      Model2: false,
      Model3: false,
    },
    handleCloseFilters
  );

  const { field: sizeFilters, handleFieldCheckChange: handleSizeCheckChange } =
    useCheck(
      {
        Size1: false,
        Size2: false,
        Size3: false,
      },
      handleCloseFilters
    );

  const {
    field: weightRangeFilters,
    handleFieldCheckChange: handleWtCheckChange,
  } = useCheck(
    {
      "0-10grms": false,
      "10-20grms": false,
      "20-50grms": false,
      "50-100grms": false,
      "100-200grms": false,
      ">200grms": false,
    },
    handleCloseFilters
  );

  const {
    mainGrpFilter: isMainGrpFilterExpanded,
    categoryFilter: isCategoryFilterExpanded,
    designFilter: isDesignFilterExpanded,
    styleFilter: isStyleFilterExpanded,
    productFilter: isProductFilterExpanded,
    wtFilter: isWtFilterExpanded,
    moreFilter: isMoreFilterExpanded,
  } = useSelector((state) => state.ui.filters);

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
    const { name } = event;
    setFn((prev) => {
      return { ...prev, [name]: false };
    });
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

  function handleOpenFilters() {
    setIsDrawerOPen(true);
  }

  function handleCloseFilters() {
    setIsDrawerOPen(false);
  }

  let filteredList = [];
  if(designList.length > 0){
    // console.log(designList[0].designImages[0].preSignedURL);

    filteredList = designList.filter((item) => {
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
        (weightRangeFilters[">200grms"] && item.grossWeight > 200);

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
  }

  let content =(
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
    {filteredList.length === 0 && (
      <p
        style={{
          marginTop: "10rem auto",
          width: "100%",
          textAlign: "center",
        }}
      >
        No results found!
      </p>
    )}
    {filteredList.length > 0 && (
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
              {item.designImages.length > 0 && <img src={item.designImages[0].preSignedURL} alt={item.id} />}
              {item.designImages.length === 0 && <img alt={item.title} />}
              <p className={classes.title}>Design {item.id}</p>
              <p>Gross Weight: {item.grossWeight} Grms</p>
            </motion.li>
          );
        })}
      </AnimatePresence>
    )}
  </motion.ul>
  );

  if(isPending){
    content = <LoadingIndicator />
  }

  if(isError){
    content = <ErrorBlock title="Error occured!" message={error.info?.errorMessage || "Failed to fetch designs!"}  />
  }

  useEffect(()=>{
    if(data){
      if(!data.errorCode){
        setDesignList(data);
      }
    }
  },[data]);

  const userId = getUserId();
  const [errModalIsOpen, setErrModalIsOpen] = useState(false);
  const [err, setErr] = useState();

  const {mutate: orderMutate, isPending: orderIsPendign, isError: orderIsError, error: orderError} = useMutation({
      mutationFn: postOrder,
      onSuccess: ()=>{
          queryClientObj.invalidateQueries({
              queryKey: ["orders"],
          })
      },
      onError: (errData)=>{
          setErrModalIsOpen(true);
          setErr(errData);
      }
  })

  const {mutate: cartMutate} = useMutation({
    mutationFn: postCart,
    onSuccess: ()=>{
        queryClientObj.invalidateQueries({
            queryKey: ["cart"],
        })
    },
    onError: (errData)=>{
        setErrModalIsOpen(true);
        setErr(errData);
    }
})

  function handleOrder(){
      const mappedList = filteredList.map(design => ({designId: design.id, quantity: 1})
        );

      console.log("mappedList of ordering filtered items", mappedList);
        orderMutate({ userId: userId, accountId: accountId, orderItems: [...mappedList] });
  }

  function handleAddToCart(){
    const mappedList = filteredList.map(design => ({designId: design.id, quantity: 1})
        );

      console.log("mappedList of adding to cart the filtered items", mappedList);
        cartMutate({ userId: userId, accountId: accountId, cartItems: [...mappedList] });
  }

  function handleCloseErrModal(){
    setErrModalIsOpen(false);
  }

  return (
    <div key="whole-designs" className={classes["whole-designs-page"]}>
      <div className={classes.designs}>
        <div className={classes["head-content"]}>
          <h1>View All Designs</h1>
          <section className={classes["filters-sm"]}>
            <button onClick={handleOpenFilters}>Filter By</button>
            <Drawer
              title="Filter By"
              placement="bottom"
              height={"90vh"}
              onClose={handleCloseFilters}
              open={isDrawerOPen}
            >
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
                          <label htmlFor="Diamond Jewelery">
                            Diamond Jewelery
                          </label>
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
                          <label htmlFor="Style1">Style 1</label>
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
                          <label htmlFor="Style3">Style 3</label>
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
                          <label htmlFor="Product1">Product 1</label>
                        </p>
                        <p className={classes["checkbox-grp"]}>
                          <input
                            type="checkbox"
                            id="Product2"
                            name="Product2"
                            checked={productFilters["Product2"]}
                            onChange={handleProductCheckChange}
                          />
                          <label htmlFor="Product2">Product 2</label>
                        </p>
                        <p className={classes["checkbox-grp"]}>
                          <input
                            type="checkbox"
                            id="Product3"
                            name="Product3"
                            checked={productFilters["Product3"]}
                            onChange={handleProductCheckChange}
                          />
                          <label htmlFor="Product3">Product 3</label>
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
                          <label htmlFor="Model1">Model 1</label>
                        </p>
                        <p className={classes["checkbox-grp"]}>
                          <input
                            type="checkbox"
                            id="Model2"
                            name="Model2"
                            checked={modelFilters["Model 2"]}
                            onChange={handleModelCheckChange}
                          />
                          <label htmlFor="Model2">Model 2</label>
                        </p>
                        <p className={classes["checkbox-grp"]}>
                          <input
                            type="checkbox"
                            id="Model3"
                            name="Model3"
                            checked={modelFilters["Model3"]}
                            onChange={handleModelCheckChange}
                          />
                          <label htmlFor="Model3">Model 3</label>
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
                          <label htmlFor="Size1">Size 1</label>
                        </p>
                        <p className={classes["checkbox-grp"]}>
                          <input
                            type="checkbox"
                            id="Size2"
                            name="Size2"
                            checked={sizeFilters["Size2"]}
                            onChange={handleSizeCheckChange}
                          />
                          <label htmlFor="Size2">Size 2</label>
                        </p>
                        <p className={classes["checkbox-grp"]}>
                          <input
                            type="checkbox"
                            id="Size3"
                            name="Size3"
                            checked={sizeFilters["Size3"]}
                            onChange={handleSizeCheckChange}
                          />
                          <label htmlFor="Size3">Size 3</label>
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
                      <label htmlFor="Style1">Style 1</label>
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
                      <label htmlFor="Style3">Style 3</label>
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
                      <label htmlFor="Product1">Product 1</label>
                    </p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Product2"
                        name="Product2"
                        checked={productFilters["Product2"]}
                        onChange={handleProductCheckChange}
                      />
                      <label htmlFor="Product2">Product 2</label>
                    </p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Product3"
                        name="Product3"
                        checked={productFilters["Product3"]}
                        onChange={handleProductCheckChange}
                      />
                      <label htmlFor="Product3">Product 3</label>
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
                      <label htmlFor="Model1">Model 1</label>
                    </p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Model2"
                        name="Model2"
                        checked={modelFilters["Model2"]}
                        onChange={handleModelCheckChange}
                      />
                      <label htmlFor="Model2">Model 2</label>
                    </p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Model3"
                        name="Model3"
                        checked={modelFilters["Model3"]}
                        onChange={handleModelCheckChange}
                      />
                      <label htmlFor="Model3">Model 3</label>
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
                      <label htmlFor="Size1">Size 1</label>
                    </p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Size2"
                        name="Size2"
                        checked={sizeFilters["Size2"]}
                        onChange={handleSizeCheckChange}
                      />
                      <label htmlFor="Size2">Size 2</label>
                    </p>
                    <p className={classes["checkbox-grp"]}>
                      <input
                        type="checkbox"
                        id="Size3"
                        name="Size3"
                        checked={sizeFilters["Size3"]}
                        onChange={handleSizeCheckChange}
                      />
                      <label htmlFor="Size3">Size 3</label>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>
  
          <AnimatePresence>
            {selectedFilters.length > 0 && (
              <motion.ul
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className={classes["selected-filters"]}
              >
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

          {catalogue && filteredList.length > 0 && <div className={styles["actions"]} style={{ width: "100%", display:"flex", justifyContent: "center", alignItems: "center", marginTop: "1rem"}}>
            <button className={classes["add-to-cart"]} style={{paddingBottom: "0.25rem", paddingTop: "0.25rem"}} onClick={handleAddToCart}>Add to cart</button>
            <button className={classes["buy"]} style={{paddingBottom: "0.25rem", paddingTop: "0.25rem"}} onClick={handleOrder}>order now</button>
          </div>}
        </div>

        <div className={classes["outer-cards-container"]}>
          {content}
          {errModalIsOpen && <ErrorModal errModalIsOpen={errModalIsOpen} err={err} onCloseErrModal={handleCloseErrModal} fallBackErrMsg={orderIsError ? "Failed to post order" : "Failed to post cart"}/>}
        </div>
      </div>
    </div>
  );
}