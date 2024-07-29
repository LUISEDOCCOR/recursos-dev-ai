import React from "react";
import { Post as PostType } from "../types";
import { LuExternalLink } from "react-icons/lu";
import { RiScrollToBottomLine } from "react-icons/ri";

interface Props {
  post: PostType;
}

export const Post: React.FC<Props> = ({ post }) => {
  return (
    <article
      style={{ scrollbarWidth: "none" }}
      className="scroll-animation relative h-60 w-60 overflow-y-auto rounded-lg border-2 border-neutral-800 bg-neutral-900"
    >
      {post.content && (
        <span className="absolute bottom-2 right-2">
          <RiScrollToBottomLine className="h-6 w-6 fill-neutral-400" />
        </span>
      )}
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-2">
        {post.category.name.toLocaleLowerCase() == "twitch" && (
          <img
            src={`${post.urlImage}`}
            alt={`Profile image to ${post.title}`}
            className="aspect-square h-20 w-20 rounded-full"
            title={post.title}
          />
        )}
        <h2 className="text-center text-lg font-bold">{post.title}</h2>
        {post.category.name && (
          <h3 className="dm-mono py-.5 rounded-full bg-neutral-700 px-2 text-sm text-neutral-300">
            {post.category.name}
          </h3>
        )}
        <a
          aria-label={`link to consult the page about ${post.title}`}
          target="_blank"
          href={post.src}
        >
          <LuExternalLink className="h-7 w-7 stroke-neutral-500 transition-colors hover:stroke-neutral-400" />
        </a>
      </div>
      {post.content && (
        <p className="text-md dm-mono px-4 pb-4 leading-snug text-neutral-300">
          {post.content}
        </p>
      )}
    </article>
  );
};
