import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import classes from "./DesignDetails.module.css";
import ReactImageMagnify from "react-image-magnify";
import DesignFields from "./DesignFields";
import DesignTanbleJSX from "./DesignTableJSX";
import { useSelector } from "react-redux";
import ImagesTable from "./ImagesTable/ImagesTable";
import AssignRetailer from "./AssignRetailer";

export default function DesignDetails({cardItem, onGoBack}){

  const isDashboardOpen = useSelector((state)=>state.ui.isDashboardOpen);

    const updatedDesignImagesArr= useMemo(()=>{
      return cardItem.designImages.map((eachItem, index)=>{
        if(index===0){
          return {...eachItem, isDefault: true};
        }
        else{
          return {...eachItem, isDefault: false};
        }
      });
    })

    const [imageItems, setImageItems]= useState(updatedDesignImagesArr);

    const defaultImageItem=imageItems.find((item)=>{
        return item.isDefault;
    });

    function handleGoBack(){
        onGoBack();
    }

    function handleSelectImage(imageItem){
        // setSelectedImageItem(imageItem.image);
        const updatedImageItems=imageItems.map((item)=>{
          if(item.imageUrl===imageItem.imageUrl){
            return {...item, isDefault: true};
          }
          else{
            return {...item, isDefault: false};
          }
        });
        setImageItems(updatedImageItems);
    }

    const [isStartAssign, setIsStartAssign] = useState(false);

    function handleStartAssign(){
      setIsStartAssign(true);
    }

    function handleCloseAssign(){
      setIsStartAssign(false);
    };


    return <motion.div
    key="details"
    initial={{ y: -30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -30, opacity: 0 }}
    className={`${classes["details-container"]}`}
  >
    <div className={classes["back-btn-container"]}>
    <motion.button
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 500, mass: 1 }}
      className={classes.back}
      onClick={handleGoBack}
    >
      Back
    </motion.button>
    </div>
    <div className={classes["header-content"]}>
      <h1>Design {cardItem.id} Details</h1>
      <button className={classes["assign-btn"]} onClick={handleStartAssign}>Assign Retailer</button>
    </div>
    <AssignRetailer cardItem={cardItem} isModalOpen={isStartAssign} onCloseModal={handleCloseAssign}  />
    <div className={`${classes["card-details"]}  ${isDashboardOpen ? classes.full : ""}`}>
      <div className={classes["above-table"]}>
        <div className={classes.carousel}>
        <div className={classes["default-image"]}>
          {/* <img src={defaultImageItem.imageUrl} /> */}
          <ReactImageMagnify {...{
                      smallImage: {
                          alt: 'Wristwatch by Ted Baker London',
                          isFluidWidth: true,
                          src: defaultImageItem.imageUrl,
                          // width:"100%",
                          zIndex:0,
                          // height: "100%",
                      },
                      largeImage: {
                          src: defaultImageItem.imageUrl,
                          width: 1000,
                          height: 1000
                      },
                      enlargedImageContainerDimensions:{
                          width:"100%",
                          height:"100%"
                      }
            }} />
          </div>
          <ul className={classes["left-images-container"]}>
            {imageItems.map((item)=>{
              return <li className={`${classes["left-image"]} ${item.isDefault ? classes.active : "" }`} onMouseOver={()=>handleSelectImage(item)} key={item.imageUrl}>
                  <img src={item.imageUrl}/>
              </li>
            })}
          </ul>
          
        </div>

        <DesignFields cardItem={cardItem}/>

      </div>
      <DesignTanbleJSX cardItem={cardItem}/>
      <ImagesTable imagesArr={imageItems} cardItem={cardItem} />
      
    </div>
  </motion.div>
}