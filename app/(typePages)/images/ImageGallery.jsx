import { useCallback, Fragment } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import useDatasetStore from "@/store/datasets";

export default function ImageGallery({ embedding, setEmbedding }) {
    const { datasets } = useDatasetStore();
    console.log(datasets);

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



    return (
        <div className="container px-5 py-2 mx-auto lg:px-32 lg:pt-12">
            {console.log(data)}
            <div className="flex flex-wrap -m-1 md:-m-2">
                {data.pages.map((page, i) => (
                    <Fragment key={i}>
                        {page.map((image) => (
                            <div key={image.id} className="p-1 md:p-2">
                                {/* enable local file refernce on the server */}
                                <img
                                    src={`file://${image.absolute_path}`}
                                    alt={image.id}
                                    className="object-cover w-full h-full rounded-lg"
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
