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
      className="scroll-animation relative h-48 w-48 overflow-y-auto rounded-sm border border-neutral-700 transition-colors hover:bg-neutral-800 2xl:h-60 2xl:w-60"
    >
      {post.content && (
        <span className="absolute bottom-2 right-2">
          <RiScrollToBottomLine className="h-4 w-4 fill-neutral-400 2xl:h-6 2xl:w-6" />
        </span>
      )}
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-2">
        {post.category.name.toLocaleLowerCase() == "twitch" && (
          <img
            src={`${post.urlImage}`}
            alt={`Profile image to ${post.title}`}
            className="aspect-square h-16 w-16 rounded-full 2xl:h-20 2xl:w-20"
            title={post.title}
          />
        )}
        <h2 className="text-md text-center font-bold 2xl:text-lg">
          {post.title}
        </h2>
        {post.category.name && (
          <h3 className="dm-mono py-.5 rounded-full bg-neutral-700 px-2 text-xs text-neutral-300 2xl:text-sm">
            {post.category.name}
          </h3>
        )}
        <a
          aria-label={`link to consult the page about ${post.title}`}
          target="_blank"
          href={post.src}
        >
          <LuExternalLink className="h-5 w-5 stroke-neutral-500 transition-colors hover:stroke-neutral-400 2xl:h-7 2xl:w-7" />
        </a>
      </div>
      {post.content && (
        <p className="dm-mono px-4 pb-4 text-sm leading-snug text-neutral-300 2xl:text-lg">
          {post.content}
        </p>
      )}
    </article>
  );
};
