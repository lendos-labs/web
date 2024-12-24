import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import { Box } from '@mui/material';

interface StarCircleProps {
  color?: string;
  starColor?: string;
  fontSize?: string;
}

const StarCircle = ({ color, starColor, fontSize }: StarCircleProps) => {
  return (
    <Box
      sx={{
        backgroundColor: color ?? 'primary.light',
        borderRadius: '50%',
        width: fontSize ?? '20px',
        height: fontSize ?? '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <StarRateRoundedIcon
        sx={{
          fontSize: '14px',
          color: starColor ?? 'white',
        }}
      />
    </Box>
  );
};

export default StarCircle;
