import './globals.css'
import {Inter} from 'next/font/google'
import Logo from "@/app/components/Logo";

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'Dictionary Web App',
    description: 'Dictionary Web App frontend challenge by frontendmentor.io, developed by Dominik Rubröder',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body
            className={`grid gap-8 grid-rows-[max-content_max-content_1fr] mx-auto max-w-screen-md min-h-screen ${inter.className}`}>
        <header className="flex justify-between gap-4 py-4 items-center">
            <Logo/>

            <div>Other stuff</div>
        </header>

        {children}
        </body>
        </html>
    )
}
