import React from 'react';
import { Connect } from './components/Connect';
import { Link } from '@lendos/ui/components/Link';

const Home = () => {
  return (
    <>
      <Connect />
      <Link href={'/test'}>Test</Link>
    </>
  );
};

export default Home;
