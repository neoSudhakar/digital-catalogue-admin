import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import classes from "./Drawer.module.css";

const DrawerComponent = ({isOpen, onCloseDrawer}) => {

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
      </Drawer>
    </>
  );
};
export default DrawerComponent;