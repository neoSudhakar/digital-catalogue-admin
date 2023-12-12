import useInputSpcl from "../../../../hooks/use-input-spcl";
import classes from "../Account.module.css";

export default function Product({refetchData, closeModal, selectedRow}) {

  console.log(selectedRow);
  const initialNameValue= selectedRow ? selectedRow.name: ""; 

    const {
        inputVal: name,
        isValid: nameIsValid,
        hasErr: nameHasErr,
        touchFn: nameTouchFn,
        resetFn: nameResetFn,
        handleBlur: handleNameBlur,
        handleChange: handleNameChange,
      } = useInputSpcl((inputValue) => inputValue.trim().length > 0, initialNameValue);
    

      let isFormValid = false;

      if (nameIsValid) {
        isFormValid = true;
      };


      const handleSubmit = (event) => {
        event.preventDefault();
        
        nameTouchFn();

        if (!isFormValid) {
            return;
        }

        const form = new FormData(event.target);
        const formData = Object.fromEntries(form);
        console.log(formData);

        if(!selectedRow){
        fetch('http://localhost:8080/api/products', {
            method: 'POST',
            headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        })//.then(response=> response.json())
        .then(result => {
          refetchData();
          console.log('Data sent sucessfully!')})
        .catch(error => console.log('error occured!'));
        }
        else{
          fetch(`http://localhost:8080/api/products/${selectedRow.id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify(formData), 
      })
        .then((response) => {
          if (!response.ok) {
            
            console.log('Failed to update row in the backend.');
            
          } else {
            refetchData();
            console.log('Row updated in the backend.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
        }

        nameResetFn();
        closeModal();
    };

    return (
        <div>
          <form onSubmit={handleSubmit} className={classes.form}>
          <section className={classes.fields}>
  
                <div className={`${classes["field"]} ${nameHasErr ? classes.invalid : ""}`}>
                    <label htmlFor="name">Name</label>
                    <div>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter Name"
                        value={name}
                        onBlur={handleNameBlur}
                        onChange={handleNameChange}
                        className={classes.select}
                    />
                    </div>
                </div>

            </section>
            <div className={classes.button}>
              {selectedRow ?  <input type="submit" value="Update"/>: <input type="submit" value="Save"/>}
            </div>
            </form>
        </div>
    )

};