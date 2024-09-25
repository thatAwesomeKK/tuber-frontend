import DeleteFromPlaylist from "@/components/Playlist/DeleteFromPlaylist";
import VideoComponent from "@/components/Playlist/VideoComponent";
import { getPlaylistById } from "@/lib/apiCalls/playlist";
import Link from "next/link";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const Playlist = async ({ params: { id } }: Props) => {
  const playlist = await getPlaylistById(id);
  if (!playlist) return null;

  return (
    <div className="flex flex-col space-y-7">
      {playlist.videoIds.map((video: any, i) => (
        <div key={video._id} className="relative">
          <Link href={`/watch/${video._id}`} key={video._id}>
            <VideoComponent key={i} video={video} />
          </Link>
          <DeleteFromPlaylist videoId={video._id} playlistId={playlist._id} />
        </div>
      ))}
    </div>
  );
};

export default Playlist;
