'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { useUploadThing } from '@/utils/uploadthing';
import { FileVideo, Loader, Upload, Wand2 } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);

  const { startUpload, permittedFileInfo, isUploading } = useUploadThing(
    'videoUploader',
    {
      onClientUploadComplete: (res) => {
        console.log('>>>  ~ Home ~ res:', res);

        alert('uploaded successfully!');
      },
      onUploadError: (e) => {
        alert('error occurred while uploading');
      },
      onUploadBegin: () => {},
      onBeforeUploadBegin: (filed) => {
        return files;
      },
    }
  );
  return (
    <main className='flex flex-1 h-full gap-6 overflow-hidden'>
      <div className='flex flex-1 flex-col p-6 pr-0 gap-4'>
        <div className='grid h-full flex-1 grid-rows-2 gap-4'>
          <Textarea
            className='resize-none p-5 leading-relaxed'
            placeholder='Add you prompt here...'
          />
          <Textarea
            className='resize-none p-5 leading-relaxed'
            placeholder='The result from the AI yill be displayed here...'
            readOnly
          />
        </div>
        <span className='text-sm text-muted-foreground'>
          Note: You can use{' '}
          <code className='rounded border bg-primary-foreground/20 px-1 text-primary'>
            {'{transcripton}'}
          </code>{' '}
          in your prompt to use the transcripted data from the selected video.
        </span>
      </div>
      <aside className='w-80 flex flex-col gap-y-6 p-6 pl-0 overflow-auto scrollbar scrollbar-w-2 scrollbar-thumb-rounded-full scrollbar-thumb-primary/20 '>
        <form id='video-form' className='relative flex flex-col gap-y-6'>
          <Label
            className='flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed text-sm hover:bg-primary-foreground transition-colors'
            htmlFor='video'
          >
            <FileVideo className='h-4 w-4' />
            Upload Video
          </Label>
          <Input
            type='file'
            id='video'
            accept='audio/*'
            className='sr-only'
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
          />

          <Separator />

          <div className='flex flex-col gap-y-2'>
            <Label htmlFor='transcription-prompt'>Transcription promp</Label>
            <Textarea
              id='transcription-prompt'
              className='resize-none h-20 leading-relaxed'
              placeholder='Add keywords mentioned in the video. Must be comma separated...'
            />
          </div>
          <Button
            type='submit'
            className='w-full'
            disabled={isUploading || files.length <= 0}
            onClick={(ev) => {
              ev.preventDefault();
              startUpload(files);
            }}
          >
            {isUploading ? (
              <>
                <Loader className='w-4 h-4 mr-2 animate-spin animate' />{' '}
                Uploading...
              </>
            ) : (
              <>
                <Upload className='w-4 h-4 mr-2' /> Send video
              </>
            )}
          </Button>
        </form>
        <Separator />
        <form id='ai-form' className='flex flex-col gap-y-6 '>
          <div className='flex flex-col gap-y-2'>
            <Label>Prompt</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder='Select a prompt...' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='yt-title'>Youtube title</SelectItem>
                <SelectItem value='yt-description'>
                  Youtube description
                </SelectItem>
              </SelectContent>
            </Select>
            <span className='text-xs text-muted-foreground italic'>
              You will be able select a model later.
            </span>
          </div>
          <Separator />
          <div className='flex flex-col gap-y-2'>
            <Label>AI Model</Label>
            <Select disabled defaultValue='gpt3.5-turbo'>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='gpt0.5-turbo'>GPT 0.5-turbo 1k</SelectItem>
                <SelectItem value='gpt1.5-turbo'>GPT 1.5-turbo 4k</SelectItem>
                <SelectItem value='gpt2.5-turbo'>GPT 2.5-turbo 8k</SelectItem>
                <SelectItem value='gpt3.5-turbo'>GPT 3.5-turbo 16k</SelectItem>
              </SelectContent>
            </Select>
            <span className='text-xs text-muted-foreground italic'>
              You will be able select a model later.
            </span>
          </div>
          <Separator />
          <div className='flex flex-col gap-y-4'>
            <Label>Temperature</Label>
            <Slider min={0} max={1} step={0.1} />
            <span className='text-xs text-muted-foreground italic'>
              Higher temperature means more creative, but less accurate results.
            </span>
          </div>
          <Separator />
          <Button type='submit' className='w-full'>
            Run AI
            <Wand2 className='w-4 h-4 ml-2' />
          </Button>
        </form>
      </aside>
    </main>
  );
}
