import React from "react";

import "components/Button.scss";

export default function Button(props) {
  const { children, confirm, danger, onClick, disabled } = props;

  let buttonClass = "button";

  if (confirm) {
    buttonClass += " button--confirm";
  } else if (danger) {
   buttonClass += " button--danger";
  }

  return <button className={buttonClass}>{children}</button>;
};