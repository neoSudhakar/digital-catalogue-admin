import useInputSpcl from "../../../../hooks/use-input-spcl";
import classes from "../Account.module.css";

export default function Role({refetchRoleData, closeModal, selectedRow}) {

  console.log(selectedRow);
    const initialRoleValue= selectedRow ? selectedRow.role: "";  

    const {
        inputVal: role,
        isValid: roleIsValid,
        hasErr: roleHasErr,
        touchFn: roleTouchFn,
        resetFn: roleResetFn,
        handleBlur: handleRoleBlur,
        handleChange: handleRoleChange,
      } = useInputSpcl((inputValue) => inputValue.trim().length > 0, initialRoleValue);
    

      let isFormValid = false;

      if (roleIsValid) {
        isFormValid = true;
      };


      const handleSubmit = (event) => {
        event.preventDefault();
        
        roleTouchFn();

        if (!isFormValid) {
            return;
        }

        const form = new FormData(event.target);
        const formData = Object.fromEntries(form);
        console.log(formData);

        if(!selectedRow){
        fetch('http://localhost:8080/api/roles', {
            method: 'POST',
            headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        })//.then(response=> response.json())
        .then(result => {
          refetchRoleData();
          console.log('Data sent sucessfully!')})
        .catch(error => console.log('error occured!'));
        }else{
          fetch(`http://localhost:8080/api/roles/${selectedRow.id}`, {
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
            refetchRoleData();
            console.log('Row updated in the backend.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
        }
      

    
        roleResetFn();
        closeModal();

    };

    return (
        <div>
          <form onSubmit={handleSubmit} className={classes.form}>
          <section className={classes.fields}>
  
            <div className={classes.field}>
              <label htmlFor="role">Name</label>
              <div>
                <input
                  type="text"
                  name="role"
                  id="role"
                  placeholder="Enter Name"
                  value={role}
                  onBlur={handleRoleBlur}
                  onChange={handleRoleChange}
                  className={classes.select}
                />
                {roleHasErr && <p className={classes.err}>Enter valid name</p>}
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