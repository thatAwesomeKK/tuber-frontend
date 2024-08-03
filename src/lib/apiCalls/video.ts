import axios from "axios";
const isServer = typeof window === "undefined";

let host_url;

if (isServer) host_url = process.env.CALLBACK_URL;
else host_url = process.env.NEXT_PUBLIC_CALLBACK_URL;
const base_url = `${host_url}/api/video`;

export const uploadVideo = async (
  payload: any,
  setUploadProgress: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const res = await axios.post(`${base_url}/upload`, payload, {
      withCredentials: true,
      onUploadProgress: (progressEvent) => {
        setUploadProgress(
          Math.round((progressEvent.loaded / progressEvent.total!) * 100)
        );
        console.log(progressEvent.loaded, progressEvent.total);
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllVideos = async () => {
  const payload = await fetch(`${base_url}/fetch`, {
    method: "GET",
  }).then((res) => res.json());
  return payload.videos;
};

export const fetchVideoMetadata = async (
  videoId: string,
  accessToken: string
) => {
  const res = await fetch(`${base_url}/fetch-metadata`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify({ videoId }),
  });
  const data = await res.json();
  return data;
};

export const updateVideoMetadata = async (payload: any) => {
  const res = await fetch(`${base_url}/metadata`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return data;
};

export const deleteVideo = async (videoId: string) => {
  const payload = await fetch(`${base_url}/delete/${videoId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => res.json());
  console.log(payload);

  return payload.message;
};

export const getVideoMetadata = async (videoId: string) => {
  const payload = await fetch(`${base_url}/stream-metadata?fileid=${videoId}`, {
    cache: "no-store",
  }).then((res) => res.json());
  return payload;
};

export const getStreamUrl = (videoId: string) => {
  return `${base_url}/stream/${videoId}`;
};
