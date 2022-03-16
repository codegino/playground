import type { MetaFunction } from "remix";
import { Link } from "remix";

export const meta: MetaFunction = () => {
  return {
    title: "Home | Code Gino Playground",
    description: "Web application to showcase the power of Remix",
    "og:type": "website",
    "og:url": "https://codegino.vercel.app",
    "og:title": "Code Gino Playground",
    "og:description": "Web application to showcase the power of Remix",
    "og:image": "https://codegino.vercel.app/assets/logo.png",
    "twitter:card": "summary_large_image",
    "twitter:url": "https://codegino.vercel.app",
    "twitter:title": "Code Gino Playground",
    "twitter:description": "Web application to showcase the power of Remix",
    "twitter:image": "https://codegino.vercel.app/assets/logo.png",
  };
};

export default function Index() {
  return (
    <main className="p-2">
      <nav>
        <ul>
          <li>
            <Link to={"/words"}>Words</Link>
          </li>
        </ul>
      </nav>
      <header>
        <h1 className="text-3xl text-center mb-3">Code Gino's playground</h1>
      </header>
      <section>
        <h2>Something to show in SEO</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae
          ullam consequuntur molestiae, saepe quam aspernatur velit eos optio ea
          possimus voluptates, tempore cumque neque nihil, adipisci sit ipsam
          quidem iure?
        </p>
      </section>
    </main>
  );
}
