import { type PageProps } from "$fresh/server.ts";
import { Header } from "@jurassicjs/ui";
export default function App({ Component }: PageProps) {
  const menus = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/components" },
    { name: "Pricing", href: "/docs" },
  ];

  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>fresh-project</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <Header active="/" menus={menus} />
        <Component />
      </body>
    </html>
  );
}
