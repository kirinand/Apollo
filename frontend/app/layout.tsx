import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import MainNav from '@/components/main-nav'
import { AppContextProvider } from '@/context/store'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Apollo Journal',
  description: 'A journaling app with mental health insights',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContextProvider>
          <div>
            <MainNav />
            <div>{children}</div>
          </div>
        </AppContextProvider>
      </body>
    </html>
  )
}
