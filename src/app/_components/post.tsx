"use client";

import { useState } from "react";

import { api } from "@/trpc/react";

export function LatestPost() {
  const [latestPost] = api.post.getLatest.useSuspenseQuery();

  const utils = api.useUtils();
  const [name, setName] = useState("");
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setName("");
    },
  });

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">آخر منشور ليك: {latestPost.name}</p>
      ) : (
        <p>معندكش منشورات لحد دلوقتي.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({ name });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="العنوان"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full bg-theme-card px-4 py-2 text-theme placeholder:text-theme-tertiary"
        />
        <button
          type="submit"
          className="rounded-full bg-theme-card px-10 py-3 font-semibold text-theme transition hover:bg-theme-highlight"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? "بنشر..." : "نشر"}
        </button>
      </form>
    </div>
  );
}
