import React from "react";
import styles from "./styles.css";
import type { LinksFunction } from "remix";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  JSX.IntrinsicElements["textarea"]
>(({ color, ...props }, ref) => (
  <textarea {...props} ref={ref} custom-textarea="" />
));
