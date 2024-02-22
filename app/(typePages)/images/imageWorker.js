import { env, AutoProcessor, RawImage, CLIPVisionModelWithProjection } from '@xenova/transformers';

// Specify a custom location for models in public folder
env.localModelPath = "/models";

// // Disable the loading of remote models from the Hugging Face Hub:
env.allowRemoteModels = false;
env.allowLocalModels = true;
env.useBrowserCache = false;

// Use the Singleton pattern to enable lazy construction of the pipeline.
// model should be directory in public/models (and in this case onnx folder is hardcoded)
class PipelineSingleton {
    static model_id = 'clip-vit-base-patch16';
    static processor = null;
    static img_model = null;

    static async getInstance(progress_callback = null) {
        // Load processor and text model
        if (this.processor === null) {
            this.processor = AutoProcessor.from_pretrained(this.model_id, { progress_callback });
        }

        if (this.img_model === null) {
            this.img_model = CLIPVisionModelWithProjection.from_pretrained(this.model_id, {
                progress_callback,
                quantized: false,
            });
        }
        return Promise.all([
            this.processor,
            this.img_model,
        ]);
    }
}

// Listen for messages from the main thread
self.addEventListener('message', async (event) => {
    // Retrieve the feature-extraction pipeline. When called for the first time,
    // this will load the pipeline and save it for future use.
    let [processor, img_model] = await PipelineSingleton.getInstance(self.postMessage);
    
    // send the output to the main thread
    self.postMessage({ status: 'ready' });

    // Actually perform the feature-extraction
    const image = await RawImage.fromURL(event.data.img);
    const img_inputs = await processor(image)
    console.log(img_inputs);

    const { image_embeds } = await img_model(img_inputs);
    console.log(image_embeds[0]);

    // Send the output back to the main thread
    self.postMessage({
        status: 'complete',
        output: image_embeds.tolist(),
    });
});