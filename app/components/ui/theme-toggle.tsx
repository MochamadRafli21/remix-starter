import { useTheme } from "~/components/provider/theme";
import { Sun, Moon } from "lucide-react";
import { Button } from "~/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const onToggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" onClick={onToggleTheme}>
        {theme === "light" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
