import { API_URL } from "./api";
import { Post, Data } from "../types";

export const getPosts = async (endpoint?: string): Promise<Post[]> => {
  const response = await fetch(`${API_URL}/${endpoint || "posts"}`);
  const data = await response.json();
  return data || [];
};

export const createPost = async (body: Data): Promise<boolean> => {
  const response = await fetch(`${API_URL}/post/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response.ok;
};

export const aiGetPosts = async (prompt: string): Promise<Post[]> => {
  const response = await fetch(`${API_URL}/ai/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: prompt,
    }),
  });

  if (response.status != 204) {
    const posts = await response.json();
    return (posts as Post[]) || [];
  } else return [];
};
