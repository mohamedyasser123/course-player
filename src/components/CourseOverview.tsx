import { Box, Typography, Paper, Grid, Stack, Divider } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BarChartIcon from '@mui/icons-material/BarChart';
import LanguageIcon from '@mui/icons-material/Language';
import type { CourseInfo } from '../data/mockCourse';

interface CourseOverviewProps {
  info: CourseInfo;
}

function StatRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', color: 'text.secondary' }}>
        {icon}
        <Typography variant="body2" color="text.secondary">{label}</Typography>
      </Stack>
      <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>{value}</Typography>
    </Stack>
  );
}

export function CourseOverview({ info }: CourseOverviewProps) {
  const col1 = [
    { icon: <MenuBookIcon fontSize="small" />, label: 'Curriculum:', value: `${info.modulesCount} Modules, ${info.lessonsCount} Lessons` },
    { icon: <AccessTimeIcon fontSize="small" />, label: 'Duration:', value: info.durationHours },
  ];
  const col2 = [
    { icon: <BarChartIcon fontSize="small" />, label: 'Skill Level:', value: info.level },
    { icon: <LanguageIcon fontSize="small" />, label: 'Language:', value: info.language },
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: '#1e293b' }}>
        Course Materials
      </Typography>
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, border: '1px solid rgba(0,0,0,0.08)' }}>
        <Grid container spacing={4} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, sm: 5.5 }}>
            <Stack spacing={0.5}>
              {col1.map(s => <StatRow key={s.label} {...s} />)}
            </Stack>
          </Grid>
          <Grid size={{ sm: 1 }} sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'center' }}>
            <Divider orientation="vertical" flexItem sx={{ height: 80, alignSelf: 'center' }} />
          </Grid>
          <Grid size={{ xs: 12, sm: 5.5 }}>
            <Stack spacing={0.5}>
              {col2.map(s => <StatRow key={s.label} {...s} />)}
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
