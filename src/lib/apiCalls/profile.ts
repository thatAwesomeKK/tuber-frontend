const isServer = typeof window === "undefined";

const host_url = isServer
  ? process.env.CALLBACK_URL
  : process.env.NEXT_PUBLIC_CALLBACK_URL;
const base_url = `${host_url}/api/user`;

export const fetchUser = async () => {
  try {
    const payload = await fetch(`${base_url}/fetch`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    return payload;
  } catch (error) {
    console.log(error);
  }
};

export const fetchVideos = async (accessToken: string) => {
  try {
    const payload = await fetch(`${base_url}/videos`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      next: { tags: ["user-vids"] },
    }).then((res) => res.json());

    return payload.videos;
  } catch (error) {
    console.log(error);
  }
};
