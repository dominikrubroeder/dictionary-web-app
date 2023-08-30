"use client";
import { useState } from "react";

interface fontStyle {
  types: "font-sans" | "font-serif" | "font-mono";
}

const initialFontStyle: fontStyle["types"] = "font-sans";

export default function FontStyleSwitch() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontStyle, setFontStyle] =
    useState<fontStyle["types"]>(initialFontStyle);

  function enableFontStyle(fontStyle: fontStyle["types"]) {
    // Remove all font based class names from HTML element
    document.body.classList.forEach((className) => {
      if (className.startsWith("font-"))
        document.body.classList.remove(className);
    });

    // Apply current font style to HTML element
    document.body.classList.add(fontStyle);

    setFontStyle(fontStyle);
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <div
        className="flex cursor-pointer items-center gap-2 dark:text-white"
        onClick={() => setIsOpen((previousState) => !previousState)}
      >
        {fontStyle}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="8"
          viewBox="0 0 14 8"
        >
          <path
            fill="none"
            stroke="#A445ED"
            strokeWidth="1.5"
            d="m1 1 6 6 6-6"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-8 z-50 min-w-[11.5rem] rounded-xl bg-white p-6 drop-shadow-2xl dark:bg-black dark:shadow-app-shadow">
          <ul className="grid w-max gap-2">
            <li
              onClick={() => enableFontStyle("font-sans")}
              className="cursor-pointer font-sans text-lg hover:text-purple-400 dark:text-white dark:hover:text-purple-400"
            >
              Sans Serif
            </li>
            <li
              onClick={() => enableFontStyle("font-serif")}
              className="cursor-pointer font-serif text-lg hover:text-purple-400 dark:text-white dark:hover:text-purple-400"
            >
              Serif
            </li>
            <li
              onClick={() => enableFontStyle("font-mono")}
              className="cursor-pointer font-mono text-lg hover:text-purple-400 dark:text-white dark:hover:text-purple-400"
            >
              Mono
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
