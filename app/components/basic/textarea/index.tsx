import React from "react";

export const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  JSX.IntrinsicElements["textarea"]
>(({ color, ...props }, ref) => (
  <textarea {...props} ref={ref} className="p-2 border rounded w-full" />
));
