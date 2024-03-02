import "./globals.css"
import React from "react"
import Providers from "./providers"
import Header from "@/components/header/Header"
import Sidebar from "@/components/sidebar"


export const metadata = {
  title: 'Valence',
  description: 'Unstructured content triage with AI/ML',
}

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
            <Providers>
              <main className="flex flex-col items-center justify-between h-full dark:bg-black">
                <Header />
                <div className="flex w-full h-auto">
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
