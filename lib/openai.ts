import { OpenAI } from 'openai';

export const openAiApi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'MISSING OPENAI_API KEY',
});
