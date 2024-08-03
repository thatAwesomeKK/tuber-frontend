import React from "react";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div className="flex justify-center items-center border rounded-full w-[40rem] px-4">
      <Input className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0" />
      <SearchIcon className="hover:cursor-pointer" />
    </div>
  );
};

export default Search;
