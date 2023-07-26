import { LLM } from "llama-node";
import { LLamaCpp } from "llama-node/dist/llm/llama-cpp.js";

const model = "../llama-2-7b-chat/llama-2-7b-chat.ggmlv3.q5_1.bin";
const llama = new LLM(LLamaCpp);

const config = {
    modelPath: model,
    enableLogging: false,
    nCtx: 1024,
    seed: 0,
    f16Kv: false,
    logitsAll: false,
    vocabOnly: false,
    useMlock: false,
    embedding: false,
    useMmap: true,
    nGpuLayers: 0
};

export async function infer(prompt) {
    await llama.load(config);

    await llama.createCompletion({
        prompt,
        nThreads: 4,
        nTokPredict: 200,
        topK: 40,
        topP: 0.1,
        temp: 0.1,
        repeatPenalty: 0.1,
    }, (response) => {
        // process.stdout.write(response.token);
        let x = response;
        console.log(x);
    });
}

// infer("Who is president of the united states?");
