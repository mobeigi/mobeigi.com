import NotFoundPage from '@/containers/NotFoundPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Not Found',
};

const NotFound = () => <NotFoundPage />;

export default NotFound;
