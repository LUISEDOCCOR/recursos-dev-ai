import { getCategories } from "../api/categories";
import { getPosts } from "../api/posts";
import { Category as CategoryType, Post as PostType } from "../types";
import React, { useState, useCallback } from "react";

export const useGetData = (): {
  posts: PostType[];
  categories: CategoryType[];
  isLoading: boolean;
  setEndpoint: (endpoint: string) => {};
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  currentEndpoint: string;
} => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [currentEndpoint, setEndpint] = useState<string>("");

  const setEndpoint = useCallback(
    async (endpoint: string) => {
      try {
        if (
          currentEndpoint.includes("page/") ||
          (currentEndpoint.includes("categories") && endpoint == "posts")
        ) {
          const newPosts = await getPosts();
          newPosts.splice(0, 16);
          const allPosts = posts.concat(newPosts);
          setPosts(allPosts);
        } else if (endpoint == "posts") {
          setLoading(true);
          setPosts(await getPosts());
        } else if (endpoint == "categories") {
          if (categories.length == 0) {
            setLoading(true);
            setCategories(await getCategories());
          }
        } else if (endpoint.includes("category/")) {
          setLoading(true);
          setPosts(await getPosts(endpoint));
        } else if (endpoint.includes("page/")) {
          setLoading(true);
          setPosts(await getPosts(endpoint));
        }
        setEndpint(endpoint);
        setLoading(false);
      } catch (e) {
        console.log(e);
        console.log("API error 🚨");
      }
    },
    [currentEndpoint],
  );

  return {
    posts,
    categories,
    isLoading,
    setEndpoint,
    setPosts,
    setLoading,
    currentEndpoint,
  };
};
