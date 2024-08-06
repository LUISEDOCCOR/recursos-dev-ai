import { getCategories } from "../api/categories";
import { getPosts } from "../api/posts";
import { Category as CategoryType, Post as PostType } from "../types";
import React, { useState } from "react";

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

  const setEndpoint = async (endpoint: string) => {
    try {
      setLoading(true);
      setEndpint(endpoint);
      if (endpoint == "posts") {
        setPosts(await getPosts());
      } else if (endpoint == "categories") {
        if (categories.length == 0) {
          setCategories(await getCategories());
        }
      } else if (endpoint.includes("category/")) {
        setPosts(await getPosts(endpoint));
      } else if (endpoint.includes("page/")) {
        setPosts(await getPosts(endpoint));
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      console.log("API error 🚨");
    }
  };

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
