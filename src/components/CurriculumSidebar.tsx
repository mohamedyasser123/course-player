import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LaunchIcon from '@mui/icons-material/Launch';
import type { CurriculumModule } from '../data/mockCourse';

interface CurriculumSidebarProps {
  modules: CurriculumModule[];
  activeItemId: string;
  onToggleItem: (moduleId: string, itemId: string) => void;
  onSelectItem: (moduleId: string, itemId: string) => void;
  onOpenPDF: (title: string, itemId: string, moduleId: string) => void;
  onOpenExam: (title: string, itemId: string, moduleId: string) => void;
}

function itemIcon(type: 'video' | 'pdf' | 'exam') {
  if (type === 'pdf') return <PictureAsPdfIcon color="error" />;
  if (type === 'exam') return <AssignmentIcon color="success" />;
  return <PlayCircleIcon color="primary" />;
}

export function CurriculumSidebar({ modules, activeItemId, onToggleItem, onSelectItem, onOpenPDF, onOpenExam }: CurriculumSidebarProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Course Curriculum
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {modules.map(mod => (
          <Accordion
            key={mod.id}
            defaultExpanded
            elevation={1}
            sx={{ borderRadius: 2, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)', '&:before': { display: 'none' } }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ bgcolor: 'action.hover', '& .MuiAccordionSummary-content': { justifyContent: 'space-between', alignItems: 'center', pr: 1 } }}
            >
              <Box sx={{ pr: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e293b' }}>{mod.title}</Typography>
                <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', mt: 0.2 }}>{mod.description}</Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails sx={{ p: 0 }}>
              <List disablePadding>
                {mod.items.map((item, idx) => {
                  const active = item.id === activeItemId;
                  return (
                    <Box key={item.id}>
                      <ListItem
                        sx={{
                          py: 1.5, px: 2,
                          bgcolor: active ? 'primary.light' : item.completed ? 'rgba(46,125,50,0.03)' : 'transparent',
                          borderLeft: active ? '4px solid' : 'none',
                          borderColor: 'primary.main',
                          pl: active ? 1.5 : 2,
                          transition: 'all 0.2s',
                          '&:hover': { bgcolor: active ? 'primary.light' : 'rgba(0,0,0,0.02)' },
                        }}
                        secondaryAction={
                          item.type !== 'video' ? (
                            <IconButton
                              edge="end"
                              size="small"
                              onClick={() => item.type === 'pdf' ? onOpenPDF(item.title, item.id, mod.id) : onOpenExam(item.title, item.id, mod.id)}
                              sx={{ color: item.type === 'pdf' ? 'error.main' : 'success.main', border: '1px solid currentColor', borderRadius: 1.5, p: 0.5 }}
                            >
                              <LaunchIcon sx={{ fontSize: 16 }} />
                            </IconButton>
                          ) : undefined
                        }
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <Checkbox edge="start" checked={item.completed} onChange={() => onToggleItem(mod.id, item.id)} color="success" />
                        </ListItemIcon>

                        <ListItemText
                          onClick={() => onSelectItem(mod.id, item.id)}
                          sx={{ cursor: 'pointer' }}
                          primary={
                            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', alignItems: 'center', gap: 0.5 }}>
                              <Typography
                                variant="body2"
                                color={active ? 'primary.main' : item.completed ? 'text.secondary' : 'text.primary'}
                                sx={{
                                  fontWeight: active || item.completed ? 700 : 400,
                                  textDecoration: !active && item.completed ? 'line-through' : 'none',
                                  '&:hover': { color: 'primary.main' },
                                }}
                              >
                                {item.title}
                              </Typography>
                              {item.questionsCount !== undefined && (
                                <Box component="span" sx={{ fontSize: '0.62rem', fontWeight: 700, color: '#00b894', bgcolor: '#e6f6f3', px: 0.8, py: 0.2, borderRadius: 1, textTransform: 'uppercase' }}>
                                  {item.questionsCount} Q
                                </Box>
                              )}
                              {item.minutesCount !== undefined && (
                                <Box component="span" sx={{ fontSize: '0.62rem', fontWeight: 700, color: '#e11d48', bgcolor: '#ffebeb', px: 0.8, py: 0.2, borderRadius: 1, textTransform: 'uppercase' }}>
                                  {item.minutesCount} min
                                </Box>
                              )}
                            </Stack>
                          }
                          secondary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                              {itemIcon(item.type)}
                              <Typography variant="caption" color="text.secondary">
                                {item.type.toUpperCase()}{item.duration ? ` • ${item.duration}` : ''}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      {idx < mod.items.length - 1 && <Divider />}
                    </Box>
                  );
                })}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}
