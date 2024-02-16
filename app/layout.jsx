import "./globals.css"
import React from "react"
import Providers from "./providers"
import Header from "@/components/header/Header"
import Sidebar from "@/components/sidebar"


export const metadata = {
  title: 'Data Distillery',
  description: 'Unstructured content triage with AI/ML',
}

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
            <Providers>
              <main className="flex flex-col items-center justify-between h-full">
                <Header />
                <div className="flex w-full h-auto my-1">
                  <Sidebar />
                  {children}
                </div>
              </main>
            </Providers>
        </body>
      </html>
    </>
  )
}
