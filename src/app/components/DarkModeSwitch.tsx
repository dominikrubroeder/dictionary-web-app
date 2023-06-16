"use client";
export default function DarkModeSwitch() {
  return (
    <div
      onClick={() => {
        if (document.documentElement.classList.contains("dark")) {
          document.documentElement.classList.remove("dark");
        } else {
          document.documentElement.classList.add("dark");
        }
      }}
      className="dark:text-white"
    >
      Dark Mode Switch
    </div>
  );
}
