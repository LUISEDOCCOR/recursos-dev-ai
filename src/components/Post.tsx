import React from "react";
import { Post as PostType } from "../types";
import { IoFolderOpenOutline } from "react-icons/io5";

interface Props {
  post: PostType;
}

export const Post: React.FC<Props> = ({ post }) => {
  return (
    <article className="flex h-72 w-72 flex-col items-center gap-4 overflow-y-auto rounded-lg border-2 border-neutral-800 bg-neutral-900 px-4 py-6">
      {post.category.name.toLocaleLowerCase() == "twitch" && (
        <img
          src={`${post.urlImage}`}
          alt={`Profile image to ${post.title}`}
          className="aspect-square h-24 w-24 rounded-full"
          title={post.title}
        />
      )}
      <h2 className="text-center text-xl font-bold">{post.title}</h2>
      {post.category.name && (
        <h3 className="text-md py-.5 rounded-full bg-neutral-700 px-2">
          {post.category.name}
        </h3>
      )}
      {post.content && <p className="text-lg">{post.content}</p>}
      <a
        aria-label={`link to consult the page about ${post.title}`}
        target="_blank"
        href={post.src}
      >
        <IoFolderOpenOutline className="h-8 w-8 stroke-white transition-colors hover:stroke-neutral-400" />
      </a>
    </article>
  );
};
