import { convertToModelMessages, streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { MODEL, SYSTEM_PROMPT } from '../../../lib/ai-config';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: anthropic(MODEL),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}