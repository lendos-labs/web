import { Box, Typography } from '@mui/material';

interface GraphLegendProps {
  labels: { text: string; color: string }[];
}

export function GraphLegend({
  labels = [
    { text: 'test', color: '#000' },
    { text: 'bla', color: '#ff0' },
  ],
}: GraphLegendProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 4, sm: 0 },
      }}
    >
      {labels.map(label => (
        <Box key={label.text} sx={{ display: 'inline-flex', alignItems: 'center', mr: 6 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              backgroundColor: label.color,
              mr: 2,
              borderRadius: '50%',
            }}
          />
          <Typography variant='buttonS'>{label.text}</Typography>
        </Box>
      ))}
    </Box>
  );
}
