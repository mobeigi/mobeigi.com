import { payloadRedirect } from '@/payload/utils/payloadRedirect';
import { joinUrl } from '@/utils/url';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const generateMetadata = async ({ params }: { params: { catchAll: string[] } }): Promise<Metadata> => {
  await payloadRedirect({ currentUrl: joinUrl(['/', ...params.catchAll]) });
  notFound();
};

const CatchAllHandler = async ({ params }: { params: { catchAll: string[] } }) => {
  // Any route that isn't handled by other routes will end up here
  await payloadRedirect({ currentUrl: joinUrl(['/', ...params.catchAll]) });
  notFound();
};

export default CatchAllHandler;
