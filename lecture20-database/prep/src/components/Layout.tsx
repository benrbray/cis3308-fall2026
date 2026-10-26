import type React from "react";

export const Layout = (
  props: { children: React.ReactNode }
) => {
  return <html>
    <head>

    </head>
    <body>
      <h1>Hello React!</h1>
      {props.children}
    </body>
  </html>;
}