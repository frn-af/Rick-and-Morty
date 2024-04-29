"use client";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useRef } from "react";
export default function Home() {
  const fetchData = async ({ pageParam }: { pageParam: number }) => {
    const response = await fetch(
      "https://rickandmortyapi.com/api/character?page=" + pageParam
    );
    return response.json();
  };

  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["characters"],
      queryFn: fetchData,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => lastPage.info.next,
    });

  const lastpostRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: lastpostRef.current,
    threshold: 1,
  });

  const _posts = data?.pages.flatMap((page) => page.results);

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>something went wrong</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-4xl font-bold text-center">Rick and Morty</h1>
      </div>
      {
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {_posts?.map((post, index) => {
            if (index === _posts.length - 1) {
              return (
                <div key={post.id} ref={ref}>
                  <Image
                    src={post.image}
                    alt={post.name}
                    width={500}
                    height={500}
                    className="object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-2xl font-bold">{post.name}</h2>
                    <p className="text-lg">{post.species}</p>
                  </div>
                </div>
              );
            }
            return (
              <div key={post.id}>
                <Image
                  src={post.image}
                  alt={post.name}
                  width={500}
                  height={500}
                  className="object-cover"
                />
                <div className="p-4">
                  <h2 className="text-2xl font-bold">{post.name}</h2>
                  <p className="text-lg">{post.species}</p>
                </div>
              </div>
            );
          })}
        </div>
      }
    </main>
  );
}
