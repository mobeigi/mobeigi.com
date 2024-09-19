import { notFound } from 'next/navigation';

export const generateMetadata = () => {
  notFound();
  return null;
};

const CatchAll = () => {
  // Any route that isn't handled by other routes will end up here
  notFound();
};

export default CatchAll;
