import React from "react";
import styles from "./styles.module.css";
import cx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  icon?: React.ReactElement;
}

const Button = ({ children, icon, className, ...rest }: ButtonProps) => {
  return (
    <button {...rest} className={cx(styles.button, styles[className!])}>
      {children}
    </button>
  );
};

export default Button;
