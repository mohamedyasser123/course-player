import { useState } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Grid,
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Stack,
  Tabs,
  Tab,
  useMediaQuery,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CommentIcon from '@mui/icons-material/Comment';
import HelpOutlineIcon from '@mui/icons-material/HelpOutlined';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import { VideoPlayer } from './components/VideoPlayer';
import { CourseOverview } from './components/CourseOverview';
import { CourseMaterials } from './components/CourseMaterials';
import { CourseProgress } from './components/CourseProgress';
import { CurriculumSidebar } from './components/CurriculumSidebar';
import { CommentsSection } from './components/CommentsSection';
import { AskQuestionModal } from './components/AskQuestionModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { PdfViewerModal } from './components/PdfViewerModal';
import { ExamModal } from './components/ExamModal';

import { mockCourseInfo, initialModules, mockMaterials } from './data/mockCourse';
import type { CurriculumModule } from './data/mockCourse';

const theme = createTheme({
  palette: {
    primary: { main: '#00a884', light: '#e6f6f3', dark: '#008b6c', contrastText: '#ffffff' },
    secondary: { main: '#1e293b' },
    background: { default: '#f8fafc', paper: '#ffffff' },
    warning: { main: '#f59e0b' },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
  },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: 'none', borderRadius: 8 } } },
    MuiPaper: { styleOverrides: { root: { boxShadow: '0 4px 12px rgba(0,0,0,0.03)' } } },
  },
});

