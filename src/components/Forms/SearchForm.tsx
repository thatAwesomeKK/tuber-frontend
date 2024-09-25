"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem } from "../ui/form";

const formSchema = z.object({
  searchQuery: z.string(),
});

const SearchForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(`/search/${values.searchQuery}`);
  }
  return (
    // <div className="flex justify-center items-center border rounded-full w-[40rem] px-4">
    <Form {...form}>
      <form
        className="flex justify-center items-center border rounded-full w-[40rem] px-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <SearchIcon className="hover:cursor-pointer" type="submit" />
      </form>
    </Form>
    // </div>
  );
};

export default SearchForm;
