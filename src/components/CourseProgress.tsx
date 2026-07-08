import { useEffect, useRef, useState } from 'react';
import { Box, Typography, Avatar, Chip } from '@mui/material';

interface CourseProgressProps {
  progressPercent: number;
  completedCount: number;
  totalCount: number;
}

export function CourseProgress({ progressPercent, completedCount, totalCount }: CourseProgressProps) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimated(true), 150);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const pinLeft = animated ? Math.min(progressPercent, 88) : 0;

  return (
    <Box ref={ref} sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b' }}>
          Your Course Progress
        </Typography>
        <Chip
          label="Level 3"
          size="small"
          sx={{ bgcolor: '#f59e0b', color: '#fff', fontWeight: 700, fontSize: '0.72rem' }}
        />
      </Box>
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 3 }}>
        Level 3 · SEO Practitioner
      </Typography>

      <Box sx={{ position: 'relative', height: 56, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ position: 'absolute', left: 0, right: 40, height: 4, bgcolor: 'grey.200', borderRadius: 2 }} />

        <Box
          sx={{
            position: 'absolute',
            left: 0,
            width: `calc(${pinLeft}% + 10px)`,
            height: 4,
            bgcolor: 'primary.main',
            borderRadius: 2,
            transition: 'width 1.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            left: `${pinLeft}%`,
            top: 4,
            transition: 'left 1.4s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              bgcolor: '#1e293b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -5,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: '6px solid #1e293b',
              },
            }}
          >
            <Avatar
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"
              sx={{ width: 32, height: 32 }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            position: 'absolute',
            right: 0,
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '1px solid',
            borderColor: 'grey.300',
            bgcolor: 'background.paper',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 5,
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.6rem' }}>
            Goal
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            color: 'primary.main',
            position: 'relative',
            left: `${animated ? Math.min(progressPercent, 88) : 0}%`,
            transform: 'translateX(-50%)',
            transition: 'left 1.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {animated ? Math.round(progressPercent) : 0}%
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {completedCount} of {totalCount} completed
        </Typography>
      </Box>
    </Box>
  );
}
