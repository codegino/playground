import React from "react";
import styles from "./styles.css";
import type { LinksFunction } from "remix";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export const Input = React.forwardRef<
  HTMLInputElement,
  JSX.IntrinsicElements["input"]
>(({ color, ...props }, ref) => <input {...props} ref={ref} custom-input="" />);
