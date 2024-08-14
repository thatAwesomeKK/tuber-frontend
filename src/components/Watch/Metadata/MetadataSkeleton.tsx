import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const MetadataSkeleton = () => {
  return (
    <div className="mt-4">
      <Skeleton className="w-96 h-9" />
      <div className="flex items-center space-x-4 mt-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div>
        <Skeleton className="w-full h-16 mt-4" />
      </div>
    </div>
  );
};

export default MetadataSkeleton;
