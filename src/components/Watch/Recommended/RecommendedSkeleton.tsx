import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const RecommendedSkeleton = () => {
  const noOfSkeletons = 5;
  return (
    <div className="flex flex-col gap-4">
      {[...Array(noOfSkeletons)].map((_, i) => (
        <RecommendedSkeletonCards key={i} />
      ))}
    </div>
  );
};

const RecommendedSkeletonCards = () => {
  return (
    <div className="flex gap-2 w-96">
      <Skeleton className="w-48 h-28 rounded-3xl" />
      <div className="flex flex-col gap-1 mt-1 w-44">
        <Skeleton className="h-7 rounded-xl w-full" />
        <Skeleton className="h-10 w-32 rounded-xl" />
      </div>
    </div>
  );
};

export default RecommendedSkeleton;
