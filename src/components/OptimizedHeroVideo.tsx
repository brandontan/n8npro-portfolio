import { useState, useRef, useEffect } from 'react';

interface OptimizedHeroVideoProps {
  className?: string;
}

export const OptimizedHeroVideo = ({ className }: OptimizedHeroVideoProps) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Only load video after initial page load and user interaction
    const timer = setTimeout(() => setShouldLoad(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoLoad = () => {
    setIsLoaded(true);
  };

  const handleVideoError = () => {
    console.warn('Hero video failed to load');
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {shouldLoad ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20 animate-pulse" />
          )}
        </>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-primary/20 via-background to-accent/20 animate-pulse" />
      )}
    </div>
  );
};