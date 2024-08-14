import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const { videoId } = await req.json();
  console.log(videoId);

  revalidateTag("video-metadata");

  return Response.json({ message: "Thumbnail Published" });
}
