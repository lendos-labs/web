import { ContentContainer } from '../../components/ContentContainer';
import { Button, Paper, Typography } from '@mui/material';
import { Link } from '../../components/Link';

function NotFoundContainer() {
  return (
    <ContentContainer>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          p: 4,
          flex: 1,
          backgroundColor: theme => (theme.palette.mode === 'dark' ? 'transparent' : ''),
          mt: 10,
        }}
      >
        {/* <Box sx={{ maxWidth: 444, m: '0 auto' }}>*/}
        {/*  <img width='100%' height='auto' src='/404/404.svg' alt='404 - Page not found' />*/}
        {/* </Box>*/}

        <Typography variant='buttonM' sx={{ mt: 2 }}>
          Page not found
        </Typography>
        <Typography sx={{ mt: 3, mb: 5, maxWidth: 480 }}>
          Sorry, we couldn&apos;t find the page you were looking for.
          <br />
          We suggest you go back to the Dashboard.
        </Typography>
        <Link href='/' passHref>
          <Button variant='outlined' color='primary'>
            Back to Dashboard
          </Button>
        </Link>
      </Paper>
    </ContentContainer>
  );
}

export default NotFoundContainer;
