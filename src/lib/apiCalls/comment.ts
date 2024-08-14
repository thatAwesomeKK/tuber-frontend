const isServer = typeof window === "undefined";

const host_url = isServer
  ? process.env.CALLBACK_URL
  : process.env.NEXT_PUBLIC_CALLBACK_URL;
const base_url = `${host_url}/api/comment`;

export async function fetchCommentByVideo(videoId: string) {
  const payload = await fetch(`${base_url}/fetch-by-video/${videoId}`, {
    next: { tags: ["all-comments"] },
  }).then((res) => res.json());
  // const payload = await axios
  //   .get(`${base_url}/fetch-by-video/${videoId}`)
  //   .then((res) => res.data);
  return payload.comments;
}
