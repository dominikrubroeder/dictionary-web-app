"use client";
import { useState } from "react";

interface fontStyle {
  types: "Sans Serif" | "Serif" | "Mono";
}

export default function FontStyleSwitch() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontStyle, setFontStyle] = useState<fontStyle["types"]>("Sans Serif");

  function enableFontStyle(fontStyle: fontStyle["types"]) {
    // Remove all font based class names from HTML element
    document.documentElement.classList.forEach((className) => {
      if (className.startsWith("font-"))
        document.documentElement.classList.remove(className);
    });

    // Apply current font style to HTML element
    document.documentElement.classList.add(
      `font-${fontStyle.toLowerCase().replace(" ", "")}-theme`
    );

    // Set font style state
    setFontStyle(fontStyle);
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 dark:text-white"
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
        <div className="absolute right-0 top-8 z-50 rounded-xl bg-white p-8 drop-shadow-2xl">
          <ul className="grid w-max gap-2">
            <li
              onClick={() => enableFontStyle("Sans Serif")}
              className="cursor-pointer font-sans"
            >
              Sans Serif
            </li>
            <li
              onClick={() => enableFontStyle("Serif")}
              className="cursor-pointer font-serif"
            >
              Serif
            </li>
            <li
              onClick={() => enableFontStyle("Mono")}
              className="cursor-pointer font-mono"
            >
              Mono
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
