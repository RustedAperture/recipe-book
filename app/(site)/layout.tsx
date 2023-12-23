import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Recipe Book',
  description: 'Walnut & Zimbi Recipe Book',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="max-w-4xl mx-auto py-10 px-4 bg-zinc-900">
        <header className='flex items-center justify-between'>
          <Link href="/" className=''>
            Home
          </Link>
          <Link href="/admin" className=''>
            Admin
          </Link>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
