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
} => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const setEndpoint = async (endpoint: string) => {
    setLoading(true);
    if (endpoint == "posts") {
      setPosts(await getPosts());
    } else if (endpoint == "categories") {
      setCategories(await getCategories());
    } else if (endpoint.includes("category/")) {
      setPosts(await getPosts(endpoint));
    }
    setLoading(false);
  };

  return { posts, categories, isLoading, setEndpoint, setPosts, setLoading };
};
