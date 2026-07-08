import { useEffect, useState } from 'react';
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Alert,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import QuizIcon from '@mui/icons-material/Quiz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface ExamModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  examKey: string;
  onComplete: () => void;
}

const questions = [
  {
    id: 1,
    question: 'Which is the primary SEO ranking factor?',
    options: [
      'A. Quality and relevance of backlinks',
      'B. Font style of the website',
      'C. The color theme of the website',
      'D. Having an active social media page',
    ],
    correct: 'A. Quality and relevance of backlinks',
  },
  {
    id: 2,
    question: 'What does the meta description tag do in SEO?',
    options: [
      'A. Renders the main title of the webpage',
      'B. Provides a brief summary in search results',
      'C. Automatically pays for advertisements',
      'D. Formats the footer section of the website',
    ],
    correct: 'B. Provides a brief summary in search results',
  },
  {
    id: 3,
    question: 'Which HTML tag is most critical for SEO header hierarchy?',
    options: ['A. <h6>', 'B. <div>', 'C. <h1>', 'D. <span>'],
    correct: 'C. <h1>',
  },
];

export function ExamModal({ open, onClose, title, examKey, onComplete }: ExamModalProps) {
  const answersKey = `exam_answers_${examKey}`;
  const submittedKey = `exam_submitted_${examKey}`;
  const scoreKey = `exam_score_${examKey}`;

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!open) return;
    const savedAnswers = sessionStorage.getItem(answersKey);
    if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
    if (sessionStorage.getItem(submittedKey) === 'true') {
      setSubmitted(true);
      setScore(parseInt(sessionStorage.getItem(scoreKey) ?? '0', 10));
    }
  }, [open, answersKey, submittedKey, scoreKey]);

  function handleAnswer(qId: number, value: string) {
    setAnswers(prev => {
      const next = { ...prev, [qId]: value };
      sessionStorage.setItem(answersKey, JSON.stringify(next));
      return next;
    });
  }

  function handleSubmit() {
    const correct = questions.filter(q => answers[q.id] === q.correct).length;
    setScore(correct);
    setSubmitted(true);
    sessionStorage.setItem(submittedKey, 'true');
    sessionStorage.setItem(scoreKey, correct.toString());
    onComplete();
  }

  function handleRetake() {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    sessionStorage.removeItem(answersKey);
    sessionStorage.removeItem(submittedKey);
    sessionStorage.removeItem(scoreKey);
  }

  const allAnswered = questions.every(q => answers[q.id]);

  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <AppBar sx={{ position: 'relative', bgcolor: '#2e7d32' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} sx={{ mr: 2 }}>
            <CloseIcon />
          </IconButton>
          <QuizIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            {title}
          </Typography>
          <Button color="inherit" variant="outlined" onClick={onClose} sx={{ borderColor: 'rgba(255,255,255,0.4)' }}>
            Exit
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ flexGrow: 1, bgcolor: '#f4f6f8', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto' }}>
        <Paper elevation={3} sx={{ width: '100%', maxWidth: 700, p: 4 }}>
          {submitted ? (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
              <Typography variant="h4" color="success.main" sx={{ fontWeight: 700, mb: 1 }}>
                Exam Completed!
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Your exam has been submitted successfully.
              </Typography>
              <Alert severity="success" icon={false} sx={{ display: 'inline-flex', px: 4, py: 1.5, borderRadius: 3, mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Score: {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%)
                </Typography>
              </Alert>
              <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
                <Button variant="outlined" onClick={handleRetake}>Retake Exam</Button>
                <Button variant="contained" color="success" onClick={onClose}>Close</Button>
              </Stack>
            </Box>
          ) : (
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                Course Exam
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Answer all questions below, then submit to record your progress.
              </Typography>

              {questions.map((q, idx) => (
                <Box key={q.id} sx={{ mb: 4 }}>
                  <FormControl fullWidth>
                    <FormLabel sx={{ color: 'text.primary', fontWeight: 600, mb: 1.5, fontSize: '1rem' }}>
                      {idx + 1}. {q.question}
                    </FormLabel>
                    <RadioGroup value={answers[q.id] ?? ''} onChange={e => handleAnswer(q.id, e.target.value)}>
                      {q.options.map(option => (
                        <FormControlLabel
                          key={option}
                          value={option}
                          control={<Radio />}
                          label={option}
                          sx={{ my: 0.5, p: 1, borderRadius: 1, '&:hover': { bgcolor: 'action.hover' } }}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                  {idx < questions.length - 1 && <Divider sx={{ mt: 3 }} />}
                </Box>
              ))}

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <Button variant="outlined" onClick={onClose}>Cancel</Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                  sx={{ px: 4 }}
                >
                  Submit Exam
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
      </Box>
    </Dialog>
  );
}
