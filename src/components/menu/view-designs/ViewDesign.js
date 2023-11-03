import { useState } from "react";
import classes from "./ViewDesign.module.css";
import { useRouteLoaderData } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../store/ui-slice";
import DesignDetails from "./DesignDetails";
import axios from "axios";
import DesignCards from "./DesignCards/DesignCards";

export default function ViewDesign() {

const token = useRouteLoaderData("root");
  const dispatch = useDispatch();

  // const [isShow, setIsShow] = useState(false);

  const [cardItem, setCardItem] = useState(null);

  const isDesignDetailsOpen = useSelector((state)=>state.ui.isDesignDetailsOpen);

  function handleShowDetails(item) {
    console.log(item);
    setCardItem(item);
    // setIsShow(true);
    dispatch(uiActions.openDesignDetails());
  }
  function handleGoBack() {
    // setIsShow(false);
    dispatch(uiActions.closeDesignDetails());
  }



  let content = (
    <DesignCards handleShowDetails={handleShowDetails} setCardItem={setCardItem}/>
  );

  if (isDesignDetailsOpen) {
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
