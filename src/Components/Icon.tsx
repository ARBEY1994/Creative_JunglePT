/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { HTMLAttributes } from "react";

interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  iconName: string;
  className?: string;
  style?: React.CSSProperties;
  isSymbol?: boolean;
}
const Icon = ({
  iconName,
  className = "",
  style = {},
  isSymbol = false,
  onClick,
  ...props
}: IconProps) => {
  return (
    <span
      className={`material-${
        isSymbol ? "symbols-outlined" : "icons"
      } ${className}`}
      onClick={onClick}
      style={style}
      {...props}
    >
      {iconName}
    </span>
  );
};

Icon.defaultProps = {
  iconName: "Icon",
  className: "text-white",
  style: {},
};

export default Icon;
