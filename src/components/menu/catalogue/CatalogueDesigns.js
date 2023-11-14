import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import classes from "../view-designs/ViewDesign.module.css";
import { redirect, useNavigate, useRouteLoaderData } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import DesignCards from "../view-designs/DesignCards/DesignCards";
import CatalogueDesignDetails from "./CatalogueDesignDetails";
import { uiActions } from "../../../store/ui-slice";
import { getAccountLoader } from "../../../util/auth";

export default function CatalogueDesigns() {
  const navigate = useNavigate();

  const account = getAccountLoader();

  const accountId = account?.id;

  const token = useRouteLoaderData("root");
  const dispatch = useDispatch();

  const [cardItem, setCardItem] = useState(null);

  const isDesignDetailsOpen = useSelector((state)=>state.ui.isCatalogueDesignDetailsOpen);

  function handleShowDetails(item) {
    console.log(item);
    setCardItem(item);
    dispatch(uiActions.openCatalogueDesignDetails());
  }
  function handleGoBack() {
    dispatch(uiActions.closeCatalogueDesignDetails());
  }



  let content = (
    <DesignCards handleShowDetails={handleShowDetails} catalogue accountId={accountId}/>
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
