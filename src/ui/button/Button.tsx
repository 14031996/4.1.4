import classnames from "classnames";
import { MouseEventHandler, ReactNode } from "react";
import Style from "./Button.style.module.scss";

type ButtonProps = {
  title: string;
  icon?: ReactNode;
  outline?: boolean;
  disabled?: boolean;
  classNames?: string[];
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Button = ({
  title,
  icon,
  outline,
  classNames,
  type = "button",
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={classnames(
        outline && Style.outline,
        Style.button,
        ...(classNames?.map((className) => Style[className]) ?? []),
      )}
      onClick={onClick}
    >
      {icon && <span className={Style.icon}>{icon}</span>}
      {title}
    </button>
  );
};
