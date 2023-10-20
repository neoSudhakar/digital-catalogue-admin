
import { useMemo, useState } from "react";
// import classes from "../view-designs/DesignDetails.module.css";
import classes from "./catalogueDesignDetails.module.css";
import ReactImageMagnify from "react-image-magnify";
// import DesignFields from "../view-designs/DesignFields";
import { useSelector } from "react-redux";
import CatalogueDesignFields from "./CatalogueDesignFields";
import CatalogueProductDetails from "./CatalogueProductDetails";

export default function CatalogueDesignDetails({cardItem, onGoBack}){

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


    return <div
    className={`${classes["details-container"]}`}
  >
    <div className={classes["back-btn-container"]}>
    <button
      className={classes.back}
      onClick={handleGoBack}
    >
      Back
    </button>
    </div>
    <h1>Design {cardItem.id} Details</h1>
    <div className={`${classes["card-details"]}  ${classes.full}`} style={{paddingTop: "2rem"}}>
      <div className={classes["above-table"]}>
        <div className={classes.carousel}>
        <div className={classes["default-image"]}>
          {/* <img src={defaultImageItem.imageUrl} /> */}
          <ReactImageMagnify {...{
                      smallImage: {
                          alt: 'Wristwatch by Ted Baker London',
                          isFluidWidth: true,
                          src: defaultImageItem.imageUrl,
                        //   width:"100%",
                          zIndex:0,
                        //   height: 1000,
                      },
                      largeImage: {
                          src: defaultImageItem.imageUrl,
                          width: 1200,
                          height: 500
                      },
                      enlargedImageContainerDimensions:{
                          width:"100%",
                          height:"100%"
                      }
            }} />
          </div>
          <ul className={classes["left-images-container"]} style={!isDashboardOpen ? {maxWidth:"80%"} : {}} >
            {imageItems.map((item)=>{
              return <li className={`${classes["left-image"]} ${item.isDefault ? classes.active : "" }`} onMouseOver={()=>handleSelectImage(item)} key={item.imageUrl}>
                  <img src={item.imageUrl}/>
              </li>
            })}
          </ul>
          
        </div>

        <CatalogueDesignFields cardItem={cardItem}/>

      </div>
      <CatalogueProductDetails cardItem={cardItem}/>
    </div>
    {/* <div className={classes["footer"]}>
    </div> */}
  </div>
}