import React, { useState } from "react";
import classes from "./ImagesTable.module.css";
import { getPermissionsObj } from "../../../../util/auth";
import { BASE_URL } from "../../../../util/http";

const ImagesTable = ({ imagesArr1, cardItem, onAnyUpdateAction, setDesignImages }) => {

  const permissions= getPermissionsObj();

  console.log("images array is", imagesArr1);
  const [imagesArr, setImagesArr] = useState(imagesArr1);
  const [isChecked, setIsChecked] = useState(
    imagesArr.map((image) => image.isDefault)
  );

  const handleCheckboxChange = (index) => {
    const newCheckedState = Array(imagesArr.length).fill(false);
    newCheckedState[index] = true;
    setIsChecked(newCheckedState);
  };

  async function handleDeleteImage(id) {
    const response = await fetch(
      `${BASE_URL}/designs/${cardItem.id}/images/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      // onAnyUpdateAction(cardItem.id);
      const prevImagesArr = [...imagesArr];
      const newImagesArrAfterDel = prevImagesArr.filter(imageObj=>imageObj.id !== id);
      setImagesArr(newImagesArrAfterDel);
      setDesignImages(newImagesArrAfterDel)
    }
  }

  return (
    <div className={classes["table-container"]}>
      <table className={classes["table"]}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Default</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {imagesArr.map((image, index) => (
            <tr key={image.id}>
              <td>
                {image && <img src={image.preSignedURL} alt={`Image ${index + 1}`} />}
                {!image && <img alt={`Image ${index + 1}`} />}
              </td>
              <td>
                <input
                  id={index}
                  type="checkbox"
                  checked={isChecked[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
                <label htmlFor={index}>Default</label>
              </td>
              <td>
                <button
                  className={classes["delete-button"]}
                  onClick={() => handleDeleteImage(image.id)}
                  disabled={permissions && !permissions.features.ViewDesigns.delete}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ImagesTable;
