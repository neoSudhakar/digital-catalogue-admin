import classes from "./Button.module.css";

export default function Button({ onClick, style, key, type, children, disabled }) {
  return (
    <button
      className={classes.button}
      style={style}
      key={key}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
