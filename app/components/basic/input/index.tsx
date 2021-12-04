import React from "react";

export const Input = React.forwardRef<
  HTMLInputElement,
  JSX.IntrinsicElements["input"]
>(({ color, ...props }, ref) => (
  <input
    {...props}
    ref={ref}
    className={`
      p-2 w-full border rounded
    `}
  />
));
