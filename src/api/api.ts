export const API_URL = import.meta.env.VITE_URL_API;
import { toast } from "sonner";

export const isLive = async () => {
  const response = await fetch(`${API_URL}/ok`);
  if (!response.ok) {
    toast.error("No está funcionando actualmente, regrese más tarde. 🥲");
  }
};
