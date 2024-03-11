import { create } from "zustand";


const useDatasetStore = create((set) => ({
    datasets: ["test"],
    addDataset: (dataset) =>
        set((state) => ({
            datasets: [
                ...state.datasets,
                dataset,
            ],
        })),
    removeDataset: (toRemove) =>
        set((state) => ({
            datasets: state.datasets.filter((dataset) => dataset !== toRemove),
        })),
}));

export default useDatasetStore;