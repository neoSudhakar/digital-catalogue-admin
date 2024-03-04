import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import classes from "./Drawer.module.css";
import { BASE_URL } from '../../../util/http';

const DrawerComponent = ({isOpen, onCloseDrawer}) => {

  const [groupData, setGroupData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [styleData, setStyleData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [modelData, setModelData] = useState([]);
    const [sizeData, setSizeData] = useState([]);

    const fetchGroupData = async () => {
      try {
        const response = await fetch(BASE_URL+'/groups');
        
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
        const response = await fetch(BASE_URL+'/categories');
        
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
        const response = await fetch(BASE_URL+'/styles');
        
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
        const response = await fetch(BASE_URL+'/products');
        
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
        const response = await fetch(BASE_URL+'/models');
        
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
        const response = await fetch(BASE_URL+'/sizes');
        
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

    useEffect(()=>{
      fetchGroupData();
      fetchCategoryData();
      fetchStyleData();
      fetchProductData();
      fetchModelData();
      fetchSizeData();
    },[])


  const onClose = () => {
    onCloseDrawer();
  };


  return (
    <>
      <Drawer title="Filter By" placement="bottom" onClose={onClose} open={isOpen}>
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
                    {groupData.map((option) => (
                      <p key={option.id} className={classes["checkbox-grp"]}>
                          <input
                            type="checkbox"
                            id={option.name}
                            name={option.name}
                            checked={mainGrpFilters[option.name] || false}
                            onChange={handleMainGroupCheckChange}
                            />
                          <label htmlFor={option.name}>{option.name}</label>
                      </p>
                    ))}
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
                    {categoryData.map((option) => (
                          <p key={option.id} className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id={option.name}
                                name={option.name}
                                checked={categoryFilters[option.name] || false}
                                onChange={handleCategoryCheckChange}
                                />
                              <label htmlFor={option.name}>{option.name}</label>
                          </p>
                        ))}
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
                    {styleData.map((option) => (
                          <p key={option.id} className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id={option.name}
                                name={option.name}
                                checked={styleFilters[option.name] || false}
                                onChange={handleStyleCheckChange}
                                />
                              <label htmlFor={option.name}>{option.name}</label>
                          </p>
                        ))}
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
                    {productData.map((option) => (
                          <p key={option.id} className={classes["checkbox-grp"]}>
                              <input
                                type="checkbox"
                                id={option.name}
                                name={option.name}
                                checked={productFilters[option.name] || false}
                                onChange={handleProductCheckChange}
                                />
                              <label htmlFor={option.name}>{option.name}</label>
                          </p>
                        ))}
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
                          {modelData.map((option) => (
                            <p key={option.id} className={classes["checkbox-grp"]}>
                                <input
                                  type="checkbox"
                                  id={option.name}
                                  name={option.name}
                                  checked={modelFilters[option.name] || false}
                                  onChange={handleModelCheckChange}
                                  />
                                <label htmlFor={option.name}>{option.name}</label>
                            </p>
                          ))}
                          <p className={classes.opt}>Size</p>
                          {sizeData.map((option) => (
                            <p key={option.id} className={classes["checkbox-grp"]}>
                                <input
                                  type="checkbox"
                                  id={option.name}
                                  name={option.name}
                                  checked={sizeFilters[option.name] || false}
                                  onChange={handleSizeCheckChange}
                                  />
                                <label htmlFor={option.name}>{option.name}</label>
                            </p>
                          ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
      </section>
      </Drawer>
    </>
  );
};
export default DrawerComponent;