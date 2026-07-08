import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Box,
  Typography,
  Avatar,
  Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HelpIcon from '@mui/icons-material/Help';

interface AskQuestionModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (title: string, details: string) => void;
}

const STORAGE_KEY_TITLE = 'course_player_draft_question_title';
const STORAGE_KEY_DETAILS = 'course_player_draft_question_details';

export const AskQuestionModal: React.FC<AskQuestionModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [errors, setErrors] = useState<{ title?: string; details?: string }>({});

  // Restore draft when component mounts or modal opens
  useEffect(() => {
    if (open) {
      const savedTitle = sessionStorage.getItem(STORAGE_KEY_TITLE) || '';
      const savedDetails = sessionStorage.getItem(STORAGE_KEY_DETAILS) || '';
      setTitle(savedTitle);
      setDetails(savedDetails);
      setErrors({});
    }
  }, [open]);

  // Save draft on change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    sessionStorage.setItem(STORAGE_KEY_TITLE, val);
    if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDetails(val);
    sessionStorage.setItem(STORAGE_KEY_DETAILS, val);
    if (errors.details) setErrors((prev) => ({ ...prev, details: undefined }));
  };

  const handleSubmit = () => {
    const newErrors: { title?: string; details?: string } = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!details.trim()) {
      newErrors.details = 'Details are required';
    } else if (details.trim().length < 10) {
      newErrors.details = 'Please provide more details (min 10 characters)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(title, details);
    
    // Clear drafts on successful submit
    setTitle('');
    setDetails('');
    sessionStorage.removeItem(STORAGE_KEY_TITLE);
    sessionStorage.removeItem(STORAGE_KEY_DETAILS);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          },
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <HelpIcon color="primary" />
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
          Ask a Question
        </Typography>
        <IconButton onClick={onClose} aria-label="close" size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>S</Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              Student (You)
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Your question will be visible to the instructor and other students
            </Typography>
          </Box>
        </Stack>

        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="dense"
            label="Question Title"
            type="text"
            fullWidth
            variant="outlined"
            value={title}
            onChange={handleTitleChange}
            error={!!errors.title}
            helperText={errors.title}
            placeholder="e.g. How does SEO ranking work in 2026?"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Details / Description"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={details}
            onChange={handleDetailsChange}
            error={!!errors.details}
            helperText={errors.details}
            placeholder="Provide context, what you have tried, or what specific part of the video you are referring to..."
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={onClose} color="inherit" variant="text">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ borderRadius: 2 }}>
          Submit Question
        </Button>
      </DialogActions>
    </Dialog>
  );
};
