"use client";
import React, { useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { updateVideoMetadata } from "@/lib/apiCalls/video";
import Image from "next/image";

type VideoMetadata = {
  videoId: string;
  userId: string;
  title: string;
  description: string;
  thumbnail: string;
  likes: Array<string>;
};

interface Props {
  video: VideoMetadata;
}

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const UploadForm = ({ video }: Props) => {
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState<string | null>(video.thumbnail || null);
  const uploadThumbnailRef = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: video.title || "",
      description: video.description || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      await updateVideoMetadata({
        ...values,
        videoId: video.videoId,
        thumbnail,
      });
      setLoading(false);
    } catch (error) {
      setLoading(true);
    }
  }

  const addThumbnailToUpload = (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setThumbnail(readerEvent.target?.result! as string);
    };
  };

  return (
    <>
      <div
        className="cursor-pointer flex flex-col justify-center items-center"
        onClick={() => uploadThumbnailRef.current?.click()}
      >
        <div className="relative h-56 w-96 group overflow-hidden rounded-md border-2">
          <Image
            className="object-cover hover:scale-105 transition duration-150 ease-in-out"
            src={thumbnail || "/images/default-profile-photo.png"}
            alt=""
            fill={true}
          />
        </div>
        <p className="font-light text-lg">Select DP</p>
        <input
          ref={uploadThumbnailRef}
          hidden
          type="file"
          accept="image/x-png,image/jpeg,image/png,image/jpg"
          onChange={(e: any) => addThumbnailToUpload(e)}
        />
      </div>
      <Card>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 p-10 rounded-lg w-[87vw] lg:w-[25vw]"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} type="submit">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
              Update
            </Button>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default UploadForm;
