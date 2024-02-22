import { env, AutoTokenizer, CLIPTextModelWithProjection } from '@xenova/transformers';

// Specify a custom location for models in public folder
env.localModelPath = "/models";

// // Disable the loading of remote models from the Hugging Face Hub:
env.allowRemoteModels = false;
env.allowLocalModels = true;
env.useBrowserCache = true;

// Use the Singleton pattern to enable lazy construction of the pipeline.
// model should be directory in public/models (and in this case onnx folder is hardcoded)
class PipelineSingleton {
    static model_id = 'clip-vit-base-patch16';
    static tokenizer = null;
    static text_model = null;

    static async getInstance(progress_callback = null) {
        // Load tokenizer and text model
        if (this.tokenizer === null) {
            this.tokenizer = AutoTokenizer.from_pretrained(this.model_id, { progress_callback });
        }

        if (this.text_model === null) {
            this.text_model = CLIPTextModelWithProjection.from_pretrained(this.model_id, {
                progress_callback,
                quantized: false,
            });
        }
        return Promise.all([
            this.tokenizer,
            this.text_model,
        ]);
    }
}

// Listen for messages from the main thread
self.addEventListener('message', async (event) => {
    // Retrieve the feature-extraction pipeline. When called for the first time,
    // this will load the pipeline and save it for future use.
    let [tokenizer, text_model] = await PipelineSingleton.getInstance(self.postMessage);
    
    // send the output to the main thread
    self.postMessage({ status: 'ready' });
    // console.log(tokenizer);
    // console.log(text_model);

    // Actually perform the feature-extraction
    const text_inputs = await tokenizer(event.data, { padding: true, truncation:true });
    // console.log(text_inputs);

    const { text_embeds } = await text_model(text_inputs, { normalize: true });
    // let output = await embedder(event.data.text, { pooling: 'mean', normalize: true });
    // console.log(text_embeds.tolist());

    // Send the output back to the main thread
    self.postMessage({
        status: 'complete',
        output: text_embeds.tolist(),
    });
});