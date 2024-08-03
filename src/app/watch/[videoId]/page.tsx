import NewPlayer from "@/components/Watch/NewPlayer";
import { getStreamUrl, getVideoMetadata } from "@/lib/apiCalls/video";
import React from "react";

interface PageProps {
  params: {
    videoId: string;
  };
}

export const dynamic = "force-dynamic";

const Watch = async ({ params }: PageProps) => {
  const videoId = params.videoId;
  const streamMetadata = await getVideoMetadata(videoId);

  return (
    <main>
      {/* <Player videoID={videoId} /> */}
      {streamMetadata.videoId && (
        <NewPlayer
          videoId={getStreamUrl(streamMetadata.videoId)}
        />
      )}
    </main>
  );
};

export default Watch;
