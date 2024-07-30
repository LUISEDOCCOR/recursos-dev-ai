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
      <div className="mx-auto mt-28 min-h-screen max-w-7xl pb-12">
        <Toaster position="bottom-right" />
        {children}
      </div>
    </div>
  );
};
