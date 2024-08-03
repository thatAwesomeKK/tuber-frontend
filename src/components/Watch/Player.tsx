"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

interface Props {
  videoID: string;
}

const Player = ({ videoID }: Props) => {
  const vidRef = useRef<HTMLVideoElement>(null);
  const [url, setUrl] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const changeVideo = (newSrc: string) => {
    if (!vidRef.current) return;
    const currentTime = vidRef.current?.currentTime;

    setIsTransitioning(true);
    setTimeout(() => {
      setUrl(newSrc);
      setTimeout(() => {
        if (vidRef.current) {
          vidRef.current.currentTime = currentTime;
        }
        setIsTransitioning(false);
      }, 100);
    }, 500);
  };

  return (
    <div className="w-full max-w-[1280px] flex justify-center bg-black">
      <video
        ref={vidRef}
        autoPlay
        src={url}
        controls
        className={`w-full ${isTransitioning ? "fade-out" : "fade-in"}`}
      ></video>
      <Button
        onClick={() =>
          changeVideo(
            `http://localhost:5000/api/video/stream?fileid=${videoID}&reso=640x360`
          )
        }
      >
        360
      </Button>
      <Button
        onClick={() =>
          changeVideo(
            `http://localhost:5000/api/video/stream?fileid=${videoID}&reso=426x240`
          )
        }
      >
        240
      </Button>
    </div>
  );
};

export default Player;
