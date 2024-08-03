import VideoFeed from "@/components/Settings/VideoFeed";
import React from "react";

const Settings = () => {
  return (
    <main className="max-w-[94vw] mx-auto">
      <h1 className="font-extrabold text-4xl text-center my-5">Your Videos</h1>
      <VideoFeed />
    </main>
  );
};

export default Settings;
