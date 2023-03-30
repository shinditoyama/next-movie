import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ToggleButton() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <button
          type="button"
          className="p-2 rounded-md hover:ring-2 hover:ring-gray-300 bg-gray-200 dark:bg-gray-600"
          onClick={() => setTheme("light")}
        >
          <SunIcon className="h-5 w-5" />
        </button>
      );
    }
    return (
      <button
        type="button"
        className="p-2 rounded-md hover:ring-2 hover:ring-gray-300 bg-gray-200"
        onClick={() => setTheme("dark")}
      >
        <MoonIcon className="h-5 w-5" />
      </button>
    );
  };

  return <>{renderThemeChanger()}</>;
}
