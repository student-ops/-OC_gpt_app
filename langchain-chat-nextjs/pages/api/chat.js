import { PromptTemplate } from "langchain/prompts";
import { OpenAI } from "langchain/llms/openai";
import { LLMChain } from "langchain/chains";
import dotenv from 'dotenv';
dotenv.config();

// To enable streaming, we pass in `streaming: true` to the LLM constructor.
// Additionally, we pass in a handler for the `handleLLMNewToken` event.
async function orgchat(message) {
  const template = "give me japanese response for following message {product}?";
  const prompt = new PromptTemplate({
    template: template,
    inputVariables: ["product"],
  });

  var key = process.env.OPENAI_API_KEY
  // console.log(key)
  const model = new OpenAI({ openAIApiKey: key, temperature: 0.9, streaming: true });
  const chain = new LLMChain({ llm: model, prompt: prompt });
  const res = await chain.call({ product: message });
  return res
}
export default async function (req, res) {
  var message = ""
  if (req.body.question >= 512) {
    message = "Your message is too long. Please try again with shorter message."
  }
  else {
    message = await orgchat(req.body.question)
  }
  // console.log(message)
  const data = {
    result: {
      success: message.text,
      error: null
    }
  }

  res.status(200).json(data)
}