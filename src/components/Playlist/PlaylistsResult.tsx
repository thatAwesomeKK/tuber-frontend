import { getPlaylistByUserId } from "@/lib/apiCalls/playlist";
import Link from "next/link";
import React from "react";
import ActionButtons from "./ActionButtons";

interface Props {
  accessToken: string;
}

const PlaylistsResult = async ({ accessToken }: Props) => {
  const playlists = await getPlaylistByUserId(accessToken);

  return (
    <div className="w-[80%] mx-auto">
      <h1 className="text-5xl font-bold mb-6">Playlists</h1>
      <div>
        {playlists.map((playlist) => (
          <div
            key={playlist._id}
            className="hover:bg-secondary flex items-center justify-center rounded-md overflow-hidden pr-2"
          >
            <Link className="w-full" href={`/playlist/${playlist._id}`}>
              <h2 className="font-medium text-xl pl-5 py-2.5 capitalize">
                {playlist.name}
              </h2>
            </Link>
            <ActionButtons playlistId={playlist._id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistsResult;
