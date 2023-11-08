import useInput from "../../../hooks/use-input";
import classes from "./Account.module.css";

export default function Role({refetchRoleData}) {
    const {
        inputVal: role,
        isValid: roleIsValid,
        hasErr: roleHasErr,
        touchFn: roleTouchFn,
        resetFn: roleResetFn,
        handleBlur: handleRoleBlur,
        handleChange: handleRoleChange,
      } = useInput((inputValue) => inputValue.trim().length > 0);
    

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
      

        /*try {
          const response = fetch('http://localhost:8080/api/roles', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          
          //console.log()
          if (response.status === 400) {
            // Handle success if needed
            // For example, you can clear the form
            // ... existing code to reset fields
            
            const responseData = response.json();
            console.log('Data sent successfully:', responseData);
          } else {
            // Handle errors if needed
            console.error('Failed to send data:', responseData);
          }
        } catch (error) {
          // Handle network errors or other exceptions
          console.log("catch")
          console.log('Error:', response.JSON);
        }*/
      

        roleResetFn();

        

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
                <input type="submit" value="Save"/>
            </div>
            </form>
        </div>
    )

};