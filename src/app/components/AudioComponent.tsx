import React, { useEffect, useRef } from "react";
import PlayIcon from "@/app/components/PlayIcon";

interface AudioComponentProps {
  src: string;
}

const AudioComponent: React.FC<AudioComponentProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) audioElement.src = src;
  }, [src]);

  const playAudio = () => {
    const audioElement = audioRef.current;
    if (audioElement) audioElement.play();
  };

  return (
    <div>
      <audio ref={audioRef}>
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <button
        className="group flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 p-4 text-app-purple hover:bg-app-purple"
        onClick={playAudio}
      >
        <PlayIcon />
      </button>
    </div>
  );
};

export default AudioComponent;
