import { useMemo, useState } from "react";
import classes from "./ImageComponent.module.css";
import UploadImage from "../../../assets/upload-image.png";

export default function ImageComponent({fileList}){
      let  images= [
            {image: UploadImage},
            // {image: UploadImage},
            {image: "https://picsum.photos/536/302"},
            {image: "https://picsum.photos/536/303"},
      ]

      const updatedDesignImagesArr= useMemo(()=>{
        return images.map((eachItem, index)=>{
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

    function handleSelectImage(imageItem){
        // setSelectedImageItem(imageItem.image);
        const updatedImageItems=imageItems.map((item)=>{
          if(item.image===imageItem.image){
            return {...item, isDefault: true};
          }
          else{
            return {...item, isDefault: false};
          }
        });
        setImageItems(updatedImageItems);
      }

    return <>
        {images.length === 0 && (
        //"https://nxtdiv-digital-catalogue.s3.ap-south-1.amazonaws.com/DigitalCatalogue/2023/8/30/20230930202809573_Jewellery.jpg"
        <img src={UploadImage} alt="Design Image" style={{ width: '30%' }} />)
      }
      {images.length === 1 && <img src={images[0].image}  style={{ width: '100%', height:"95%" }}  />}
      {images.length > 1 && <div className={classes.container}>
          <div className={classes["default-img"]}>
              <img src={defaultImageItem.image} />
          </div>
          <ul className={classes["normal-images-container"]}>
            {imageItems.map((item)=>{
              return <li className={`${classes["normal-image"]} ${item.isDefault ? classes.active : "" }`} onMouseOver={()=>handleSelectImage(item)} key={item.image}>
                        <img src={item.image}/>
                  </li>
            })}
          </ul>
      </div>
      }
    </>
}