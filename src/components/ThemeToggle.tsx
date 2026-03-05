import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="w-10 h-10 rounded-full flex items-center justify-center bg-accent hover:bg-accent/80 transition-colors"
      aria-label="Toggle theme"
    >
      {dark ? <Sun className="w-5 h-5 text-accent-foreground" /> : <Moon className="w-5 h-5 text-accent-foreground" />}
    </button>
  );
};

export default ThemeToggle;
