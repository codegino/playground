import React from "react";

export const Select = React.forwardRef<
  HTMLSelectElement,
  JSX.IntrinsicElements["select"]
>(({ color, ...props }, ref) => (
  <select {...props} ref={ref} className="p-2 border w-full" />
));
