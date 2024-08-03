import NewPlayer from "@/components/Watch/NewPlayer";
import React from "react";

interface PageProps {
  params: {
    videoId: string;
  };
}

export const dynamic = "force-dynamic";

const Watch = async ({ params }: PageProps) => {
  const videoId = params.videoId;
  const streamMetadata = await fetch(
    `http://localhost:5000/api/video/stream-metadata?fileid=${videoId}`,
    { cache: "no-store" }
  ).then((res) => res.json());

  return (
    <main>
      {/* <Player videoID={videoId} /> */}
      {streamMetadata.videoId && (
        <NewPlayer
          videoId={`http://localhost:5000/api/video/stream/${streamMetadata.videoId}`}
        />
      )}
    </main>
  );
};

export default Watch;
