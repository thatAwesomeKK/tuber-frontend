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
    // console.log(payload.toString("Int8Array"));
    if (!payload) return;
    const CHUNK_SIZE = 10 * 1024 * 1024; // 10MB

    const fileName = `${Date.now()}`;
    const totalChunks = Math.ceil(payload.size / CHUNK_SIZE);
    for (let i = 0; i < totalChunks; i++) {
      const start = i * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, payload.size);
      const chunk = payload.slice(start, end);

      const formData = new FormData();
      formData.append("video", chunk, fileName);

      try {
        await axios.post(`${base_url}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });
        setUploadProgress(Math.round(((i + 1) / totalChunks) * 100));
        console.log(`Chunk ${i + 1}/${totalChunks} uploaded successfully`);
      } catch (err) {
        console.error("Error uploading chunk", err);
        return err.response.data;
      }
    }
    const res = await axios.post(
      `${base_url}/upload-complete`,
      {
        originalname: fileName,
        uploadId: localStorage.getItem("uploadId")
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export const fetchAllVideos = async () => {
  const payload = await fetch(`${base_url}/fetch`, {
    method: "GET",
    next: { revalidate: 60 },
  }).then((res) => res.json());
  return payload.videos;
};

export const fetchVideoMetadata = async (
  videoId: string,
  accessToken: string
) => {
  const res = await fetch(`${base_url}/fetch-metadata/${videoId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    next: {tags: ["video-metadata"]},
  });
  const data = await res.json();
  return data;
};

export const fetchVideosByTag = async (videoId) => {
  const payload = await fetch(`${base_url}/fetch-by-tag/${videoId}`, {
    cache: "no-store",
  }).then((res) => res.json());
  return payload.videos;
};

export const getStreamUrl = async (videoId: string) => {
  const payload = await fetch(`${base_url}/stream?fileid=${videoId}`, {
    cache: "no-store",
  }).then((res) => res.json());
  return payload;
};

export const getVideoMetadata = async (videoId: string) => {
  const payload = await fetch(`${base_url}/fetch-metadata/${videoId}`).then(
    (res) => res.json()
  );
  return payload;
};

export const handleViewCount = async (videoId: string) => {
  const res = await fetch(`${base_url}/handle-view-count/${videoId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

export const handleLike = async (videoId: string) => {
  const res = await fetch(`${base_url}/handle-like`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ videoId }),
  });
  const data = await res.json();
  return data;
};

export const handleDislike = async (videoId: string) => {
  const res = await fetch(`${base_url}/handle-dislike`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ videoId }),
  });
  const data = await res.json();
  return data;
};
