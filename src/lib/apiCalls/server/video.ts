"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const base_url = `${process.env.CALLBACK_URL}/api/video`;

export const updateVideoMetadata = async (payload: any, videoId: string) => {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("accessToken")?.value as string;

  const res = await fetch(`${base_url}/update-metadata/${videoId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  revalidateTag("user-vids");
  return data;
};

export const deleteVideo = async (videoId: string) => {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("accessToken")?.value as string;

  console.log("Deleting video with id", videoId);

  const payload = await fetch(`${base_url}/delete/${videoId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    credentials: "include",
  }).then((res) => res.json());
  revalidateTag("user-vids");
  return payload.message;
};
