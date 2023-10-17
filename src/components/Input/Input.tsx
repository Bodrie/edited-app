import React from "react";
import styles from "./styles.module.css";
import cx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  labelPosition?: "before" | "after";
  error?: string;
  errorMsg?: string;
}

const Input = ({
  id,
  className,
  label,
  labelPosition = "before",
  error,
  errorMsg,
  ...rest
}: InputProps) => {
  const inputError = error === id;

  return (
    <div className={cx(styles.container)}>
      {label && labelPosition === "before" && (
        <label htmlFor={id}>{label}</label>
      )}
      <input
        id={id}
        className={cx(styles.input, inputError && styles.error)}
        {...rest}
      />
      {inputError && <p className={cx(styles.errorMsg)}>{errorMsg}</p>}
      {label && labelPosition === "after" && (
        <label htmlFor={id}>{label}</label>
      )}
    </div>
  );
};

export default Input;
