"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const base_url = `${process.env.CALLBACK_URL}/api/comment`;

export const createComment = async (payload: {
  videoId: string;
  comment: string;
}) => {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("accessToken")?.value as string;

  const res = await fetch(`${base_url}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    credentials: "include",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
  revalidateTag("all-comments");
  return res;
};

export const deleteComment = async (videoId: string) => {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("accessToken")?.value as string;

  const res = await fetch(`${base_url}/delete/${videoId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    credentials: "include",
  }).then((res) => res.json());
  revalidateTag("all-comments");
  return res;
};

export const editComment = async (payload: {
  videoId: string;
  comment: string;
}) => {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("accessToken")?.value as string;

  const res = await fetch(`${base_url}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    credentials: "include",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
  revalidateTag("all-comments");
  return res;
};
