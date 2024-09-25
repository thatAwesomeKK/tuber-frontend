import React, { useRef, useState } from "react";
import { Card } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { Video } from "../../../typings";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateVideoMetadata } from "@/lib/apiCalls/server/video";
import { toast } from "sonner";
import Image from "next/image";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.string(),
});

interface Props {
  video: Video;
}

const UpdateForm = ({ video }: Props) => {
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState<string | null>(
    video.thumbnail || null
  );

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
        video._id
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
                <Image
                  className="object-cover hover:scale-105 transition duration-150 ease-in-out"
                  src={thumbnail || "/images/default-profile-photo.png"}
                  alt=""
                  fill={true}
                />
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
    </div>
  );
};

export default UpdateForm;
