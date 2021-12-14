import React from "react";
import classNames from "classnames";
import "components/Button.scss";

export default function Button({
  children,
  confirm,
  danger,
  onClick,
  disabled,
}) {
  
  const buttonClass = classNames("button", {
    "button--confirm": confirm,
    "button--danger": danger,
  });

  return (
    <button className={buttonClass} {...{ onClick, disabled }}>
      {children}
    </button>
  );
}
