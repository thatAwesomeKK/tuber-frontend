"use server";
import axios from "axios";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const base_url = `${process.env.CALLBACK_URL}/api/playlist`;

export const deletePlaylist = async (playlistId: string) => {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("accessToken")?.value as string;

  const payload = await axios
    .delete(`${base_url}/delete/${playlistId}`, {
      withCredentials: true,
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    })
    .then((res) => res.data);
  revalidateTag("user-playlists");
  return payload;
};

export async function handlePlaylist(data: {
  playlistId: string;
  videoId: string;
}) {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("accessToken")?.value as string;

  const payload = await axios
    .patch(
      `${base_url}/handle-vids/${data.playlistId}`,
      { videoId: data.videoId },
      {
        headers: { Cookie: `accessToken=${accessToken}` },
        withCredentials: true,
      }
    )
    .then((res) => res.data);
  revalidateTag("user-playlist");
  return payload;
}
