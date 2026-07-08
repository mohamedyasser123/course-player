import { useState, useEffect, useRef } from 'react';
import {
  Box,
  IconButton,
  Slider,
  Typography,
  Stack,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';

interface VideoPlayerProps {
  isWide: boolean;
  onToggleWide: () => void;
}

function formatTime(seconds: number) {
  if (isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function VideoPlayer({ isWide, onToggleWide }: VideoPlayerProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isSticky, setIsSticky] = useState(false);

  // --- Mobile sticky scroll ---
  useEffect(() => {
    if (!isMobile) {
      setIsSticky(false);
      return;
    }
    const onScroll = () => {
      if (placeholderRef.current) {
        setIsSticky(placeholderRef.current.getBoundingClientRect().top < 0);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMobile]);

  // --- Auto-hide controls after 3s when playing ---
  useEffect(() => {
    if (!isPlaying) { setShowControls(true); return; }
    const t = setTimeout(() => setShowControls(false), 3000);
    return () => clearTimeout(t);
  }, [isPlaying, currentTime]);

  // --- Handlers ---
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleSeek = (_: Event, value: number | number[]) => {
    const t = value as number;
    if (videoRef.current) { videoRef.current.currentTime = t; setCurrentTime(t); }
  };

  const handleVolumeChange = (_: Event, value: number | number[]) => {
    const v = value as number;
    setVolume(v);
    if (videoRef.current) {
      videoRef.current.volume = v;
      videoRef.current.muted = v === 0;
      setIsMuted(v === 0);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const next = !isMuted;
    setIsMuted(next);
    videoRef.current.muted = next;
    if (!next && volume === 0) { setVolume(0.5); videoRef.current.volume = 0.5; }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen().catch(console.error);
    }
  };

  return (
    // Outer wrapper: holds space when player goes sticky
    <Box ref={placeholderRef} sx={{ width: '100%', mb: 0 }}>
      {/* Player box */}
      <Box
        ref={containerRef}
        onMouseMove={() => setShowControls(true)}
        onMouseLeave={() => isPlaying && setShowControls(false)}
        sx={{
          position: isSticky ? 'fixed' : 'relative',
          top: isSticky ? 0 : 'auto',
          left: isSticky ? 0 : 'auto',
          zIndex: isSticky ? 1300 : 1,
          width: '100%',
          aspectRatio: '16/9',
          bgcolor: '#000',
          borderRadius: isSticky ? 0 : 2,
          overflow: 'hidden',
          boxShadow: isSticky
            ? '0 4px 20px rgba(0,0,0,0.5)'
            : '0 4px 20px rgba(0,0,0,0.15)',
        }}
      >
        {/* Video element */}
        <video
          ref={videoRef}
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
          style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'pointer' }}
          onClick={togglePlay}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          playsInline
        />

        {/* Paused overlay with teal play button */}
        {!isPlaying && (
          <Box
            onClick={togglePlay}
            sx={{
              position: 'absolute', inset: 0,
              bgcolor: 'rgba(0,0,0,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Box
              sx={{
                width: 72, height: 72, borderRadius: '50%',
                bgcolor: 'primary.main',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(0,168,132,0.5)',
                transition: 'transform 0.15s',
                '&:hover': { transform: 'scale(1.08)' },
              }}
            >
              <PlayArrowIcon sx={{ fontSize: 36, color: '#fff', ml: 0.5 }} />
            </Box>
          </Box>
        )}

        {/* Controls bar */}
        <Box
          sx={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.80))',
            px: 1.5, pb: 1.5, pt: 3,
            opacity: showControls || !isPlaying ? 1 : 0,
            pointerEvents: showControls || !isPlaying ? 'auto' : 'none',
            transition: 'opacity 0.25s',
            color: '#fff',
          }}
        >
          {/* Seek bar */}
          <Slider
            size="small"
            min={0} max={duration || 100} value={currentTime}
            onChange={handleSeek}
            sx={{
              color: 'primary.main', height: 4, p: '10px 0',
              '& .MuiSlider-thumb': { width: 12, height: 12 },
              '& .MuiSlider-rail': { opacity: 0.3 },
            }}
          />

          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Left controls */}
            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
              <IconButton onClick={togglePlay} size="small" sx={{ color: '#fff' }}>
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>

              <IconButton onClick={toggleMute} size="small" sx={{ color: '#fff' }}>
                {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
              </IconButton>

              <Slider
                size="small" min={0} max={1} step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                sx={{ color: '#fff', width: 72, height: 3, '& .MuiSlider-thumb': { width: 10, height: 10 } }}
              />

              <Typography variant="caption" sx={{ ml: 1, fontFamily: 'monospace', fontSize: '0.75rem' }}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </Typography>
            </Stack>

            {/* Right controls */}
            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
              {!isMobile && (
                <Tooltip title={isWide ? 'Normal View' : 'Wide View'}>
                  <IconButton
                    onClick={onToggleWide}
                    size="small"
                    sx={{ color: isWide ? 'primary.main' : '#fff' }}
                  >
                    <ViewSidebarIcon />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="Fullscreen">
                <IconButton onClick={toggleFullscreen} size="small" sx={{ color: '#fff' }}>
                  <FullscreenIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Box>
      </Box>

      {/* Spacer to prevent layout jump when sticky on mobile */}
      {isSticky && <Box sx={{ width: '100%', aspectRatio: '16/9' }} />}
    </Box>
  );
}
