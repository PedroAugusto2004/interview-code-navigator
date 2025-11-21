import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: "light" | "dark" | "system";
  storageKey?: string;
}

export const ThemeProvider = ({
  children,
  defaultTheme = "system",
  storageKey = "pattern-theme"
}: ThemeProviderProps) => {
  return (
    <NextThemesProvider attribute="class" defaultTheme={defaultTheme} enableSystem storageKey={storageKey}>
      {children}
    </NextThemesProvider>
  );
};

