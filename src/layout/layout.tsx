import { Toaster } from "sonner";
import { isLive } from "../api/api";
import { useEffect } from "react";
import { Hero } from "../pages/_sections/Hero";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    isLive();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="mx-auto min-h-screen max-w-7xl pb-12">
        <Hero />
        <Toaster position="bottom-right" />
        {children}
      </div>
    </div>
  );
};
