import { useCatch } from "remix";

export function WordsErrorBoundary() {
  let caught = useCatch();

  return (
    <section>
      <h2>
        {caught.status}: {caught.statusText}
      </h2>
      {caught.data && <p>{caught.data.message}</p>}
    </section>
  );
}
