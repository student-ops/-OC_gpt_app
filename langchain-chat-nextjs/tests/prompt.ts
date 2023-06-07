import { PromptTemplate } from "langchain/prompts";
import { OpenAI } from "langchain/llms/openai";
import { LLMChain } from "langchain/chains";
import dotenv from 'dotenv';
dotenv.config();

async function main(){
  const template = "give me japanese response for following message {product}?";
  const prompt = new PromptTemplate({
    template: template,
    inputVariables: ["product"],
  });

  var key =process.env.OPENAI_API_KEY
  // console.log(key)
  const model = new OpenAI({ openAIApiKey: key, temperature: 0.9,streaming: true });
  const chain = new LLMChain({ llm: model, prompt: prompt });
  const res = await chain.call({ product: "colorful socks" });
  console.log(res);
}

main()

