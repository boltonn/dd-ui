import { useCallback, Fragment } from "react";
import Image from 'next/image';
import { useInfiniteQuery } from "@tanstack/react-query";
import useDatasetStore from "@/store/datasets";

export default function ImageGallery({ embedding, setEmbedding }) {
    const { datasets } = useDatasetStore();

    // Fetch Images with embedding and dataset via a post request
    const fetchImages = useCallback(
        async ({ pageParam = 0 }) => {
            const response = await fetch("/api/images/knn", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    embedding,
                    datasets: datasets,
                    // page: pageParam,
                }),
            });
            return response.json();
        },
        [datasets, embedding]
    );

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
    } = useInfiniteQuery({
            queryKey: ["images"], 
            queryFn: fetchImages,
            getNextPageParam: (lastPage) => lastPage.nextPage,
        });


    if (isFetching || !embedding) return "Loading...";
    if (!data) return "No data";
    return (
        <div className="pt-3">
            {/* {console.log(data)} */}
            <div className="flex flex-wrap items-center justify-center -m-1 md:-m-2">
                {data.pages.map((page, i) => (
                    <Fragment key={i}>
                        {page.map((image) => (
                            <div key={image.id} className="relative w-32 h-32 p-1 m-2 md:h-48 md:w-48 lg:h-64 lg:w-64 md:p-2">
                                <Image
                                    src={image.absolute_path}
                                    alt={image.id}
                                    fill
                                    sizes="100%"
                                    className="object-cover w-full h-full rounded-sm"
                                />
                            </div>
                        ))}
                    </Fragment>
                ))}
            </div>
            <button
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
            >
                {isFetchingNextPage
                    ? "Loading more..."
                    : hasNextPage
                    ? "Load More"
                    : "Nothing more to load"}
            </button>
        </div>
    );
}
