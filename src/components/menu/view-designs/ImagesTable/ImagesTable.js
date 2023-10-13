import React, { useState } from "react";
import classes from "./ImagesTable.module.css";

const ImagesTable = ({ imagesArr }) => {
  const [isChecked, setIsChecked] = useState(
    imagesArr.map((image) => image.isDefault)
  );

  const handleCheckboxChange = (index) => {
    const newCheckedState = Array(imagesArr.length).fill(false);
    newCheckedState[index] = true;
    setIsChecked(newCheckedState);
  };

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
            <tr key={index}>
              <td>
                <img src={image.imageUrl} alt={`Image ${index + 1}`} />
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
                <button className={classes["delete-button"]}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ImagesTable;
