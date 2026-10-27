import type { ReactNode } from "react"

export interface LayoutProps {
  title: string,
  children: ReactNode
}

export const Layout = (
  props: LayoutProps
) => {
  return <html>
    <head>
      <title>
        {props.title}
      </title>
    </head>
    <body>
      {props.children}
    </body>
  </html>
}