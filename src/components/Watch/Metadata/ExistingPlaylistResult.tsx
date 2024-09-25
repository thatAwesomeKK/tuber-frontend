import { getPlaylistByUserId, handlePlaylist } from "@/lib/apiCalls/playlist";
import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { toast } from "sonner";
import { Loader } from "lucide-react";

interface Props {
  videoId: string;
}

const ExistingPlaylist = ({ videoId }: Props) => {
  const { data: playlists, isLoading } = useQuery({
    queryKey: ["user-playlists"],
    queryFn: () => getPlaylistByUserId(),
  });

  if (isLoading) return <Loader className="animate-spin" />;
  if (!playlists) return null;

  return (
    <div className="flex flex-col gap-3">
      {playlists?.map((playlist) => (
        <PlaylistCard
          key={playlist._id}
          playlist={playlist}
          videoId={videoId}
        />
      ))}
    </div>
  );
};

const PlaylistCard = ({ playlist, videoId }) => {
  const [playlistExist, setPlaylistExist] = useState(
    playlist.videoIds.includes(videoId)
  );
  const { mutateAsync } = useMutation({
    mutationFn: handlePlaylist,
    onSettled: (data) => {
      toast.success(data.message);
    },
  });

  const addDeletePlaylist = async (e: CheckedState) => {
    setPlaylistExist(!playlistExist);
    await mutateAsync({
      playlistId: playlist._id,
      videoId: videoId,
    });
  };

  return (
    <div className="flex justify-between items-center hover:bg-secondary px-4 mx-3 py-2 rounded-md">
      <Checkbox checked={playlistExist} onCheckedChange={addDeletePlaylist} />
      <p>{playlist.name}</p>
    </div>
  );
};

export default ExistingPlaylist;
