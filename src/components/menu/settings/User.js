import useInput from "../../../hooks/use-input";
import classes from "./User.module.css";
import { useState } from "react";

export default function User({accountData,roleData}) {

  //console.log(roleData);

  const {
    inputVal: firstName,
    isValid: firstNameIsValid,
    hasErr: firstNameHasErr,
    touchFn: firstNameTouchFn,
    resetFn: firstNameResetFn,
    handleBlur: handleFirstNameBlur,
    handleChange: handleFirstNameChange,
  } = useInput((inputValue) => inputValue.trim().length > 0);

  const {
    inputVal: lastName,
    isValid: lastNameIsValid,
    hasErr: lastNameHasErr,
    touchFn: lastNameTouchFn,
    resetFn: lastNameResetFn,
    handleBlur: handleLastNameBlur,
    handleChange: handleLastNameChange,
  } = useInput((inputValue) => inputValue.trim().length > 0);

  const {
    inputVal: email,
    isValid: emailIsValid,
    hasErr: emailHasErr,
    touchFn: emailTouchFn,
    resetFn: emailResetFn,
    handleBlur: handleEmailBlur,
    handleChange: handleEmailChange,
  } = useInput((inputValue) => inputValue.includes("@"));

  const {
    inputVal: address,
    isValid: addressIsValid,
    hasErr: addressHasErr,
    touchFn: addressTouchFn,
    resetFn: addressResetFn,
    handleBlur: handleAddressBlur,
    handleChange: handleAddressChange,
  } = useInput((inputValue) => inputValue.trim().length > 0);


  const {
    inputVal: userName,
    isValid: userNameIsValid,
    hasErr: userNameHasErr,
    touchFn: userNameTouchFn,
    resetFn: userNameResetFn,
    handleBlur: handleUserNameBlur,
    handleChange: handleUserNameChange,
  } = useInput((inputValue) => inputValue.trim().length > 0);

  
  const {
    inputVal: password,
    isValid: passwordIsValid,
    hasErr: passwordHasErr,
    touchFn: passwordTouchFn,
    resetFn: passwordResetFn,
    handleBlur: handlePasswordBlur,
    handleChange: handlePasswordChange,
  } = useInput((inputValue) => inputValue.trim().length > 6);

  const {
    inputVal: account,
    isValid: accountIsValid,
    hasErr: accountHasErr,
    touchFn: accountTouchFn,
    resetFn: accountResetFn,
    handleBlur: accountHandleBlur,
    handleChange: accountHandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);

  const {
    inputVal: userRole,
    isValid: userRoleIsValid,
    hasErr: userRoleHasErr,
    touchFn: userRoleTouchFn,
    resetFn: userRoleResetFn,
    handleBlur: userRoleHandleBlur,
    handleChange: userRoleHandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);


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

    /*const tableData={
      userId: index+1,
      firstName: firstName,
      lastName: lastName,
      email: email,
      account: account,
      userRole: userRole
    };*/

    //updateUserData(formData);

    fetch('http://localhost:8080/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(result => console.log('Data sent successfully!'))
    .catch(error => console.log('error occurred!'));



    userNameResetFn();
    passwordResetFn();
    emailResetFn();
    addressResetFn();
    firstNameResetFn();
    lastNameResetFn();
    accountResetFn();
    userRoleResetFn();

  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={classes.form}>
      <section className={classes.fields}>
        <div className={classes.field}>
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
            {firstNameHasErr && (
              <p className={classes.err}>Enter a valid first name!</p>
            ) }
          </div>
        </div>

        <div className={classes.field}>
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
            {lastNameHasErr && (
              <p className={classes.err}>Enter a valid last name!</p>
            )}
          </div>
        </div>
      
        <div className={classes.field}>
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
            {emailHasErr && (
              <p className={classes.err}>Enter a valid email address!</p>
            )}
          </div>
        </div>

        <div className={classes.field}>
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
            {addressHasErr && (
              <p className={classes.err}>Enter a valid address!</p>
            )}
          </div>
        </div>

        <div className={classes.field}>
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
            {userNameHasErr && (
              <p className={classes.err}>Enter a valid user name!</p>
            )}
          </div>
        </div>
        <div className={classes.field}>
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
            {passwordHasErr && <p className={classes.err}>Enter a valid password!</p>}
          </div>
        </div>

        <div className={classes.field}>
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
              <option value="" disabled hidden>
                Select an option
              </option>
              {accountData.map((item, index) =>(
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
              ))}
          </select>
          {accountHasErr && <p className={classes.err}>Select one account</p>}
        </div>

        {/*<div className={classes.field}>
          <label htmlFor="userRole">Role</label>
          <select
            id="userRole"
            name="userRole"
            placeholder={"Select role"}
            value={userRole}
            onBlur={userRoleHandleBlur}
            //  defaultValue="Manufacturer"
            onChange={userRoleHandleChange}
            >
              <option value="" disabled hidden>
                Select an option
              </option>
              <option value="Admin">Admin</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
              <option value="RetailUser">Retail User</option>
          </select>
          {userRoleHasErr && <p className={classes.err}>Select one role</p>}
              </div>*/}

        <div className={classes.field}>
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
              <option value="" disabled hidden>
                Select an option
              </option>
              {roleData.map((item, index) =>(
              <option key={item.id} value={item.id}>
                {item.role}
              </option>
              ))}
          </select>
          {userRoleHasErr && <p className={classes.err}>Select one role</p>}
        </div>
      </section>
      <div className={classes.button}>
        <input type="submit" value="Save" />
      </div>
    </form>
  </div>
  )
};