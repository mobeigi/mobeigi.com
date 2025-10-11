import type { ExternalDiscussion } from '@/types/blog';

export type EnrichedExternalDiscussion = {
  externalDiscussion: ExternalDiscussion;
  enrichedTitle: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};
