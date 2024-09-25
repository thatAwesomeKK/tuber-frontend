"use client";
import { ArrowUpToLine, Loader2 } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Progress } from "./ui/progress";
import { uploadVideo } from "@/lib/apiCalls/video";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { socket } from "@/lib/socket";

export default function Dropzone({ className }: { className: string }) {
  const [loading, setLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const router = useRouter();

  const onDrop = useCallback(async (acceptedFiles: any) => {
    setLoading(true);
    const payload = await uploadVideo(acceptedFiles[0], setUploadProgress);

    setLoading(false);
    if (payload.success === true) {
      setIsComplete(true);
      window.location.href = `/upload?videoId=${payload.id}`;
    } else {
      toast.error(payload.message);
      router.back();
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      socket.emit("connect-client")
    }

    function onDisconnect() {
      console.log("Socket disconnected!");
    }

    function onConnected(payload: any) {
      console.log(payload);
      const uploadId = payload.uploadId;

      localStorage.setItem("uploadId", uploadId);
    }

    socket.on("connected", onConnected);
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

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
                    <ArrowUpToLine className="h-20 w-20" />
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
