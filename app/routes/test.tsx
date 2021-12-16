import type { ErrorBoundaryComponent } from "remix";

export function loader() {
  throw new Error("An error from `/test`, this should be caught in `root.tsx`");
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  throw error;
};

export default function Index() {
  return <div>hello</div>;
}
