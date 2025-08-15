import type { Metadata } from "next"
import "@fontsource/inter/variable.css";
import "../../index.css"; 

import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Crearte.Maja",
  description: "",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
