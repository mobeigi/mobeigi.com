import { payloadRedirect } from '@/payload/utils/payloadRedirect';
import { joinUrl } from '@/utils/url';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const generateMetadata = async ({ params }: { params: Promise<{ catchAll: string[] }> }): Promise<Metadata> => {
  const resolvedParams = await params;
  await payloadRedirect({ currentUrl: joinUrl(['/', ...resolvedParams.catchAll]) });
  notFound();
};

// Any route that isn't handled by other routes will end up here
const CatchAllHandler = async ({ params }: { params: Promise<{ catchAll: string[] }> }) => {
  const resolvedParams = await params;
  await payloadRedirect({ currentUrl: joinUrl(['/', ...resolvedParams.catchAll]) });
  notFound();
};

export default CatchAllHandler;
