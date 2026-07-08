import { useState } from 'react';
import { Box, Typography, Avatar, Divider, TextField, Button } from '@mui/material';

const mockComments = [
  {
    id: '1',
    name: 'Student Name Goes Here',
    date: 'Oct 10, 2021',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: '2',
    name: 'Student Name Goes Here',
    date: 'Oct 15, 2021',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: '3',
    name: 'Student Name Goes Here',
    date: 'Oct 19, 2021',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

export function CommentsSection() {
  const [text, setText] = useState('');
  const [comments, setComments] = useState(mockComments);

  function handleSubmit() {
    if (!text.trim()) return;
    setComments([
      ...comments,
      {
        id: String(Date.now()),
        name: 'You',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        avatar: '',
        text: text.trim(),
      },
    ]);
    setText('');
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#1a1a2e' }}>
        Comments
      </Typography>

      {/* Comment List */}
      {comments.map((comment, index) => (
        <Box key={comment.id}>
          <Box sx={{ display: 'flex', gap: 2, py: 3 }}>
            <Avatar
              src={comment.avatar}
              alt={comment.name}
              sx={{ width: 52, height: 52, flexShrink: 0, mt: 0.5 }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: '#1a1a2e', mb: 0.3 }}>
                {comment.name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#999', mb: 1, fontSize: '0.82rem' }}>
                {comment.date}
              </Typography>
              <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.65 }}>
                Lorem ipsum{' '}
                <Box component="span" sx={{ color: '#00b894', cursor: 'pointer' }}>
                  dolor sit amet, consectetur adipisicing
                </Box>{' '}
                elit sed do eiusmod tempor incididunt ut labore et dolore magna{' '}
                <Box component="span" sx={{ color: '#00b894', cursor: 'pointer' }}>
                  aliqua.
                </Box>
              </Typography>
            </Box>
          </Box>
          {index < comments.length - 1 && <Divider />}
        </Box>
      ))}

      {/* Comment Input */}
      <Box
        sx={{
          mt: 3,
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: '#fff',
        }}
      >
        <TextField
          fullWidth
          multiline
          minRows={4}
          placeholder="Write a comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              border: 'none',
              borderRadius: 0,
              '& fieldset': { border: 'none' },
            },
            '& .MuiInputBase-input': {
              fontSize: '0.9rem',
              color: '#555',
            },
          }}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            bgcolor: '#00b894',
            color: '#fff',
            fontWeight: 600,
            px: 3,
            py: 1.2,
            borderRadius: 2,
            fontSize: '0.9rem',
            boxShadow: 'none',
            textTransform: 'none',
            '&:hover': { bgcolor: '#00a07d', boxShadow: 'none' },
          }}
        >
          Submit Review &nbsp; →
        </Button>
      </Box>
    </Box>
  );
}
