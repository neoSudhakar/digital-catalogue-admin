import { Link, useNavigate, useSearchParams } from "react-router-dom";
import classes from "./AuthForm.module.css";
import useInput from "../../hooks/use-input";
import { Modal } from "antd";

export default function AuthForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const isLogin = searchParams.get("mode") === "login";

  /*const {
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
  } = useInput((inputValue) => inputValue.trim().length === 10);

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
*/

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


  let isFormValid = false;

  if (userNameIsValid && passwordIsValid/*firstNameIsValid && lastNameIsValid && emailIsValid && phoneNumIsValid && addressIsValid*/) {
    isFormValid = true;
  }

  function handleSubmit(event) {
    event.preventDefault();

    userNameTouchFn();
    passwordTouchFn();
    //emailTouchFn();
    //phoneNumTouchFn();
    //addressTouchFn();
    //firstNameTouchFn();
    //lastNameTouchFn();

    if (isFormValid) {
      //console.log(userName, password);

      const form = new FormData(event.target);
    const formData = Object.fromEntries(form);

    console.log(formData);

    fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then(async response => {
    if (!response.ok) {
      return response.json().then(errorData => {
      if (response.status === 404) {
        const errorMessage = errorData.message;
        Modal.error({
          title: 'User not found',
          content: errorMessage,
        });
        //console.log('Username does not exist');
      } else if (response.status === 401) {
        //console.log('Invalid password');
        const errorMessage = errorData.message;
        Modal.error({
          title: 'Invalid Credentials',
          content: errorMessage,
        });
      }
  });
  //console.log(response.json());
}
return response.json();
})
.then(data => {
  //if(data.message){console.log(data.message)};
  if(data && data.userName && data.password)
  {
    console.log("Login Successful!")
    localStorage.setItem("TOKEN", "loggedIn");
    localStorage.setItem("fullName", data.userName);
    navigate("/");
  }
})
.catch(error => {
  console.error('Error occurred:', error);
});


    /*.then(result => {
      console.log('Data sent successfully!');
      localStorage.setItem("TOKEN", "loggedIn");
          localStorage.setItem("fullName", userName);
          localStorage.setItem("password", password);
          navigate("/");
    })
    .catch(error => console.log('error occurred!'));*/
 
  }

  
    userNameResetFn();
    passwordResetFn();
    //emailResetFn();
    //phoneNumResetFn();
    //addressResetFn();
    //firstNameResetFn();
    //lastNameResetFn();

    //const fullNameObj = {fName:firstName, lName:lastName};
    //localStorage.setItem("fullName", JSON.stringify(userName));

    /*localStorage.setItem("TOKEN", "loggedIn");
    localStorage.setItem("fullName", userName);
    localStorage.setItem("password", password);
    navigate("/");*/
  }


  const userNameClasses= `${classes["input-grp"]} ${userNameHasErr ? classes.invalid : ""}`;
  const passwordClasses= `${classes["input-grp"]} ${passwordHasErr ? classes.invalid : ""}`;
  /*const emailClasses = `${classes["input-grp"]} ${
    emailHasErr ? classes.invalid : ""
  }`;
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
  */

  return (
    <div className={classes.container}>
      {/*<h1>{isLogin ? "Login" : "Register"}</h1>*/}
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className={classes.form}>
      <div className={classes["names-container"]}>
        {/*<div className={firstNameClasses}>
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
          {{firstNameHasErr && (
            <p className={classes.err}>Enter a valid first name!</p>
          )} }
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
          {{lastNameHasErr && (
            <p className={classes.err}>Enter a valid last name!</p>
          )} }
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
          { {phoneNumHasErr && (
            <p className={classes.err}>Enter a valid phone number!</p>
          )} }
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
          {{emailHasErr && (
            <p className={classes.err}>Enter a valid email address!</p>
          )} }
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
          { {addressHasErr && (
            <p className={classes.err}>Enter a valid address!</p>
          )} }
        </div>*/}
        <div className={userNameClasses}>
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="Enter User Name"
            value={userName}
            onChange={handleUserNameChange}
            onBlur={handleUserNameBlur}
          />
          {/* {userNameHasErr && (
            <p className={classes.err}>Enter a valid user name!</p>
          )} */}
        </div>
        <div className={passwordClasses}>
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
          {/*passwordHasErr && <p className={classes.err}>Enter a valid password!</p>*/}
        </div>
        <div className={classes["form-actions"]}>
          <Link
            //to={`?mode=${isLogin ? "register" : "login"}`}
            className={classes.alternative}
            type="button"
          >
            {/*{isLogin ? "Go To Register" : "Go To Login"}*/}
            {isLogin && "Forgot Password?"}
          </Link>
          
          <button className={classes.button}>
            {isLogin && "Login"}
          </button>
        </div>
      </div>
      </form>
    </div>
  );
}