function App() {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [isWide, setIsWide] = useState(false);
  const [activeItemId, setActiveItemId] = useState('m1-1');
  const [modules, setModules] = useState<CurriculumModule[]>(initialModules);
  const [mobileTabIdx, setMobileTabIdx] = useState(0);

  const [askQuestionOpen, setAskQuestionOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);

  const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfTitle, setPdfTitle] = useState('');

  const [examOpen, setExamOpen] = useState(false);
  const [examTitle, setExamTitle] = useState('');
  const [examKey, setExamKey] = useState('');
  const [examTarget, setExamTarget] = useState<{ moduleId: string; itemId: string } | null>(null);

  const totalItems = modules.reduce((sum, m) => sum + m.items.length, 0);
  const completedItems = modules.reduce((sum, m) => sum + m.items.filter(i => i.completed).length, 0);
  const progressPercent = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  function toggleItem(moduleId: string, itemId: string) {
    setModules(prev =>
      prev.map(mod =>
        mod.id !== moduleId ? mod : {
          ...mod,
          items: mod.items.map(item => item.id !== itemId ? item : { ...item, completed: !item.completed }),
        }
      )
    );
  }

  function markCompleted(moduleId: string, itemId: string) {
    setModules(prev =>
      prev.map(mod =>
        mod.id !== moduleId ? mod : {
          ...mod,
          items: mod.items.map(item => item.id !== itemId ? item : { ...item, completed: true }),
        }
      )
    );
  }

  function openPDF(title: string, itemId: string, moduleId: string) {
    setPdfTitle(title);
    setPdfOpen(true);
    markCompleted(moduleId, itemId);
  }

  function openExam(title: string, itemId: string, moduleId: string) {
    setExamTitle(title);
    setExamKey(`${moduleId}_${itemId}`);
    setExamTarget({ moduleId, itemId });
    setExamOpen(true);
  }

  function handlePreview(title: string, type: 'pdf' | 'excel' | 'word' | 'zip') {
    if (type === 'pdf') {
      setPdfTitle(title);
      setPdfOpen(true);
    }
  }

  const curriculum = (
    <CurriculumSidebar
      modules={modules}
      activeItemId={activeItemId}
      onToggleItem={toggleItem}
      onSelectItem={(_, id) => setActiveItemId(id)}
      onOpenPDF={openPDF}
      onOpenExam={openExam}
    />
  );

  const progress = (
    <CourseProgress
      progressPercent={progressPercent}
      completedCount={completedItems}
      totalCount={totalItems}
    />
  );

  const navIcons = (
    <Stack direction="row" spacing={1} sx={{ mb: 2, mt: 1 }}>
      {[
        { icon: <MenuBookIcon sx={{ fontSize: 22, color: 'text.secondary', mb: 0.3 }} />, label: 'Curriculum', onClick: () => document.getElementById('curriculum-section')?.scrollIntoView({ behavior: 'smooth' }) },
        { icon: <CommentIcon sx={{ fontSize: 22, color: 'text.secondary', mb: 0.3 }} />, label: 'Comments', onClick: () => document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' }) },
        { icon: <HelpOutlineIcon sx={{ fontSize: 22, color: 'text.secondary', mb: 0.3 }} />, label: 'Ask Question', onClick: () => setAskQuestionOpen(true) },
        { icon: <EmojiEventsIcon sx={{ fontSize: 22, color: 'text.secondary', mb: 0.3 }} />, label: 'Leaderboard', onClick: () => setLeaderboardOpen(true) },
      ].map(({ icon, label, onClick }) => (
        <Box
          key={label}
          onClick={onClick}
          sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            cursor: 'pointer', px: 2, py: 1, borderRadius: 2,
            border: '1px solid rgba(0,0,0,0.10)', bgcolor: 'white',
            '&:hover': { bgcolor: 'grey.50' },
          }}
        >
          {icon}
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem', textAlign: 'center', lineHeight: 1.2 }}>
            {label}
          </Typography>
        </Box>
      ))}
    </Stack>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }} className="fade-in">
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 2 }}>
          <Link underline="hover" color="inherit" href="#" onClick={e => e.preventDefault()}>Home</Link>
          <Link underline="hover" color="inherit" href="#" onClick={e => e.preventDefault()}>Courses</Link>
          <Typography color="text.primary" sx={{ fontWeight: 500 }}>Course Details</Typography>
        </Breadcrumbs>

        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 800, mb: 4, color: 'secondary.main' }}>
          {mockCourseInfo.title}
        </Typography>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: isWide ? 12 : 8 }} sx={{ transition: 'all 0.4s ease-in-out' }}>
            <VideoPlayer isWide={isWide} onToggleWide={() => setIsWide(w => !w)} />

            {navIcons}

            <CourseOverview info={mockCourseInfo} />

            <CourseMaterials materials={mockMaterials} onPreview={handlePreview} />

            <Box id="comments-section" sx={{ scrollMarginTop: '80px' }}>
              <CommentsSection />
            </Box>

            {isMobile && (
              <Box sx={{ mt: 3 }}>
                <Tabs
                  value={mobileTabIdx}
                  onChange={(_, val) => setMobileTabIdx(val)}
                  variant="scrollable"
                  scrollButtons="auto"
                  indicatorColor="primary"
                  textColor="primary"
                  sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
                >
                  <Tab label="Curriculum" />
                  <Tab label="Progress" />
                </Tabs>
                {mobileTabIdx === 0 && curriculum}
                {mobileTabIdx === 1 && progress}
              </Box>
            )}

            {isTablet && (
              <Stack spacing={4} sx={{ mt: 3 }}>
                {progress}
                <Box id="curriculum-section" sx={{ scrollMarginTop: '100px' }}>
                  {curriculum}
                </Box>
              </Stack>
            )}
          </Grid>

          <Grid size={{ xs: 12, md: isWide ? 12 : 4 }} sx={{ transition: 'all 0.4s ease-in-out' }}>
            {!isMobile && !isTablet && (
              <Box sx={{ position: isWide ? 'static' : 'sticky', top: 24, maxHeight: isWide ? 'none' : '90vh', overflowY: isWide ? 'visible' : 'auto', pr: 1 }}>
                {isWide ? (
                  <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 4 }}>{progress}</Grid>
                    <Grid size={{ xs: 12, md: 8 }}>
                      <Box id="curriculum-section" sx={{ scrollMarginTop: '100px' }}>{curriculum}</Box>
                    </Grid>
                  </Grid>
                ) : (
                  <>
                    {progress}
                    <Box id="curriculum-section" sx={{ scrollMarginTop: '100px', mt: 4 }}>{curriculum}</Box>
                  </>
                )}
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>

      <AskQuestionModal open={askQuestionOpen} onClose={() => setAskQuestionOpen(false)} onSubmit={() => {}} />
      <LeaderboardModal open={leaderboardOpen} onClose={() => setLeaderboardOpen(false)} />
      <PdfViewerModal open={pdfOpen} onClose={() => setPdfOpen(false)} title={pdfTitle} />
      <ExamModal
        open={examOpen}
        onClose={() => setExamOpen(false)}
        title={examTitle}
        examKey={examKey}
        onComplete={() => examTarget && markCompleted(examTarget.moduleId, examTarget.itemId)}
      />
    </ThemeProvider>
  );
}

export default App;
