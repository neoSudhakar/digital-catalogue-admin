import { Link, useNavigate, useSearchParams } from "react-router-dom";
import classes from "./AuthForm.module.css";
import useInput from "../../hooks/use-input";
import { Modal } from "antd";
import { BASE_URL } from "../../util/http";

export default function AuthForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const isLogin = searchParams.get("mode") === "login";

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

    if (isFormValid) {

      const form = new FormData(event.target);
    const formData = Object.fromEntries(form);

    console.log(formData);
    fetch(`${BASE_URL}/login`, {
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
    console.log("Logged in data is:", data);
    console.log("Logged in user id is:", data.id);
    console.log("Logged in account is:", data.account);
    localStorage.setItem("ACCOUNT", JSON.stringify(data.account));
    localStorage.setItem("USER_ID", data.id);
    navigate("/");
  }
})
.catch(error => {
  console.error('Error occurred:', error);
});
 
  }
    userNameResetFn();
    passwordResetFn();
  }


  const userNameClasses= `${classes["input-grp"]} ${userNameHasErr ? classes.invalid : ""}`;
  const passwordClasses= `${classes["input-grp"]} ${passwordHasErr ? classes.invalid : ""}`;

  return (
    <div className={classes.container}>
      {/*<h1>{isLogin ? "Login" : "Register"}</h1>*/}
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className={classes.form}>
      <div className={classes["names-container"]}>
       
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
          
          <button className={classes.button} disabled={!isFormValid}>
            {isLogin && "Login"}
          </button>
        </div>
      </div>
      </form>
    </div>
  );
}
