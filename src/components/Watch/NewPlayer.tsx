"use client";
import React, {
  ChangeEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import ReactPlayer from "react-player";

const NewPlayer = ({ videoId }: { videoId: string }) => {
  const playerRef = useRef<any>();
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [url, setUrl] = useState("second")

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);

  const onChangeBitrate = (event: ChangeEvent<HTMLSelectElement>) => {
    const internalPlayer = playerRef.current?.getInternalPlayer("hls");
    if (internalPlayer) {
      internalPlayer.loadLevel = event.target.value;
    }
  };

  const onReady = (player: ReactPlayer) => {
    console.log("Player ready");
    const internalPlayer = player.getInternalPlayer("hls");
    const qualityLevels = internalPlayer.levels.map(
      (level: any) => level.height
    );
    setLevels(qualityLevels);
  };

  return (
    <>
      {!loading && (
        <ReactPlayer
          playing={true}
          onReady={onReady}
          ref={playerRef}
          url={videoId}
          controls
          config={{
            file: {
              forceHLS: true,
            },
          }}
        />
      )}
      Quality:
      <select onChange={onChangeBitrate}>
        {levels.map((level: any, id: any) => (
          <option key={id} value={id}>
            {level}
          </option>
        ))}
      </select>
    </>
  );
};

export default NewPlayer;
