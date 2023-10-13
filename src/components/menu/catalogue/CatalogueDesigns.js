import { useEffect, useMemo, useState } from "react";
import classes from "../view-designs/ViewDesign.module.css";
import { useRouteLoaderData } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../store/ui-slice";
import WrongIcon from "../../../icons/wrong-icon";
import useCheck from "../../../hooks/use-check";
import { Drawer } from "antd";
import DesignDetails from "../view-designs/DesignDetails";
import axios from "axios";
import DesignCards from "../view-designs/DesignCards/DesignCards";

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
