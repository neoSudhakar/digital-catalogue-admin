import { useEffect, useMemo, useState } from "react";
import classes from "../view-designs/ViewDesign.module.css";
import { useRouteLoaderData } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import DesignCards from "../view-designs/DesignCards/DesignCards";
import CatalogueDesignDetails from "./CatalogueDesignDetails";
import { uiActions } from "../../../store/ui-slice";

export default function CatalogueDesigns() {

  // const [designList, setDesignList] = useState([]);

  // useEffect(() => {
  //   getVeiwDesign();
  // },[]);

  // const getVeiwDesign = () => {
  //   axios.get('http://18.204.204.183:8080/api/designs')
  //     .then((res) =>  {
  //       console.log('response is list Designs: ',res.data)
  //       setDesignList(res.data);
  //     })
  //       .catch((err) => console.log('error is : ', err))
  // }

  const token = useRouteLoaderData("root");
  const dispatch = useDispatch();

  // const [isShow, setIsShow] = useState(false);

  const [cardItem, setCardItem] = useState(null);

  const isDesignDetailsOpen = useSelector((state)=>state.ui.isCatalogueDesignDetailsOpen);

  function handleShowDetails(item) {
    console.log(item);
    setCardItem(item);
    // setIsShow(true);
    dispatch(uiActions.openCatalogueDesignDetails());
  }
  function handleGoBack() {
    // setIsShow(false);
    dispatch(uiActions.closeCatalogueDesignDetails());
  }



  let content = (
    <DesignCards handleShowDetails={handleShowDetails} catalogue/>
  );

  if (isDesignDetailsOpen) {
    content = (
      <CatalogueDesignDetails onGoBack={handleGoBack} cardItem={cardItem}/>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">{content}</AnimatePresence>
    </>
  );
}
