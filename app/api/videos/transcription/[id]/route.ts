import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import axios from 'axios';
import { z } from 'zod';
import { openAiApi } from '@/lib/openai';
import { toFile } from 'openai/uploads';

const paramsSchema = z.object({
  id: z.string().uuid(),
});
const bodySchema = z.object({
  prompt: z.string(),
});
export async function POST(
  request: Request,
  context: { params: { id: string } }
) {
  const body = await request.json();
  try {
    const { id } = paramsSchema.parse(context.params);
    const { prompt } = bodySchema.parse(body);

    const video = await prisma.video.findUniqueOrThrow({ where: { id } });

    const { data } = await axios.get(video.path, {
      responseType: 'arraybuffer',
    });
    const file = await toFile(Buffer.from(data), 'audio.mp3');

    const transcription = await openAiApi.audio.transcriptions.create({
      file: file,
      model: 'whisper-1',
      language: 'en',
      response_format: 'json',
      temperature: 0.1,
      prompt,
    });

    return NextResponse.json({ id, prompt, transcription }, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
