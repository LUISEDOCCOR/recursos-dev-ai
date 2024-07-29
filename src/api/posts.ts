import { API_URL } from "./api";
import { Post, Data, AIPosts } from "../types";

export const getPosts = async (endpoint?: string): Promise<Post[]> => {
  const response = await fetch(`${API_URL}/${endpoint || "posts"}`);
  const data = await response.json();
  if (data?.mode != "error") {
    return data || [];
  } else return [];
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

export const aiGetPosts = async (prompt: string): Promise<AIPosts> => {
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
    const data = await response.json();
    return data as AIPosts;
  }
  return { posts: [], user: "" };
};
