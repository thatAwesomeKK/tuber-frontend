"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch, SetStateAction, useState } from "react";
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { createComment, editComment } from "@/lib/apiCalls/server/comment";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { useUserStore } from "@/lib/store";
import { Comment } from "../../../typings";

const formSchema = z.object({
  comment: z.string(),
});

interface newComment {
  values: Comment;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  openModal: boolean;
}

const CommentForm = ({
  videoId,
  initialValues,
}: {
  videoId?: string;
  initialValues?: newComment;
}) => {
  const [loading, setLoading] = useState(false);
  const { user } = useUserStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: initialValues?.values.comment ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const payload = initialValues
      ? await editComment({
          videoId: initialValues.values.videoId,
          comment: values.comment,
        })
      : await createComment({ videoId, comment: values.comment });
    form.reset();
    setLoading(false);
    if (initialValues) initialValues.setOpenModal(!initialValues.openModal);
    toast.success(payload.message);
  }

  if (!user) return null;

  return (
    <div className="flex">
      <div className="relative w-10 h-10 rounded-full overflow-hidden mr-2">
        <Image fill src={user?.pfp} alt="" />
      </div>
      <Form {...form}>
        <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Comment here..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end items-center w-full mt-2 gap-2">
            <Button className="rounded-full" type="submit">
              {loading ? (
                <>
                  <Loader className="animate-spin" />
                </>
              ) : initialValues ? (
                "Edit Comment"
              ) : (
                "Comment" 
              )}
            </Button>
            {initialValues && (
              <Button
                className="rounded-full"
                onClick={() =>
                  initialValues.setOpenModal(!initialValues.openModal)
                }
                type="button"
              >
                Close
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CommentForm;
