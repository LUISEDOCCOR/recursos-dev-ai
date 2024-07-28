import { Category } from "../types";
import { API_URL } from "./api";

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_URL}/categories`);
  const data = await response.json();
  return data || [];
};
