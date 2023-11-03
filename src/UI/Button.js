import classes from "./Button.module.css";

export default function Button({ onClick, style, type, children, disabled }) {
  return (
    <button
      className={classes.button}
      style={style}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
