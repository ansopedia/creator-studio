import ThemeToggle from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <Button variant="link">Button</Button>
      <ThemeToggle />
    </div>
  );
}
