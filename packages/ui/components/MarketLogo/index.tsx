import Image from 'next/image';

import { Box, BoxProps, SxProps, Theme, Tooltip } from '@mui/material';

interface MarketLogoProps {
  logo: string;
  testChainName?: string;
  sx?: SxProps<Theme>;
  size: BoxProps['width'];
}

export const MarketLogo = ({ logo, testChainName, sx, size }: MarketLogoProps) => {
  return (
    <Box height={size} width={size} sx={{ mr: 2, position: 'relative', ...sx }}>
      <Image
        alt={`${logo} icon`}
        src={logo}
        quality={100}
        fill
        // sizes='100vw'
        // style={{ objectFit: 'cover' }}
      />
      {testChainName && (
        <Tooltip title={testChainName} arrow>
          <Box
            sx={{
              bgcolor: '#29B6F6',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              color: 'common.white',
              fontSize: '12px',
              lineHeight: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              right: '-2px',
              bottom: '-2px',
            }}
          >
            {testChainName.split('')[0]}
          </Box>
        </Tooltip>
      )}
    </Box>
  );
};
