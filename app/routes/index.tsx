import { redirect } from "remix";

export function loader() {
  return redirect("/words", 308);
}
