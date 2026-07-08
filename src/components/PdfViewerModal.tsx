import { useState } from 'react';
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface PdfViewerModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
}

const pages = [
  {
    heading: 'Introduction to Search Engine Optimization',
    body: `Search Engine Optimization (SEO) is the process of improving the quality and quantity of website traffic from search engines. SEO targets unpaid (organic) results rather than paid traffic.\n\nIn this chapter we cover:\n• How search crawlers function\n• Understanding indexing pipelines\n• Keyword research and intent analysis`,
  },
  {
    heading: 'On-Page SEO Best Practices',
    body: `On-page SEO refers to optimization of individual web pages to rank higher and earn more relevant traffic. This includes both HTML code and content.\n\nKey elements:\n• Titles and meta-descriptions (exact length thresholds)\n• Semantic markup (H1-H6 structural layouts)\n• Image ALT texts and file naming conventions`,
  },
  {
    heading: 'Link Building Strategy',
    body: `High-quality backlinks remain one of the strongest ranking signals. Focus on acquiring links from authoritative, topically relevant domains.\n\nBest practices:\n• Guest posting on industry publications\n• Building linkable assets (research, tools, infographics)\n• Broken link building and resource page outreach`,
  },
  {
    heading: 'Technical SEO Fundamentals',
    body: `Technical SEO ensures search engines can crawl, render, and index your site efficiently.\n\nCore areas:\n• Core Web Vitals (LCP, CLS, FID)\n• Structured data and schema markup\n• Canonical tags and crawl budget management`,
  },
  {
    heading: 'Analytics & Reporting',
    body: `Measuring SEO performance requires connecting the right data sources and tracking meaningful KPIs.\n\nKey tools:\n• Google Search Console (impressions, clicks, CTR)\n• GA4 for organic session attribution\n• Rank tracking with consistent keyword sets`,
  },
];

export function PdfViewerModal({ open, onClose, title }: PdfViewerModalProps) {
  const [page, setPage] = useState(1);
  const current = pages[page - 1];

  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <AppBar sx={{ position: 'relative', bgcolor: '#1c2438' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} sx={{ mr: 2 }}>
            <CloseIcon />
          </IconButton>
          <PictureAsPdfIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            {title}
          </Typography>
          <Button color="inherit" variant="outlined" onClick={onClose} sx={{ borderColor: 'rgba(255,255,255,0.4)' }}>
            Exit
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ flexGrow: 1, bgcolor: '#f4f6f8', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto' }}>
        <Paper elevation={3} sx={{ width: '100%', maxWidth: 800, minHeight: 500, p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, borderBottom: '2px solid #ddd', pb: 2, mb: 3, textAlign: 'center' }}>
              {current.heading}
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.9, whiteSpace: 'pre-line', color: 'text.secondary' }}>
              {current.body}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, pt: 2, borderTop: '1px solid #ddd' }}>
            <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => setPage(p => p - 1)} disabled={page === 1}>
              Previous
            </Button>
            <Typography variant="body2" color="text.secondary">
              Page {page} of {pages.length}
            </Typography>
            <Button variant="outlined" endIcon={<ArrowForwardIcon />} onClick={() => setPage(p => p + 1)} disabled={page === pages.length}>
              Next
            </Button>
          </Box>
        </Paper>
      </Box>
    </Dialog>
  );
}
