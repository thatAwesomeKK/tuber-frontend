import { Skeleton } from "@/components/ui/skeleton";
import Comments from "@/components/Watch/Comments";
import Metadata from "@/components/Watch/Metadata";
import MetadataSkeleton from "@/components/Watch/Metadata/MetadataSkeleton";
import NewPlayer from "@/components/Watch/NewPlayer";
import Recommended from "@/components/Watch/Recommended";
import RecommendedSkeleton from "@/components/Watch/Recommended/RecommendedSkeleton";
import { getStreamUrl } from "@/lib/apiCalls/video";
import React, { Suspense } from "react";

interface PageProps {
  params: {
    videoId: string;
  };
}

export const dynamic = "force-dynamic";

const Watch = async ({ params }: PageProps) => {
  const videoId = params.videoId;
  const streamMetadata = await getStreamUrl(videoId);

  return (
    <main>
      <div className="flex gap-10">
        <div className="flex-[3]">
          <NewPlayer id={videoId} videoId={streamMetadata.videoLink} />
          <Suspense fallback={<MetadataSkeleton />}>
            <Metadata videoId={videoId} />
          </Suspense>
          <div className="mt-6">
            <Suspense fallback={<div>Comments Loading...</div>}>
              <Comments videoId={videoId} />
            </Suspense>
          </div>
        </div>
        <section className="flex-[1] mt-1">
          <h2 className="mb-2 font-bold text-xl">Recommended</h2>
          <Suspense fallback={<RecommendedSkeleton />}>
            <Recommended videoId={videoId} />
          </Suspense>
        </section>
      </div>
    </main>
  );
};

export default Watch;
