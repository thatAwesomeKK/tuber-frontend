import { Skeleton } from "@/components/ui/skeleton";
import MetadataSkeleton from "@/components/Watch/Metadata/MetadataSkeleton";
import RecommendedSkeleton from "@/components/Watch/Recommended/RecommendedSkeleton";

export default function Loading() {
  return (
    <main className="flex gap-10">
      <div className="flex-[3]">
        <Skeleton className="w-full h-[120%] rounded-3xl shadow-2xl" />
        <MetadataSkeleton/>
      </div>
      <div className="flex-[1]">
        <RecommendedSkeleton />
      </div>
    </main>
  );
}
