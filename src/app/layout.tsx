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
        className={`mx-auto grid min-h-screen max-w-screen-md grid-rows-[max-content_max-content_1fr] gap-8 ${inter.className} dark:bg-black`}
      >
        <header className="flex items-center justify-between gap-4 py-4">
          <Logo />

          <div className="flex gap-4">
            <FontStyleSwitch />
            <span className="h-8 w-[1px] bg-gray-100"></span>
            <DarkModeSwitch />
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
