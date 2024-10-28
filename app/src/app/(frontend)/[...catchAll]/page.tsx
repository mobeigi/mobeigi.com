import { payloadRedirect } from '@/payload/utils/redirects';
import { joinUrl } from '@/utils/url';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const generateMetadata = async ({
  params: paramsPromise,
}: {
  params: Promise<{ catchAll: string[] }>;
}): Promise<Metadata> => {
  const params = await paramsPromise;
  await payloadRedirect({ currentUrl: joinUrl([...params.catchAll]) });
  notFound();
};

// Any route that isn't handled by other routes will end up here
const CatchAllHandler = async ({ params: paramsPromise }: { params: Promise<{ catchAll: string[] }> }) => {
  const params = await paramsPromise;
  await payloadRedirect({ currentUrl: joinUrl([...params.catchAll]) });
  notFound();
};

export default CatchAllHandler;
