import useInputSpcl from "../../../../hooks/use-input-spcl";
import useInput from "../../../../hooks/use-input";
import classes from "../Account.module.css";

import { useState } from "react";
import { getAccountLoader } from "../../../../util/auth";
import { BASE_URL } from "../../../../util/http";

export default function Account({refetchAccountData, closeModal, selectedRow}) {

  const accountObj = getAccountLoader();

  console.log(selectedRow);
  const initialNameValue= selectedRow ? selectedRow.name : "";
  const initialEmailValue= selectedRow ? selectedRow.email : "";
  const initialPhoneNumberValue= selectedRow ? selectedRow.phoneNumber : "";
  const initialAddress1Value= selectedRow ? selectedRow.address1 : "";
  const initialAddress2Value= selectedRow ? selectedRow.address2 : "";
  const initialCityValue= selectedRow ? selectedRow.city : "";
  const initialStateValue= selectedRow ? selectedRow.state : "";
  const initialTypeValue= selectedRow ? selectedRow.accountType : "";
  

  const {
    inputVal: name,
    isValid: nameIsValid,
    hasErr: nameHasErr,
    touchFn: nameTouchFn,
    resetFn: nameResetFn,
    handleBlur: handleNameBlur,
    handleChange: handleNameChange,
  } = useInputSpcl((inputValue) => inputValue.trim().length > 0, initialNameValue);

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
    inputVal: phoneNumber,
    isValid: phoneNumberIsValid,
    hasErr: phoneNumberHasErr,
    touchFn: phoneNumberTouchFn,
    resetFn: phoneNumberResetFn,
    handleBlur: handlePhoneNumberBlur,
    handleChange: handlePhoneNumberChange,
  } = useInputSpcl((inputValue) => inputValue.trim().length === 10, initialPhoneNumberValue);

  const {
    inputVal: address1,
    isValid: address1IsValid,
    hasErr: address1HasErr,
    touchFn: address1TouchFn,
    resetFn: address1ResetFn,
    handleBlur: handleAddress1Blur,
    handleChange: handleAddress1Change,
  } = useInputSpcl((inputValue) => inputValue.trim().length > 0, initialAddress1Value);

  const {
    inputVal: address2,
    isValid: address2IsValid,
    hasErr: address2HasErr,
    touchFn: address2TouchFn,
    resetFn: address2ResetFn,
    handleBlur: handleAddress2Blur,
    handleChange: handleAddress2Change,
  } = useInputSpcl((inputValue) => inputValue.trim().length > 0, initialAddress2Value);

  const {
    inputVal: city,
    isValid: cityIsValid,
    hasErr: cityHasErr,
    touchFn: cityTouchFn,
    resetFn: cityResetFn,
    handleBlur: handleCityBlur,
    handleChange: handleCityChange,
  } = useInputSpcl((inputValue) => inputValue.trim().length > 0, initialCityValue);

  const {
    inputVal: state,
    isValid: stateIsValid,
    hasErr: stateHasErr,
    touchFn: stateTouchFn,
    resetFn: stateResetFn,
    handleBlur: handleStateBlur,
    handleChange: handleStateChange,
  } = useInputSpcl((inputValue) => inputValue.trim().length > 0,initialStateValue);

  const {
    inputVal: accountType,
    isValid: accountTypeIsValid,
    hasErr: accountTypeHasErr,
    touchFn: accountTypeTouchFn,
    resetFn: accountTypeResetFn,
    handleBlur: accountTypeHandleBlur,
    handleChange: accountTypeHandleChange,
  } = useInputSpcl((inputValue) => inputValue.trim().length !== 0, initialTypeValue);


  let isFormValid = false;

  if (nameIsValid && emailIsValid && phoneNumberIsValid && address1IsValid && address2IsValid && cityIsValid && stateIsValid && accountTypeIsValid) {
    isFormValid = true;
  }



  const handleSubmit = (event) => {
    event.preventDefault();
    
    nameTouchFn();
    emailTouchFn();
    phoneNumberTouchFn();
    address1TouchFn();
    address2TouchFn();
    cityTouchFn();
    stateTouchFn();
    accountTypeTouchFn();

    if (!isFormValid) {
      return;
    }

    const form = new FormData(event.target);
    const formData = Object.fromEntries(form);

    console.log(formData);

    if(!selectedRow){
      fetch(BASE_URL+'/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      .then(result => {
        refetchAccountData();
        console.log('Data sent sucessfully!')})
      .catch(error => console.log('error occurred!'));
      }
    else{
      fetch(BASE_URL+`/accounts/${selectedRow.id}`, {
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
            refetchAccountData();
            console.log('Row updated in the backend.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    nameResetFn();
    emailResetFn();
    phoneNumberResetFn();
    address1ResetFn();
    address2ResetFn();
    cityResetFn();
    stateResetFn();
    accountTypeResetFn();
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

          <div className={`${classes["field"]} ${emailHasErr ? classes.invalid : ""}`}>
            <label htmlFor="email">E-Mail</label>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter mail id"
                value={email}
                onBlur={handleEmailBlur}
                onChange={handleEmailChange}
              />
            </div>
          </div>

          <div className={`${classes["field"]} ${phoneNumberHasErr ? classes.invalid : ""}`}>
          <label htmlFor="phoneNumber">Phone Number</label>
            <div>
              <input
                type="tel"
                name="phoneNumber"
                value={phoneNumber}
                id="phoneNumber"
                placeholder="Enter phone number"
                onBlur={handlePhoneNumberBlur}
                onChange={handlePhoneNumberChange}
              />
            </div>
          </div>

          <div className={`${classes["field"]} ${address1HasErr ? classes.invalid : ""}`}>
            <label htmlFor="address1">Address Line 1</label>
            <div>
              <input
                type="text"
                name="address1"
                id="address1"
                placeholder="Enter Address"
                value={address1}
                onBlur={handleAddress1Blur}
                onChange={handleAddress1Change}
              />
            </div>
          </div>

          <div className={`${classes["field"]} ${address2HasErr ? classes.invalid : ""}`}>
            <label htmlFor="address2">Address Line 2</label>
            <div>
              <input
                type="text"
                name="address2"
                id="address2"
                placeholder="Enter Address"
                value={address2}
                onBlur={handleAddress2Blur}
                onChange={handleAddress2Change}
              />
            </div>
          </div>

          <div className={`${classes["field"]} ${cityHasErr ? classes.invalid : ""}`}>
            <label htmlFor="city">City</label>
            <div>
              <input
                type="text"
                name="city"
                id="city"
                placeholder="Enter City"
                value={city}
                onBlur={handleCityBlur}
                onChange={handleCityChange}
              />
            </div>
          </div>

          <div className={`${classes["field"]} ${stateHasErr ? classes.invalid : ""}`}>
            <label htmlFor="state">State</label>
            <div>
              <input
                type="text"
                name="state"
                id="state"
                placeholder="Enter State"
                value={state}
                onBlur={handleStateBlur}
                onChange={handleStateChange}
              />
            </div>
          </div>

          <div className={`${classes["field"]} ${accountTypeHasErr ? classes.invalid : ""}`}>
            <label htmlFor="accountType">Type</label>
                <select
                  id="accountType"
                  name="accountType"
                  placeholder={"Select account type"}
                  value={accountType}
                  onBlur={accountTypeHandleBlur}
                  //  defaultValue="Manufacturer"
                  onChange={accountTypeHandleChange}
                >
                  <option value="" disabled hidden>
                    Select an option
                  </option>
                  {accountObj.accountType === "system" && <option value="Manufacturer">Manufacturer</option>}
                  {accountObj.accountType === "Manufacturer" && <option value="Retailer">Retailer</option>}
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