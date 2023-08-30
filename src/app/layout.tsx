import "./globals.css";
import { Inter } from "next/font/google";
import Logo from "@/app/components/Logo";
import FontStyleSwitch from "@/app/components/FontStyleSwitch";
import DarkModeSwitch from "@/app/components/DarkModeSwitch";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dictionary Web App",
  description:
    "Dictionary Web App frontend challenge by frontendmentor.io, developed by Dominik Rubröder",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`mx-auto grid min-h-screen w-full max-w-screen-md grid-rows-[max-content_max-content_1fr] gap-8 px-6 dark:bg-black sm:px-10 lg:px-0 ${inter.className}`}
      >
        <header className="flex items-center justify-between gap-4 py-4">
          <Logo />

          <div className="flex items-center gap-4">
            <FontStyleSwitch />
            <span className="h-8 w-[1px] bg-gray-100 dark:bg-gray-900"></span>
            <DarkModeSwitch />
          </div>
        </header>

        {children}

        <footer className="text-app-neutral-blue-grayish my-8 text-center text-xs">
          Frontend challenge by&nbsp;
          <a
            href="https://www.frontendmentor.io/challenges/dictionary-web-app-h5wwnyuKFL"
            target="_blank"
            rel="noreferrer"
          >
            frontendmentor.io
          </a>
          , developed by&nbsp;
          <a
            href="https://github.com/dominikrubroeder"
            target="_blank"
            rel="noreferrer"
          >
            Dominik Rubröder
          </a>
        </footer>
      </body>
    </html>
  );
}
