import { useState, useEffect } from "react";

export default function MooviCharacter({ status }) {

  const [isPlayingVideo, setIsPlayingVideo] = useState(false); 
  const [videoSrc, setVideoSrc] = useState('/moovi-welcome.mp4');
  const staticImageSrc = '/moovi-static.png';

  useEffect(() => {

    let timer;

    switch (status) {
      case 'searching':
        setVideoSrc('/moovi-searching.mp4');
        setIsPlayingVideo(true); // Start playing the 'searching' video
        break;
      case 'success':
        setVideoSrc('/moovi-success.mp4');
        setIsPlayingVideo(true); // Start playing the 'success' video
        break;
      case 'welcome': 
        timer = setTimeout(() => {
          setVideoSrc('/moovi-welcome.mp4');
          setIsPlayingVideo(true);
        }, 500);
        break; // Now break is clearly used

      case 'idle':
      default:
        // When going back to idle, we just show the static image directly
        setIsPlayingVideo(false); 
        break;
    }

    return () => {
        if (timer) {
        clearTimeout(timer);
        }
    };
  }, [status]);

  const handleVideoEnd = () => {
    setIsPlayingVideo(false);
  };

  return (
    <div className="mt-5 h-50 w-50 md:h-70 md:w-70 flex items-center justify-center neon-border">
      {isPlayingVideo ? (
        <video
          key={videoSrc}
          width="w-max"
          height="h-max"
          className="rounded-2xl object-cover"
          autoPlay
          playsInline
          onEnded={handleVideoEnd} 
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          src={staticImageSrc}
          alt="Moovi, your friendly AI agent"
          className="w-max h-max rounded-2xl object-cover"
        />
      )}
    </div>
  );
}