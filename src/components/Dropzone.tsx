"use client";
import { ArrowUpToLine, Loader2 } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Progress } from "./ui/progress";
import { uploadVideo } from "@/lib/apiCalls/video";

export default function Dropzone({ className }: { className: string }) {
  const [loading, setLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(async (acceptedFiles: any) => {
    setLoading(true);
    const fd = new FormData();
    fd.append("video", acceptedFiles[0]);
    const payload = await uploadVideo(fd, setUploadProgress);
    setLoading(false);
    if (payload.success === true) setIsComplete(true);
    window.location.href = `/upload?videoId=${payload.videoId}`;
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  return (
    <div {...getRootProps({ className })}>
      <input {...getInputProps()} />
      <div className="mx-5 flex flex-col justify-center items-center space-y-3">
        {isDragActive ? (
          <>
            <ArrowUpToLine className="h-20 w-20 text-gray-300" />
            <p className="text-justify">Drop the files here ...</p>
          </>
        ) : (
          <>
            {loading ? (
              <>
                <Loader2 className="h-20 w-20 text-gray-300 animate-spin" />
                <p className="text-justify">
                  Uploading Video, please wait ... (Don't refresh the page)
                </p>
                <Progress value={uploadProgress} />
              </>
            ) : (
              <>
                {isComplete ? (
                  <>
                    <p>Upload Complete (Redirecting....)</p>
                  </>
                ) : (
                  <>
                    <ArrowUpToLine className="h-20 w-20 text-gray-300" />
                    <p className="text-justify">
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
