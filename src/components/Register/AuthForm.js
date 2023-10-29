import { Link, useNavigate, useSearchParams } from "react-router-dom";
import classes from "./AuthForm.module.css";
import useInput from "../../hooks/use-input";

export default function AuthForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const isLogin = searchParams.get("mode") === "login";

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
    inputVal: phoneNum,
    isValid: phoneNumIsValid,
    hasErr: phoneNumHasErr,
    touchFn: phoneNumTouchFn,
    resetFn: phoneNumResetFn,
    handleBlur: handlePhoneNumBlur,
    handleChange: handlePhoneNumChange,
  } = useInput((inputValue) => inputValue.trim().length === 10 && !isNaN(+inputValue));

  const {
    inputVal: email,
    isValid: emailIsValid,
    hasErr: emailHasErr,
    touchFn: emailTouchFn,
    resetFn: emailResetFn,
    handleBlur: handleEmailBlur,
    handleChange: handleEmailChange,
  } = useInput((inputValue) => inputValue.includes("@"));

  // const {
  //   inputVal: password,
  //   isValid: passwordIsValid,
  //   hasErr: passwordHasErr,
  //   touchFn: passwordTouchFn,
  //   resetFn: passwordResetFn,
  //   handleBlur: handlePasswordBlur,
  //   handleChange: handlePasswordChange,
  // } = useInput((inputValue) => inputValue.trim().length > 6);

  const {
    inputVal: address,
    isValid: addressIsValid,
    hasErr: addressHasErr,
    touchFn: addressTouchFn,
    resetFn: addressResetFn,
    handleBlur: handleAddressBlur,
    handleChange: handleAddressChange,
  } = useInput((inputValue) => inputValue.trim().length > 0);

  let isFormValid = false;

  if (firstNameIsValid && lastNameIsValid && emailIsValid && phoneNumIsValid && addressIsValid) {
    isFormValid = true;
  }

  function handleSubmit(event) {
    event.preventDefault();

    emailTouchFn();
    // passwordTouchFn();
    phoneNumTouchFn();
    addressTouchFn();
    firstNameTouchFn();
    lastNameTouchFn();

    if (!isFormValid) {
      return;
    }

    const form = new FormData(event.target);
    const formData = Object.fromEntries(form);

    console.log(formData);

    emailResetFn();
    // passwordResetFn();
    phoneNumResetFn();
    addressResetFn();
    firstNameResetFn();
    lastNameResetFn();

    const fullNameObj = {fName:firstName, lName:lastName};

    localStorage.setItem("TOKEN", "loggedIn");
    localStorage.setItem("fullName", JSON.stringify(fullNameObj));
    navigate("/");
  }

  const emailClasses = `${classes["input-grp"]} ${
    emailHasErr ? classes.invalid : ""
  }`;
  // const passwordClasses= `${classes["input-grp"]} ${passwordHasErr ? classes.invalid : ""}`;
  const phoneNumClasses = `${classes["input-grp"]} ${
    phoneNumHasErr ? classes.invalid : ""
  }`;
  const firstNameClasses = `${classes["input-grp"]} ${
    firstNameHasErr ? classes.invalid : ""
  }`;
  const lastNameClasses = `${classes["input-grp"]} ${
    lastNameHasErr ? classes.invalid : ""
  }`;
  const addressClasses = `${classes["input-grp"]} ${
    addressHasErr ? classes.invalid : ""
  }`;

  return (
    <div className={classes.container}>
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <form onSubmit={handleSubmit} className={classes.form}>
      <div className={classes["names-container"]}>
        <div className={firstNameClasses}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter First Name"
            value={firstName}
            onChange={handleFirstNameChange}
            onBlur={handleFirstNameBlur}
          />
          {/* {firstNameHasErr && (
            <p className={classes.err}>Enter a valid first name!</p>
          )} */}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            placeholder="Enter Last Name"
            onChange={handleLastNameChange}
            onBlur={handleLastNameBlur}
          />
          {/* {lastNameHasErr && (
            <p className={classes.err}>Enter a valid last name!</p>
          )} */}
        </div>
        </div>
        <div className={phoneNumClasses}>
          <label htmlFor="phoneNum">Phone Number</label>
          <input
            type="tel"
            name="phoneNum"
            id="phoneNum"
            value={phoneNum}
            placeholder="Enter Phone Number"
            onChange={handlePhoneNumChange}
            onBlur={handlePhoneNumBlur}
            maxLength={10}

          />
          {/* {phoneNumHasErr && (
            <p className={classes.err}>Enter a valid phone number!</p>
          )} */}
        </div>
        <div className={emailClasses}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onBlur={handleEmailBlur}
            onChange={handleEmailChange}
            placeholder="Enter email address"
          />
          {/* {emailHasErr && (
            <p className={classes.err}>Enter a valid email address!</p>
          )} */}
        </div>
        <div className={addressClasses}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Enter address"
            value={address}
            onBlur={handleAddressBlur}
            onChange={handleAddressChange}
          />
          {/* {addressHasErr && (
            <p className={classes.err}>Enter a valid address!</p>
          )} */}
        </div>
        {/* <div className={passwordClasses}>
          <label htmlFor="password">Password</label>
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
        </div> */}
        <div className={classes["form-actions"]}>
          <Link
            to={`?mode=${isLogin ? "register" : "login"}`}
            className={classes.alternative}
            type="button"
          >
            {isLogin ? "Go To Register" : "Go To Login"}
          </Link>
          <button className={classes.button}>
            {isLogin ? "Login" : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}
