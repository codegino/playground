import React from "react";
import styles from "./styles.css";
import type { LinksFunction } from "remix";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

type CustomButtonProps = {
  color?: "primary" | "success" | "danger" | "warning" | "info";
};

export const Button = React.forwardRef<
  HTMLButtonElement,
  JSX.IntrinsicElements["button"] & CustomButtonProps
>(({ color, ...props }, ref) => (
  <button {...props} ref={ref} custom-button={color ? color : ""} />
));
