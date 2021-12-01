import React from "react";
import styles from "./styles.css";
import type { LinksFunction } from "remix";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export const Select = React.forwardRef<
  HTMLSelectElement,
  JSX.IntrinsicElements["select"]
>(({ color, ...props }, ref) => (
  <select {...props} ref={ref} custom-select="" />
));
