"use client";
import {
  Maximize,
  Pause,
  Play,
  Settings,
  Volume2,
  VolumeX,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";
import { Slider } from "../ui/slider";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useDetectClickOutside } from "react-detect-click-outside";
import screenfull from "screenfull";
import { handleViewCount } from "@/lib/apiCalls/video";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

const NewPlayer = ({ videoId, id }: { videoId: string; id: string }) => {
  const playerRef = useRef<any>();
  const playerContainerRef = useRef<any>();
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState<boolean>(true);
  const [played, setPlayed] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [per30, setPer30] = useState(0);
  const [viewCount, setViewCount] = useState(true);
  const [buffered, setBuffered] = useState(0);

  console.log(videoId);
  

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setVolume(volume / 100);
    }, 0);
  }, []);

  const onChangeBitrate = (qualityLevel: string) => {
    console.log("Quality level", qualityLevel);

    const internalPlayer = playerRef.current?.getInternalPlayer("hls");
    if (internalPlayer) {
      internalPlayer.nextLevel = qualityLevel;
    }
  };

  const onPlayPause = () => {
    setPlaying(!playing);
  };

  const onProgress = (e: OnProgressProps) => {
    const playedSeconds = e.played * 100;
    if (playedSeconds >= per30 && viewCount) {
      setViewCount(false);
      console.log("30% of video watched");
      handleViewCount(id);
    }
    setPlayed(playedSeconds);

    setBuffered(
      (playerRef.current?.getSecondsLoaded() /
        playerRef.current?.getDuration()) *
        100
    );
  };

  const onSeekChange = (value: number[]) => {
    playerRef.current?.seekTo(value[0] / 100);
    setPlayed(value[0]);
  };

  const onMute = () => {
    setVolume(muted ? 100 / 100 : 0);
    setMuted(!muted);
  };

  const onVolumeChange = (value: number[]) => {
    if (value[0] === 0) {
      setMuted(true);
    } else {
      setMuted(false);
      setVolume(value[0] / 100);
    }
  };

  const toggleFullscreen = () => {
    screenfull.toggle(playerContainerRef.current);
  };

  const format = (seconds: number) => {
    if (isNaN(seconds)) return "00:00";

    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    if (hh) return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
    return `${mm}:${ss}`;
  };

  const currentTime = playerRef.current?.getCurrentTime() || "00:00";
  const duration = playerRef.current?.getDuration() || "00:00";

  const elapsedTime = format(currentTime);
  const totalDuration = format(duration);

  const onReady = (player: ReactPlayer) => {
    console.log("Player ready");
    const internalPlayer = player.getInternalPlayer("hls");
    const qualityLevels = internalPlayer.levels.map(
      (level: any) => level.height
    );
    setLevels(qualityLevels);
  };

  const onDuration = (totalDuration: number) => {
    const per30 = totalDuration * (30 / 100);
    setPer30(per30);
  };

  return (
    <div
      ref={playerContainerRef}
      className="relative w-full h-fit group/player rounded-xl overflow-hidden shadow-xl flex justify-center items-center"
    >
      {!loading && (
        <>
          <ReactPlayer
            height={"120%"}
            width={"100%"}
            playing={playing}
            onReady={onReady}
            ref={playerRef}
            url={videoId}
            onProgress={onProgress}
            onDuration={onDuration}
            muted={muted}
            volume={volume}
            config={{
              file: {
                forceHLS: true,
              },
            }}
          />

          <PlayerControls
            buffered={buffered}
            volume={volume}
            className={`group-hover/player:opacity-100 opacity-0 transition-opacity duration-300 bg-gradient-to-t from-black/50 shadow-xl`}
            played={played}
            playing={playing}
            levels={levels}
            onChangeBitrate={onChangeBitrate}
            onPlayPause={onPlayPause}
            onSeekChange={onSeekChange}
            muted={muted}
            onMute={onMute}
            onVolumeChange={onVolumeChange}
            toggleFullscreen={toggleFullscreen}
            elapsedTime={elapsedTime}
            totalDuration={totalDuration}
          />
        </>
      )}
    </div>
  );
};

