
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import * as hub from "langchain/hub";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { TextLoader } from "langchain/document_loaders/fs/text";
import dotenv from 'dotenv';

dotenv.config();


const langchainAnswer = async () => {

    const loader = new TextLoader("./tmp.docx");

    const docs = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });

    const splits = await textSplitter.splitDocuments(docs);

    const vectorStore = await MemoryVectorStore.fromDocuments(
        splits,
        new OpenAIEmbeddings({ apiKey: process.env.OPENAI_API_KEY, model: "text-embedding-3-small", })
    );


    // const embeddings = new OpenAIEmbeddings({
    //     model: "text-embedding-3-small",
    //     apiKey:  
    // });

    // const vectorStore = new Chroma(embeddings, {
    //     collectionName: "a-test-collection",
    //     url: "http://localhost:8000", // Optional, will default to this value
    //     collectionMetadata: {
    //         "hnsw:space": "cosine",
    //     }, // Optional, can be used to specify the distance method of the embedding space https://docs.trychroma.com/usage-guide#changing-the-distance-function
    // });


    // Retrieve and generate using the relevant snippets of the blog.
    const retriever = vectorStore.asRetriever();
    // const prompt = await pull < ChatPromptTemplate > ("rlm/rag-prompt");
    const prompt = await hub.pull("rlm/rag-prompt");

    const llm = new ChatOpenAI({ model: "gpt-3.5-turbo", temperature: 0, apiKey: process.env.OPENAI_API_KEY });

    if (!prompt) {
        throw new Error("Failed to load prompt.");
    }

    if (!llm) {
        throw new Error("Failed to initialize ChatOpenAI.");
    }

    console.log(prompt);

    const ragChain = await createStuffDocumentsChain({
        llm,
        prompt,
        outputParser: new StringOutputParser(),
    });

    const retrievedDocs = await retriever.invoke("what is task decomposition");
    let answer = await ragChain.invoke({
        question: "What is task decomposition?",
        context: retrievedDocs,
    });
    console.log(answer);
    // return retrievedDocs
    return answer;
}

export default langchainAnswer