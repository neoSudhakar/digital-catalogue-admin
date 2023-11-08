import React, { useState } from "react";
import classes from "./ImagesTable.module.css";

const ImagesTable = ({ imagesArr, cardItem, onAnyUpdateAction }) => {
  // console.log("images array is", imagesArr);
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
      `http://localhost:8080/api/designs/${cardItem.id}/images/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      onAnyUpdateAction(cardItem.id);
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
