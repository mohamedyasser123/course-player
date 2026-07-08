import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  Divider,
  Chip,
  Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import { mockLeaderboard } from '../data/mockCourse';

interface LeaderboardModalProps {
  open: boolean;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ open, onClose }) => {
  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return '#FFD700'; // Gold
      case 2:
        return '#C0C0C0'; // Silver
      case 3:
        return '#CD7F32'; // Bronze
      default:
        return 'transparent';
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          },
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <LeaderboardIcon color="primary" />
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
          Course Leaderboard
        </Typography>
        <IconButton onClick={onClose} aria-label="close" size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 2, p: 1.5, bgcolor: 'primary.light', borderRadius: 2, opacity: 0.9 }}>
          <Typography variant="subtitle2" color="primary.contrastText" sx={{ fontWeight: 'bold' }}>
            Rank up by completing lessons and scoring in exams!
          </Typography>
        </Box>

        <List disablePadding>
          {mockLeaderboard.map((user, idx) => {
            const isTopThree = user.rank <= 3;
            return (
              <React.Fragment key={user.rank}>
                <ListItem
                  alignItems="center"
                  sx={{
                    borderRadius: 2,
                    my: 0.5,
                    bgcolor: user.isCurrentUser ? 'action.selected' : 'transparent',
                    border: user.isCurrentUser ? '1px solid' : 'none',
                    borderColor: 'primary.main',
                  }}
                  secondaryAction={
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }} color="primary.main">
                        {user.points} pts
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user.completedLessons} / 42 lessons
                      </Typography>
                    </Box>
                  }
                >
                  <Box
                    sx={{
                      width: 32,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mr: 1,
                    }}
                  >
                    {isTopThree ? (
                      <EmojiEventsIcon sx={{ color: getRankBadgeColor(user.rank) }} />
                    ) : (
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }} color="text.secondary">
                        {user.rank}
                      </Typography>
                    )}
                  </Box>

                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: user.isCurrentUser ? 'primary.main' : 'grey.400',
                        color: 'white',
                      }}
                    >
                      {user.name.split(' ')[0][0]}
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: user.isCurrentUser ? 'bold' : 'medium' }}>
                          {user.name}
                        </Typography>
                        {user.isCurrentUser && (
                          <Chip label="You" size="small" color="primary" sx={{ height: 16, fontSize: '0.65rem' }} />
                        )}
                      </Stack>
                    }
                  />
                </ListItem>
                {idx < mockLeaderboard.length - 1 && <Divider component="li" />}
              </React.Fragment>
            );
          })}
        </List>
      </DialogContent>
    </Dialog>
  );
};
