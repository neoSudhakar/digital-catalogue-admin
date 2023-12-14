import useInputSpcl from "../../../../hooks/use-input-spcl";
import { getAccountLoader } from "../../../../util/auth";
import classes from "../Account.module.css";
import { useState } from "react";

export default function User({refetchUserData,accountData,roleData,closeModal,selectedRow}) {
  const accountObj = getAccountLoader();

  //console.log(roleData);
  console.log(selectedRow);
  const initialFirstNameValue= selectedRow ? selectedRow.firstName : "";
  const initialLastNameValue= selectedRow ? selectedRow.lastName : "";
  const initialEmailValue= selectedRow ? selectedRow.email : "";
  const initialAddressValue= selectedRow ? selectedRow.address : "";
  const initialUserNameValue= selectedRow ? selectedRow.userName : "";
  const initialPasswordValue= selectedRow ? selectedRow.password: "";
  let initialAccountValue= selectedRow && selectedRow.account ? selectedRow.account.name: "";
  const initialUserRoleValue= selectedRow && selectedRow.roleSet ? selectedRow.roleSet[0].role: "";

  if(accountObj.accountType === "Retailer"){
    console.log("account obj is", accountObj)
    initialAccountValue = accountObj.name;
  }


  const {
    inputVal: firstName,
    isValid: firstNameIsValid,
    hasErr: firstNameHasErr,
    touchFn: firstNameTouchFn,
    resetFn: firstNameResetFn,
    handleBlur: handleFirstNameBlur,
    handleChange: handleFirstNameChange,
  } = useInputSpcl((inputValue) => inputValue.trim().length > 0, initialFirstNameValue);

  const {
    inputVal: lastName,
    isValid: lastNameIsValid,
    hasErr: lastNameHasErr,
    touchFn: lastNameTouchFn,
    resetFn: lastNameResetFn,
    handleBlur: handleLastNameBlur,
    handleChange: handleLastNameChange,
  } = useInputSpcl((inputValue) => inputValue.trim().length > 0, initialLastNameValue);

  const {
    inputVal: email,
    isValid: emailIsValid,
    hasErr: emailHasErr,
    touchFn: emailTouchFn,
    resetFn: emailResetFn,
    handleBlur: handleEmailBlur,
    handleChange: handleEmailChange,
  } = useInputSpcl((inputValue) => inputValue.includes("@"), initialEmailValue);

  const {
    inputVal: address,
    isValid: addressIsValid,
    hasErr: addressHasErr,
    touchFn: addressTouchFn,
    resetFn: addressResetFn,
    handleBlur: handleAddressBlur,
    handleChange: handleAddressChange,
  } = useInputSpcl((inputValue) => inputValue.trim().length > 0, initialAddressValue);


  const {
    inputVal: userName,
    isValid: userNameIsValid,
    hasErr: userNameHasErr,
    touchFn: userNameTouchFn,
    resetFn: userNameResetFn,
    handleBlur: handleUserNameBlur,
    handleChange: handleUserNameChange,
  } = useInputSpcl((inputValue) => inputValue.trim().length > 0, initialUserNameValue);

  
  const {
    inputVal: password,
    isValid: passwordIsValid,
    hasErr: passwordHasErr,
    touchFn: passwordTouchFn,
    resetFn: passwordResetFn,
    handleBlur: handlePasswordBlur,
    handleChange: handlePasswordChange,
  } = useInputSpcl((inputValue) => inputValue.trim().length > 6, initialPasswordValue);

  const {
    inputVal: account,
    isValid: accountIsValid,
    hasErr: accountHasErr,
    touchFn: accountTouchFn,
    resetFn: accountResetFn,
    handleBlur: accountHandleBlur,
    handleChange: accountHandleChange,
  } = useInputSpcl((inputValue) => inputValue, initialAccountValue);

  const {
    inputVal: userRole,
    isValid: userRoleIsValid,
    hasErr: userRoleHasErr,
    touchFn: userRoleTouchFn,
    resetFn: userRoleResetFn,
    handleBlur: userRoleHandleBlur,
    handleChange: userRoleHandleChange,
  } = useInputSpcl((inputValue) => inputValue, initialUserRoleValue);


  let isFormValid = false;

  if (userNameIsValid && passwordIsValid && firstNameIsValid && lastNameIsValid && emailIsValid && addressIsValid && accountIsValid && userRoleIsValid) {
    isFormValid = true;
  }

  function handleSubmit(event) {
    event.preventDefault();

    userNameTouchFn();
    passwordTouchFn();
    emailTouchFn();
    addressTouchFn();
    firstNameTouchFn();
    lastNameTouchFn();
    accountTouchFn();
    userRoleTouchFn();

    if (!isFormValid) {
      return;
    }

    const form = new FormData(event.target);
    const formData = Object.fromEntries(form);
    console.log(formData);

    if(!selectedRow){
    fetch('http://localhost:8080/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(result => {
      refetchUserData();
      console.log('Data sent successfully!')})
    .catch(error => console.log('error occurred!'));
    }
    else{
      fetch(`http://localhost:8080/api/users/${selectedRow.id}`, {
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
            refetchUserData();
            console.log('Row updated in the backend.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }



    userNameResetFn();
    passwordResetFn();
    emailResetFn();
    addressResetFn();
    firstNameResetFn();
    lastNameResetFn();
    accountResetFn();
    userRoleResetFn();
    closeModal();

  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={classes.form}>
      <section className={classes.fields}>
        <div className={`${classes["field"]} ${firstNameHasErr ? classes.invalid : ""}`}>
          <label htmlFor="firstName">First Name</label>
          <div>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter First Name"
              value={firstName}
              onChange={handleFirstNameChange}
              onBlur={handleFirstNameBlur}
            />
          </div>
        </div>

        <div className={`${classes["field"]} ${lastNameHasErr ? classes.invalid : ""}`}>
          <label htmlFor="lastName">Last Name</label>
          <div>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              placeholder="Enter Last Name"
              onChange={handleLastNameChange}
              onBlur={handleLastNameBlur}
            />
          </div>
        </div>
      
        <div className={`${classes["field"]} ${emailHasErr ? classes.invalid : ""}`}>
          <label htmlFor="email">Email</label>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onBlur={handleEmailBlur}
              onChange={handleEmailChange}
              placeholder="Enter email address"
            />
          </div>
        </div>

        <div className={`${classes["field"]} ${addressHasErr ? classes.invalid : ""}`}>
          <label htmlFor="address">Address</label>
          <div>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Enter address"
              value={address}
              onBlur={handleAddressBlur}
              onChange={handleAddressChange}
            />
          </div>
        </div>

        <div className={`${classes["field"]} ${userNameHasErr ? classes.invalid : ""}`}>
          <label htmlFor="userName">User Name</label>
          <div>
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="Enter User Name"
              value={userName}
              onChange={handleUserNameChange}
              onBlur={handleUserNameBlur}
            />
          </div>
        </div>
        <div className={`${classes["field"]} ${passwordHasErr ? classes.invalid : ""}`}>
          <label htmlFor="password">Password</label>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onBlur={handlePasswordBlur}
              onChange={handlePasswordChange}
              placeholder="Enter password"
            />
          </div>
        </div>

        <div className={`${classes["field"]} ${accountHasErr ? classes.invalid : ""}`}>
          <label htmlFor="account">Account</label>

          <select
            id="account"
            name="accountId"
            placeholder={"Select account"}
            value={account}
            onBlur={accountHandleBlur}
            //  defaultValue="Manufacturer"
            onChange={accountHandleChange}
            >
              {!selectedRow ? <option value="" disabled hidden>
                Select an option
              </option>: <option key={selectedRow.account.id} value={selectedRow.account.id}>
                {selectedRow.account.name}
                </option>}

              {accountObj.accountType === "system" &&
                accountData && accountData.map((item) =>(
                item.accountType === "Manufacturer" && (<option key={item.id} value={item.id}>
                  {item.name}
                </option>)
                ))}

              {accountObj.accountType === "Manufacturer" &&
                accountData && accountData.map((item) =>(
                item.accountType === "Retailer" && (<option key={item.id} value={item.id}>
                  {item.name}
                </option>)
                ))}

              {accountObj.accountType === "Retailer" && 
                <option key={accountObj.id} value={accountObj.id}>{accountObj.name}</option>
              }
          </select>

          {/* {accountObj.accountType === "Retailer" && <select 
            id="account"
            name="accountId">
            <option key={accountObj.id} value={accountObj.id}>{accountObj.name}</option>
          </select>} */}
        </div>

        <div className={`${classes["field"]} ${userRoleHasErr ? classes.invalid : ""}`}>
          <label htmlFor="userRole">Role</label>
          <select
            id="userRole"
            name="roleId"
            placeholder={"Select role"}
            value={userRole}
            onBlur={userRoleHandleBlur}
            //  defaultValue="Manufacturer"
            onChange={userRoleHandleChange}
            >
              {!selectedRow ? <option value="" disabled hidden>
                Select an option
              </option>: 
              <option key={selectedRow.roleSet[0].id} value={selectedRow.roleSet[0].id}>
                {selectedRow.roleSet[0].role}
                </option>}

              {roleData && roleData.map((item) =>(
                <option key={item.id} value={item.id}>
                  {item.role}
                </option>
              ))}
              
          </select>
        </div>
      </section>
      <div className={classes.button}>
        {selectedRow ?  <input type="submit" value="Update"/>: <input type="submit" value="Save"/>}
      </div>
    </form>
  </div>
  )
};