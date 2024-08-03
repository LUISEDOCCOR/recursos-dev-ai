import { Toaster } from "sonner";
import { isLive } from "../api/api";
import { useEffect } from "react";
import { Hero } from "../pages/_sections/Hero";
import { Analytics } from "@vercel/analytics/react";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    isLive();
  }, []);

  return (
    <div className="min-h-screen">
      <Analytics />
      <Hero />
      <div className="mt-16 w-full pb-12">{children}</div>
      <Toaster position="bottom-right" />
    </div>
  );
};
