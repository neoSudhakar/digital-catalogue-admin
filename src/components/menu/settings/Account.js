import useInput from "../../../hooks/use-input";
import classes from "./Account.module.css";

import { useState } from "react";

export default function Account({updateAccountData}) {
  /*const [formData, setFormData] = useState({
    name: '',
    address1: '',
    address2: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    role: 'manufacturer', // Default value for role
  });*/

  const [accountData, setAccountData]= useState([]);

  const {
    inputVal: name,
    isValid: nameIsValid,
    hasErr: nameHasErr,
    touchFn: nameTouchFn,
    resetFn: nameResetFn,
    handleBlur: handleNameBlur,
    handleChange: handleNameChange,
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
    inputVal: phoneNum,
    isValid: phoneNumIsValid,
    hasErr: phoneNumHasErr,
    touchFn: phoneNumTouchFn,
    resetFn: phoneNumResetFn,
    handleBlur: handlePhoneNumBlur,
    handleChange: handlePhoneNumChange,
  } = useInput((inputValue) => inputValue.trim().length === 10);

  const {
    inputVal: address1,
    isValid: address1IsValid,
    hasErr: address1HasErr,
    touchFn: address1TouchFn,
    resetFn: address1ResetFn,
    handleBlur: handleAddress1Blur,
    handleChange: handleAddress1Change,
  } = useInput((inputValue) => inputValue.trim().length > 0);

  const {
    inputVal: address2,
    isValid: address2IsValid,
    hasErr: address2HasErr,
    touchFn: address2TouchFn,
    resetFn: address2ResetFn,
    handleBlur: handleAddress2Blur,
    handleChange: handleAddress2Change,
  } = useInput((inputValue) => inputValue.trim().length > 0);

  const {
    inputVal: city,
    isValid: cityIsValid,
    hasErr: cityHasErr,
    touchFn: cityTouchFn,
    resetFn: cityResetFn,
    handleBlur: handleCityBlur,
    handleChange: handleCityChange,
  } = useInput((inputValue) => inputValue.trim().length > 0);

  const {
    inputVal: state,
    isValid: stateIsValid,
    hasErr: stateHasErr,
    touchFn: stateTouchFn,
    resetFn: stateResetFn,
    handleBlur: handleStateBlur,
    handleChange: handleStateChange,
  } = useInput((inputValue) => inputValue.trim().length > 0);

  const {
    inputVal: accountType,
    isValid: accountTypeIsValid,
    hasErr: accountTypeHasErr,
    touchFn: accountTypeTouchFn,
    resetFn: accountTypeResetFn,
    handleBlur: accountTypeHandleBlur,
    handleChange: accountTypeHandleChange,
  } = useInput((inputValue) => inputValue.trim().length !== 0);


  let isFormValid = false;

  if (nameIsValid && emailIsValid && phoneNumIsValid && address1IsValid && address2IsValid && cityIsValid && stateIsValid && accountTypeIsValid) {
    isFormValid = true;
  }


  /*const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };*/

  const handleSubmit = (event) => {
    event.preventDefault();
    
    nameTouchFn();
    emailTouchFn();
    phoneNumTouchFn();
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
    console.log("hi");

    const index= 3;
    console.log(index);

    const tableData={
      accountId: index,
      name:name,
      phoneNum: phoneNum,
      email: email,
      accountType: accountType
    };
    console.log(tableData);

    setAccountData([...accountData, tableData]);

    updateAccountData(tableData);
    console.log(accountData);
  

    nameResetFn();
    emailResetFn();
    phoneNumResetFn();
    address1ResetFn();
    address2ResetFn();
    cityResetFn();
    stateResetFn();
    accountTypeResetFn();

  };

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
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
              />
              {nameHasErr && <p className={classes.err}>Enter valid name</p>}
            </div>
          </div>

          <div>
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
              {emailHasErr && <p className={classes.err}>Enter valid email</p>}
            </div>
          </div>

          <div>
          <label htmlFor="phoneNum">Phone Number</label>
            <div>
              <input
                type="tel"
                name="phoneNum" 
                value={phoneNum}
                id="phoneNum"
                placeholder="Enter phone number"
                onBlur={handlePhoneNumBlur}
                onChange={handlePhoneNumChange}
              />
              {phoneNumHasErr && <p className={classes.err}>Enter valid phone number</p>}
            </div>
          </div>

          <div>
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
              {address1HasErr && <p className={classes.err}>Enter valid address</p>}
            </div>
          </div>

          <div>
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
              {address2HasErr && <p className={classes.err}>Enter valid address</p>}
            </div>
          </div>

          <div>
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
              {cityHasErr && <p className={classes.err}>Enter valid city</p>}
            </div>
          </div>

          <div>
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
              {stateHasErr && <p className={classes.err}>Enter valid state</p>}
            </div>
          </div>

          <div>
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
                  <option value="Manufacturer">Manufacturer</option>
                  <option value="Retailer">Retailer</option>
                </select>
                {accountTypeHasErr && <p className={classes.err}>Select one account type</p>}
          </div>
          <div>
            <input type="submit" value="Save" />
          </div>
      </form>
      </div>
        
    )
};