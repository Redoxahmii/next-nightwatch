"use client";
import { useTheme } from "next-themes";
import { Switch } from "@nextui-org/react";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Switch
      defaultSelected={theme === "dark"} // Set defaultSelected based on current theme
      size="lg"
      color="secondary"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <Sun className={className} />
        ) : (
          <Moon className={className} />
        )
      }
      onChange={() => setTheme(theme === "light" ? "dark" : "light")}
    />
  );
}
