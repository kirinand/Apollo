import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { AppContextProvider } from '@/providers/context/app-context-providers'
import { InfoContextProvider } from '@/providers/context/info-context-provider'
import ReactQueryProvider from '@/providers/react-query-provider'
import { Toaster } from '@/components/ui/toaster'

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
        <ReactQueryProvider>
          <AppContextProvider>
            <InfoContextProvider>
              <div>
                <div>{children}</div>
                <Toaster />
              </div>
            </InfoContextProvider>
          </AppContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