interface PlayerControlsProps {
  elapsedTime: string;
  totalDuration: string;
  volume: number;
  className?: string;
  played: number;
  playing: boolean;
  levels: Array<string>;
  muted: boolean;
  buffered: number;
  onChangeBitrate: (qualityLevel: string) => void;
  onPlayPause: () => void;
  onSeekChange: (value: number[]) => void;
  onMute: () => void;
  onVolumeChange: (value: number[]) => void;
  toggleFullscreen: () => void;
}

const PlayerControls = ({
  elapsedTime,
  totalDuration,
  volume,
  muted,
  className,
  buffered,
  played,
  playing,
  levels,
  onChangeBitrate,
  onPlayPause,
  onSeekChange,
  onMute,
  onVolumeChange,
  toggleFullscreen,
}: PlayerControlsProps) => {
  const [qualitySettingOpen, setQualitySettingOpen] = useState(false);
  const outref = useDetectClickOutside({
    onTriggered: () => setQualitySettingOpen(false),
  });

  const [selectedLevel, setSelectedLevel] = useState(0);

  return (
    <>
      {/* On Player Play Pause Effect */}
      <div
        onClick={() => onPlayPause()}
        className="absolute text-white h-full w-full top-0 flex justify-center items-center"
      >
        {playing ? (
          <Play
            fill="white"
            className={"w-28 h-28 opacity-0 animate-fade-in-out"}
          />
        ) : (
          <Pause
            fill="white"
            className={"w-28 h-28 opacity-0 animate-fade-in-out"}
          />
        )}
      </div>
      {/* Main Player Controls */}
      <div
        className={cn(
          className,
          "absolute bottom-0 flex items-center justify-between w-full px-5 py-4"
        )}
      >
        <div className="text-white flex gap-2">
          {/* Play Pause button */}
          <div className="hover:cursor-pointer" onClick={() => onPlayPause()}>
            {playing ? <Pause fill="white" /> : <Play fill="white" />}
          </div>
          {/* Volume Button */}
          <div className="hover:cursor-pointer flex gap-2 group/volume">
            <div onClick={onMute}>{muted ? <VolumeX /> : <Volume2 />}</div>
            <Slider
              defaultValue={[volume]}
              onValueChange={onVolumeChange}
              className="w-0 opacity-0 group-hover/volume:w-32 group-hover/volume:opacity-100 transition-all duration-400"
            />
          </div>
        </div>
        {/* Time Controls */}
        <div>
          <p className="text-white w-20 mx-2">
            {elapsedTime}/{totalDuration}
          </p>
        </div>
        {/* Seek Controls & Playback */}
        <div className="w-full px-5 relative">
          <Slider
            className="z-50 bg-none"
            value={[played]}
            min={0}
            max={100}
            step={1}
            onValueChange={onSeekChange}
          />
          <Progress className="absolute w-[94.5%] h-2 top-0" value={buffered} />
        </div>
        {/* Quality & Fullscreen Controls */}
        <div className="flex gap-2">
          <div className="relative">
            <Settings
              className="text-white"
              onClick={() => setQualitySettingOpen(!qualitySettingOpen)}
            />
            {qualitySettingOpen && (
              <>
                <ul
                  ref={outref}
                  className="bg-background rounded-md absolute bottom-8 right-1 w-44 overflow-hidden animate-fade-in"
                >
                  <p className="py-2.5 px-2 font-semibold">Quality</p>
                  <div className="flex justify-center items-center mb-1">
                    <Separator />
                  </div>
                  <div className="flex flex-col space-y-1">
                    {levels.map((level, i) => (
                      <>
                        <li
                          key={i}
                          className="flex justify-center items-center"
                        >
                          <Button
                            variant="ghost"
                            className={cn(
                              i == selectedLevel ? "bg-accent/40" : "",
                              "w-[98%] text-sm rounded-sm"
                            )}
                            onClick={() => {
                              setSelectedLevel(i);
                              onChangeBitrate(i.toString());
                              setQualitySettingOpen(!qualitySettingOpen);
                            }}
                          >
                            {level}p
                          </Button>
                        </li>
                        <div className="flex justify-center items-center">
                          <Separator className="w-[90%]" />
                        </div>
                      </>
                    ))}
                  </div>
                </ul>
              </>
            )}
          </div>
          <Maximize className="text-white" onClick={toggleFullscreen} />
        </div>
      </div>
    </>
  );
};

export default NewPlayer;
