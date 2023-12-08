import { useEffect, useState } from "react";
import classes from "./ViewDesign.module.css";
import { useRouteLoaderData } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../store/ui-slice";
import DesignDetails from "./DesignDetails";
import axios from "axios";
import DesignCards from "./DesignCards/DesignCards";
import GetAccounts from "../../../util/accounts";

export default function ViewDesign() {

const token = useRouteLoaderData("root");
  const dispatch = useDispatch();

  // const [isShow, setIsShow] = useState(false);

  const [cardItem, setCardItem] = useState();
  const [updatedCardId, setUpdatedCardId] = useState();

  const isDesignDetailsOpen = useSelector((state)=>state.ui.isDesignDetailsOpen);

  function handleShowDetails(item) {
    // console.log(item);
    setCardItem(item);
    dispatch(uiActions.openDesignDetails());
    // setIsShow(true);
  }
  function handleGoBack() {
    // setIsShow(false);
    setCardItem();
    dispatch(uiActions.closeDesignDetails());
  }

  function handleAnyUpdateAction(id){
    setUpdatedCardId(id);
    setCardItem();
  }



  let content = (
    <DesignCards handleShowDetails={handleShowDetails} updatedCardId={updatedCardId} setUpdatedCardId={setUpdatedCardId} />
  );

  if (isDesignDetailsOpen) {
    content = (
      <DesignDetails onGoBack={handleGoBack} cardItem={cardItem} onAnyUpdateAction={handleAnyUpdateAction} />
    );
  }

  return (
    <>
      <GetAccounts/>
      <AnimatePresence mode="wait">{content}</AnimatePresence>
    </>
  );
}