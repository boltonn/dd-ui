import { env, pipeline } from '@xenova/transformers';


// Specify a custom location for models in public folder
env.localModelPath = "/models";

// // Disable the loading of remote models from the Hugging Face Hub:
env.allowRemoteModels = false;
env.allowLocalModels = true;
env.useBrowserCache = false;

// Use the Singleton pattern to enable lazy construction of the pipeline.
// model should be directory in public/models (and in this case onnx folder is hardcoded)
class PipelineSingleton {
    static task = 'feature-extraction';
    static model = 'multilingual-e5-small';
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            console.log(this.model);
            this.instance = pipeline(this.task, this.model, { progress_callback, quantized:false }, );
        }
        return this.instance;
    }
}

// Listen for messages from the main thread
self.addEventListener('message', async (event) => {
    // Retrieve the feature-extraction pipeline. When called for the first time,
    // this will load the pipeline and save it for future use.
    let embedder = await PipelineSingleton.getInstance(x => {
        // We also add a progress callback to the pipeline so that we can
        // track model loading.
        self.postMessage(x);
    });

    // Actually perform the feature-extraction
    let query = `query: ${event.data.text}`
    let output = await embedder(query, { pooling: 'mean', normalize: true });
    console.log(output.tolist());

    // Send the output back to the main thread
    self.postMessage({
        status: 'complete',
        output: output.tolist(),
    });
});