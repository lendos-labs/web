import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Box, Button, Paper, Typography } from '@mui/material';

interface PointsCardProps {
  title: string;
  description: string;
  value: string | React.ReactNode;
  handleAction: () => void | Promise<void>;
  actionText: string;
  disabledBtn?: boolean;
  titleLink?: string;
}

export const PointsCard = ({
  title,
  description,
  value,
  actionText,
  handleAction,
  disabledBtn,
  titleLink,
}: PointsCardProps) => {
  return (
    <Paper
      sx={theme => ({
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 0.5fr auto' },
        alignItems: 'center',
        p: { xs: 4, sm: 6 },
        gap: '24px',
        ...(theme.palette.mode === 'dark' && {
          background: theme.palette.background.default,
          boxShadow: theme.palette.shadow.card,
        }),
      })}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <PlayCircleIcon sx={{ color: 'primary.light' }} />

        <Box>
          <Typography
            variant='h2'
            component={titleLink ? 'a' : 'h2'}
            color={'text.primary'}
            {...(titleLink && { href: titleLink, target: '_blank' })}
          >
            {title}
          </Typography>
          <Typography variant='h3'>{description}</Typography>
        </Box>
      </Box>

      <Typography variant='h3'>{value}</Typography>

      <Button
        variant='white'
        size='small'
        onClick={handleAction}
        sx={{
          width: { xs: '100%', sm: '144px' },
          px: 0,
        }}
        disabled={disabledBtn}
      >
        {actionText}
      </Button>
    </Paper>
  );
};
