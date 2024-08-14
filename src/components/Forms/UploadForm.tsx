"use client";
import React, { useEffect, useRef, useState } from "react";
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
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Loader2, Play } from "lucide-react";
import Image from "next/image";
import { updateVideoMetadata } from "@/lib/apiCalls/server/video";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { Video } from "../../../typings";
import { socket } from "@/lib/socket";

interface Props {
  video: Video;
}

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.string(),
});

const UploadForm = ({ video }: Props) => {
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState<string | null>(
    video.thumbnail || null
  );
  const [isPublished, setIsPublished] = useState<boolean>(video.isPublished);

  const uploadThumbnailRef = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: video.title || "",
      description: video.description || "",
      tags: video.tags.join(",") || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { title, description, tags } = values;
    try {
      setLoading(true);
      const payload = await updateVideoMetadata(
        {
          title,
          description,
          tags: tags.split(",").map((tag) => tag.trim()),
          thumbnail,
        },
        video.videoId
      );
      setLoading(false);
      toast.success(payload.message);
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

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      console.log("Socket Connected!");
      socket.emit("connect-upload-form", {
        uploadId: localStorage.getItem("uploadId"),
      });
    }

    function onDisconnect() {
      console.log("Socket disconnected!");
    }

    function onThumbnailUpload(payload: any) {
      const { thumbnail } = payload;
      setThumbnail(thumbnail);
    }

    function onVideoProcessComplete(payload: any) {
      console.log(payload.message);
      setIsPublished(true);
      socket.disconnect();
    }

    socket.on("video-thumbnail-complete", onThumbnailUpload);

    socket.on("video-process-complete", onVideoProcessComplete);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("video-process-complete", onVideoProcessComplete);
      socket.off("video-thumbnail-complete", onThumbnailUpload);
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div className="flex">
      <Card className="flex p-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div
              className="cursor-pointer flex flex-col justify-center items-center rounded-lg"
              onClick={() => uploadThumbnailRef.current?.click()}
            >
              <div className="h-56 w-96 border-2 relative flex justify-center items-center overflow-hidden rounded-lg">
                <div className="relative w-full h-full group">
                  <Image
                    className={`${
                      isPublished ? "opacity-100" : "opacity-40"
                    } object-cover hover:scale-105 transition duration-150 ease-in-out`}
                    src={thumbnail || "/images/default-profile-photo.png"}
                    alt=""
                    fill={true}
                  />
                </div>
                {!isPublished && (
                  <Loader2 className="w-40 h-40 absolute animate-spin" />
                )}
              </div>
              <input
                ref={uploadThumbnailRef}
                hidden
                type="file"
                accept="image/x-png,image/jpeg,image/png,image/jpg"
                onChange={(e: any) => addThumbnailToUpload(e)}
              />
            </div>
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
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tags" {...field} />
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
      {/* <Card className="p-10">
        <div className="relative flex justify-center items-center group flex-col">
          <Play className="absolute w-16 h-16 text-white z-40 opacity-0 group-hover:opacity-90 transition-opacity duration-200 ease-out" />
          <div className="relative h-56 w-96 group overflow-hidden rounded-md border-2">
            <Image
              className="object-cover hover:scale-105 transition duration-150 ease-in-out"
              src={thumbnail || "/images/default-profile-photo.png"}
              alt=""
              fill={true}
            />
          </div>
          {isPublished ? <p>Published</p> : <p>Processing....</p>}
        </div>
      </Card> */}
    </div>
  );
};

export default UploadForm;
