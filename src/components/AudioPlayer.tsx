import React, { useState, useRef, useEffect } from 'react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      // Attempt to autoplay on mount
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(e => {
        console.log("Autoplay blockeado pelo navegador:", e);
        // If browser blocks it, gracefully fallback to muted state
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log('Audio play failed', e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed top-6 right-6 md:top-8 md:right-8 z-[100]">
      <button 
        onClick={togglePlay}
        className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full backdrop-blur-md shadow-lg transition-all hover:scale-105"
        style={{
          background: 'rgba(251, 247, 237, 0.5)',
          border: '1px solid rgba(251, 247, 237, 0.4)',
          color: isPlaying ? '#28616a' : '#5f7477'
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#d7b36c')}
        onMouseLeave={e => (e.currentTarget.style.color = isPlaying ? '#28616a' : '#5f7477')}
        aria-label="Toggle ambient music"
      >
        {isPlaying ? (
          // Speaker ON icon
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6 md:w-7 md:h-7">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
          </svg>
        ) : (
          // Speaker OFF / Muted icon
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6 md:w-7 md:h-7">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        )}
      </button>
      {/* Calm, relaxing classical ambient music */}
      <audio 
        ref={audioRef} 
        loop 
        src="/Constellation - Shuta Yasukochi.mp3" 
        preload="metadata"
      />
    </div>
  );
};
