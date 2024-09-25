import axios from "axios";
import { Playlist } from "../../../typings";

const isServer = typeof window === "undefined";
const host_url = isServer
  ? process.env.CALLBACK_URL
  : process.env.NEXT_PUBLIC_CALLBACK_URL;

const base_url = `${host_url}/api/playlist`;

export async function createPlaylist(payload: {
  name: string;
  videoId: string;
}) {
  const res = await fetch(`${base_url}/create`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return data.playlist;
}

export async function getPlaylistByUserId(accessToken?: string) {
  const payload = await fetch(`${base_url}/fetch-by-user`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store",
    next: { tags: ["user-playlists"] },
  }).then((res) => res.json());

  const playlists: Playlist[] = payload.playlist;

  return playlists;
}

export async function getPlaylistById(playlistId: string) {
  const payload = await fetch(`${base_url}/fetch-by-id/${playlistId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    next: { tags: ["user-playlist"] },
  }).then((res) => res.json());
  const playlist: Playlist = payload.playlist;
  return playlist;
}

export async function handlePlaylist(data: {
  playlistId: string;
  videoId: string;
}) {
  const payload = await axios
    .patch(
      `${base_url}/handle-vids/${data.playlistId}`,
      { videoId: data.videoId },
      {
        withCredentials: true,
      }
    )
    .then((res) => res.data);

  return payload;
}
