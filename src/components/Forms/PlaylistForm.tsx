"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../ui/button";
import { createPlaylist } from "@/lib/apiCalls/playlist";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

const formSchema = z.object({
  name: z.string(),
});

interface Props {
  videoId: string;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const PlaylistForm = ({ videoId, setOpenModal }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { refetch } = useQuery({
    queryKey: ["user-playlists"],
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createPlaylist,
    onSettled: () => {
      refetch();
      setOpenModal(false);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutateAsync({ name: values.name, videoId });
  }
  return (
    <div className="flex">
      <Form {...form}>
        <form
          className="flex justify-center items-center px-4 gap-3 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" variant="secondary">
            {isPending ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              "Create!"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PlaylistForm;
