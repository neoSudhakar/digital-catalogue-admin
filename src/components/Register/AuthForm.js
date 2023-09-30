import { Link, useNavigate, useSearchParams } from "react-router-dom";
import classes from "./AuthForm.module.css";
import useInput from "../../hooks/use-input";

export default function AuthForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const isLogin = searchParams.get("mode")==="login";

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
    inputVal: password,
    isValid: passwordIsValid,
    hasErr: passwordHasErr,
    touchFn: passwordTouchFn,
    resetFn: passwordResetFn,
    handleBlur: handlePasswordBlur,
    handleChange: handlePasswordChange,
  } = useInput((inputValue) => inputValue.trim().length > 6);

  let isFormValid=false;

  if(emailIsValid && passwordIsValid){
        isFormValid=true;
  }

  function handleSubmit(event) {
    event.preventDefault();

    emailTouchFn();
    passwordTouchFn();

    if(!isFormValid){
        return;
    }

    const form= new FormData(event.target);
    const formData=Object.fromEntries(form);

    console.log(formData);

    emailResetFn();
    passwordResetFn();

    localStorage.setItem("TOKEN","loggedIn");
    navigate("/");
  }

  const emailClasses= `${classes["input-grp"]} ${emailHasErr ? classes.invalid : ""}`;
  const passwordClasses= `${classes["input-grp"]} ${passwordHasErr ? classes.invalid : ""}`;

  return (
    <div className={classes.container}>
        <h1>{isLogin ? "Login" : "Register"}</h1>
      <form onSubmit={handleSubmit} className={classes.form}>
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
          {emailHasErr && <p className={classes.err}>Enter a valid email address!</p>}
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
          {passwordHasErr && <p className={classes.err}>Enter a valid password!</p>}
        </div>
        <div className={classes["form-actions"]}>
          <Link to={`?mode=${isLogin ? "register" : "login"}`} className={classes.alternative} type="button">
                {isLogin ? "Go To Register" : "Go To Login"}
          </Link>
          <button className={classes.button}>{isLogin ? "Login" : "Register"}</button>
        </div>
      </form>
    </div>
  );
}
