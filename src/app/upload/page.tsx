import Dropzone from "@/components/Dropzone";
import UploadForm from "@/components/Forms/UploadForm";
import { fetchVideoMetadata } from "@/lib/apiCalls/video";
import { cookies } from "next/headers";
import React from "react";

export const dynamic = "force-dynamic";

const Upload = async ({
  searchParams,
}: {
  searchParams: { videoId: string };
}) => {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("accessToken")?.value as string;
  const videoId = searchParams.videoId;
  const videoPayload = await fetchVideoMetadata(videoId, accessToken);

  if (videoPayload.success === true) {
    return (
      <main className="flex flex-col justify-center items-center space-y-3">
        <h1 className="font-bold text-6xl mb-4">Add Details</h1>
        <UploadForm video={videoPayload.video} />
      </main>
    );
  }

  return (
    <main className="flex flex-col justify-center items-center h-[93vh] space-y-3">
      <h1 className="font-bold text-6xl mb-4">Upload Video</h1>
      <div>
        <div className="mb-3">
          <Dropzone className="border border-dashed py-6 flex justify-center items-center rounded-2xl" />
        </div>
        {/* <UploadForm video={videoPayload.video} /> */}
      </div>
    </main>
  );
};

export default Upload;
