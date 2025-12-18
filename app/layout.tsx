import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Rangi Ho | Portfolio',
  description: 'Personal portfolio of Rangi Ho',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="p-4 max-w-4xl mx-auto">{children}</main>
        <footer className="p-4 text-center text-sm text-gray-500 border-t">
          © {new Date().getFullYear()} Rangi Ho. All rights reserved.
        </footer>
      </body>
    </html>
  )
}
