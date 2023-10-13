import { useState } from "react";
import classes from "./ViewDesign.module.css";
import { useRouteLoaderData } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../store/ui-slice";
import DesignDetails from "./DesignDetails";
import axios from "axios";
import DesignCards from "./DesignCards/DesignCards";

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
    style: "Style2",
    product: "Product2",
    model: "Model2",
    size: "Size2",
    worker: "Worker2",
    pieces: 1,
    grossWeight: 200,
    stoneWeight: 130,
    netWeight: 140,
    componentWeight: 150,
    ghatWt: 160,
    remark: "Remarks description...",
    detailsSet: [
      {
        type: 'Composite',
        stoneGroup: 'StoneGroup1',
        pieces: 122,
        stoneWeight: 12,
        unitOfMeasurement: 'Grm/Cts'
      },
      {
        type: 'Stone',
        stoneGroup: 'StoneGroup2',
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
    style: "Style3",
    product: "Product3",
    model: "Model3",
    size: "Size3",
    worker: "Worker3",
    pieces: 1,
    grossWeight: 130,
    stoneWeight: 130,
    netWeight: 140,
    componentWeight: 150,
    ghatWt: 160,
    remark: "Remarks description...",
    detailsSet: [
      {
        type: 'Composite',
        stoneGroup: 'StoneGroup1',
        pieces: 122,
        stoneWeight: 12,
        unitOfMeasurement: 'Grm/Cts'
      },
      {
        type: 'Stone',
        stoneGroup: 'StoneGroup2',
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
    style: "Style2",
    product: "Product2",
    model: "Model2",
    size: "Size2",
    worker: "Worker2",
    pieces: 1,
    grossWeight: 210,
    stoneWeight: 130,
    netWeight: 140,
    componentWeight: 150,
    ghatWt: 160,
    remark: "Remarks description...",
    detailsSet: [
      {
        type: 'Composite',
        stoneGroup: 'StoneGroup1',
        pieces: 122,
        stoneWeight: 12,
        unitOfMeasurement: 'Grm/Cts'
      },
      {
        type: 'Stone',
        stoneGroup: 'StoneGroup2',
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
    style: "Style1",
    product: "Product1",
    model: "Model1",
    size: "Size1",
    worker: "Worker1",
    pieces: 1,
    grossWeight: 250,
    stoneWeight: 130,
    netWeight: 140,
    componentWeight: 150,
    ghatWt: 160,
    remark: "Remarks description...",
    detailsSet: [
      {
        type: 'Composite',
        stoneGroup: 'StoneGroup1',
        pieces: 122,
        stoneWeight: 12,
        unitOfMeasurement: 'Grm/Cts'
      },
      {
        type: 'Stone',
        stoneGroup: 'StoneGroup2',
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
    style: "Style2",
    product: "Product2",
    model: "Model2",
    size: "Size2",
    worker: "Worker2",
    pieces: 1,
    grossWeight: 190,
    stoneWeight: 130,
    netWeight: 140,
    componentWeight: 150,
    ghatWt: 160,
    remark: "Remarks description...",
    detailsSet: [
      {
        type: 'Composite',
        stoneGroup: 'StoneGroup1',
        pieces: 122,
        stoneWeight: 12,
        unitOfMeasurement: 'Grm/Cts'
      },
      {
        type: 'Stone',
        stoneGroup: 'StoneGroup2',
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
    style: "Style3",
    product: "Product3",
    model: "Model3",
    size: "Size3",
    worker: "Worker3",
    pieces: 1,
    grossWeight: 140,
    stoneWeight: 130,
    netWeight: 140,
    componentWeight: 150,
    ghatWt: 160,
    remark: "Remarks description...",
    detailsSet: [
      {
        type: 'Composite',
        stoneGroup: 'StoneGroup1',
        pieces: 122,
        stoneWeight: 12,
        unitOfMeasurement: 'Grm/Cts'
      },
      {
        type: 'Stone',
        stoneGroup: 'StoneGroup2',
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
    style: "Style2",
    product: "Product2",
    model: "Model2",
    size: "Size2",
    worker: "Worker2",
    pieces: 1,
    grossWeight: 90,
    stoneWeight: 130,
    netWeight: 140,
    componentWeight: 150,
    ghatWt: 160,
    remark: "Remarks description...",
    detailsSet: [
      {
        type: 'Composite',
        stoneGroup: 'StoneGroup1',
        pieces: 122,
        stoneWeight: 12,
        unitOfMeasurement: 'Grm/Cts'
      },
      {
        type: 'Stone',
        stoneGroup: 'StoneGroup2',
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
    style: "Style3",
    product: "Product3",
    model: "Model3",
    size: "Size3",
    worker: "Worker3",
    pieces: 1,
    grossWeight: 40,
    stoneWeight: 130,
    netWeight: 140,
    componentWeight: 150,
    ghatWt: 160,
    remark: "Remarks description...",
    detailsSet: [
      {
        type: 'Composite',
        stoneGroup: 'StoneGroup1',
        pieces: 122,
        stoneWeight: 12,
        unitOfMeasurement: 'Grm/Cts'
      },
      {
        type: 'Stone',
        stoneGroup: 'StoneGroup2',
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
    style: "Style1",
    product: "Product1",
    model: "Model1",
    size: "Size1",
    worker: "Worker1",
    pieces: 1,
    grossWeight: 140,
    stoneWeight: 130,
    netWeight: 140,
    componentWeight: 150,
    ghatWt: 160,
    remark: "Remarks description...",
    detailsSet: [
      {
        type: 'Composite',
        stoneGroup: 'StoneGroup1',
        pieces: 122,
        stoneWeight: 12,
        unitOfMeasurement: 'Grm/Cts'
      },
      {
        type: 'Stone',
        stoneGroup: 'StoneGroup2',
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
    style: "Style2",
    product: "Product2",
    model: "Model2",
    size: "Size2",
    worker: "Worker2",
    pieces: 1,
    grossWeight: 120,
    stoneWeight: 130,
    netWeight: 140,
    componentWeight: 150,
    ghatWt: 160,
    remark: "Remarks description...",
    detailsSet: [
      {
        type: 'Composite',
        stoneGroup: 'StoneGroup1',
        pieces: 122,
        stoneWeight: 12,
        unitOfMeasurement: 'Grm/Cts'
      },
      {
        type: 'Stone',
        stoneGroup: 'StoneGroup2',
        pieces: 150,
        stoneWeight: 19,
        unitOfMeasurement: 'Grm/Cts'
      },
    ],
    designImages:[
      {imageUrl: "https://picsum.photos/536/328",  },
      {imageUrl: "https://picsum.photos/536/360",  },
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
    style: "Style1",
    product: "Product1",
    model: "Model1",
    size: "Size1",
    worker: "Worker1",
    pieces: 1,
    grossWeight: 130,
    stoneWeight: 130,
    netWeight: 140,
    componentWeight: 150,
    ghatWt: 160,
    remark: "Remarks description...",
    detailsSet: [
      {
        type: 'Composite',
        stoneGroup: 'StoneGroup1',
        pieces: 122,
        stoneWeight: 12,
        unitOfMeasurement: 'Grm/Cts'
      },
      {
        type: 'Stone',
        stoneGroup: 'StoneGroup2',
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
    style: "Style2",
    product: "Product2",
    model: "Model2",
    size: "Size2",
    worker: "Worker2",
    pieces: 1,
    grossWeight: 140,
    stoneWeight: 130,
    netWeight: 140,
    componentWeight: 150,
    ghatWt: 160,
    remark: "Remarks description...",
    detailsSet: [
      {
        type: 'Composite',
        stoneGroup: 'StoneGroup1',
        pieces: 122,
        stoneWeight: 12,
        unitOfMeasurement: 'Grm/Cts'
      },
      {
        type: 'Stone',
        stoneGroup: 'StoneGroup2',
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
    style: "Style3",
    product: "Product3",
    model: "Model3",
    size: "Size3",
    worker: "Worker1",
    pieces: 1,
    grossWeight: 100,
    stoneWeight: 100,
    netWeight: 100,
    componentWeight: 100,
    ghatWt: 100,
    remark: "Remarks description...",
    detailsSet: [
      {
        type: 'Composite',
        stoneGroup: 'StoneGroup1',
        pieces: 122,
        stoneWeight: 12,
        unitOfMeasurement: 'Grm/Cts'
      },
      {
        type: 'Stone',
        stoneGroup: 'StoneGroup2',
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
