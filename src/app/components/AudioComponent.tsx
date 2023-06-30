import React, { useEffect, useRef, useState } from "react";
import PlayIcon from "@/app/components/PlayIcon";

interface AudioComponentProps {
  src: string;
}

const AudioComponent: React.FC<AudioComponentProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
        setIsPlaying(false);
      }

      audioElement.src = src;

      if (isPlaying) {
        audioElement.play();
        setIsPlaying(true);
      }
    }
  }, [src, isPlaying]);

  const handlePlayPause = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div>
      <audio ref={audioRef}>
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <button
        className="group flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 p-4 text-app-purple hover:bg-app-purple"
        onClick={handlePlayPause}
      >
        <PlayIcon />
      </button>
    </div>
  );
};

export default AudioComponent;
