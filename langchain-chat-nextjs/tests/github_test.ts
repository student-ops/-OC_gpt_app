import { OpenAI } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { GithubRepoLoader } from "langchain/document_loaders/web/github";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";

async function main() {
  const loader = new GithubRepoLoader(
    "https://github.com/hwchase17/langchainjs",
    { branch: "main", recursive: false, unknown: "warn" }
  );
  const docs = await loader.load();
  const chat = new OpenAI({ temperature: 0 });
  const memory = new BufferMemory();
  // const chain = new ConversationChain({ llm: chat, memory: memory });
  console.log(docs)
  
  // Now you can start a conversation with the chatbot by calling the chain's `call` method with a user input.
  // const message = new HumanChatMessage(docs);
  // const response = await chat.call([message]);

}

main();