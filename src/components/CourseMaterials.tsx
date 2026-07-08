import { Box, Typography, Card, CardContent, Button, Stack, Chip, Grid } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import TableChartIcon from '@mui/icons-material/TableChart';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import type { MaterialFile } from '../data/mockCourse';

interface CourseMaterialsProps {
  materials: MaterialFile[];
  onPreview: (title: string, type: 'pdf' | 'excel' | 'word' | 'zip') => void;
}

function fileIcon(type: MaterialFile['type']) {
  if (type === 'pdf') return <PictureAsPdfIcon sx={{ fontSize: 34, color: '#e11d48' }} />;
  if (type === 'excel') return <TableChartIcon sx={{ fontSize: 34, color: '#16a34a' }} />;
  return <InsertDriveFileIcon sx={{ fontSize: 34, color: '#2563eb' }} />;
}

function chipColor(type: MaterialFile['type']): 'error' | 'success' | 'primary' | 'default' {
  if (type === 'pdf') return 'error';
  if (type === 'excel') return 'success';
  if (type === 'word') return 'primary';
  return 'default';
}

export function CourseMaterials({ materials, onPreview }: CourseMaterialsProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Course Downloads & Materials
      </Typography>

      <Grid container spacing={2}>
        {materials.map(file => (
          <Grid size={12} key={file.id}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 3,
                border: '1px solid rgba(0,0,0,0.08)',
                transition: 'all 0.2s',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', borderColor: 'primary.light' },
              }}
            >
              <CardContent sx={{ p: '16px !important' }}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  sx={{ alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between' }}
                >
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                    <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'action.hover', display: 'flex', alignItems: 'center' }}>
                      {fileIcon(file.type)}
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{file.title}</Typography>
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mt: 0.5 }}>
                        <Chip
                          label={file.type.toUpperCase()}
                          size="small"
                          color={chipColor(file.type)}
                          variant="outlined"
                          sx={{ height: 18, fontSize: '0.65rem', fontWeight: 700 }}
                        />
                        <Typography variant="caption" color="text.secondary">{file.size}</Typography>
                      </Stack>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={1} sx={{ width: { xs: '100%', sm: 'auto' }, justifyContent: { xs: 'flex-end', sm: 'flex-start' } }}>
                    <Button size="small" variant="outlined" startIcon={<VisibilityIcon />} onClick={() => onPreview(file.title, file.type)} sx={{ borderRadius: 2 }}>
                      Preview
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="inherit"
                      startIcon={<DownloadIcon />}
                      onClick={() => alert(`Downloading: ${file.title}`)}
                      sx={{ borderRadius: 2, bgcolor: 'grey.100', color: 'grey.800', boxShadow: 'none', '&:hover': { bgcolor: 'grey.200', boxShadow: 'none' } }}
                    >
                      Download
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
