"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
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

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>something went wrong</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-4xl font-bold text-center">Rick and Morty</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.pages.map((page) =>
          page.results.map((character: any) => (
            <div
              key={character.id}
              className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md"
            >
              <Image
                src={character.image}
                alt={character.name}
                width={128}
                height={128}
                className="object-cover rounded-full"
              />
              <h2 className="text-lg font-semibold">{character.name}</h2>
              <p className="text-sm text-gray-500">{character.species}</p>
            </div>
          ))
        )}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage ? "Loading more..." : "Load More"}
      </button>
    </main>
  );
}
