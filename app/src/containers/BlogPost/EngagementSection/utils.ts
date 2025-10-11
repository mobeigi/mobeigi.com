import type { ExternalDiscussion } from '@/types/blog';
import type { EnrichedExternalDiscussion } from './utils.types';

import { getDomain } from 'tldts';

import RedditColoredSvg from '@/assets/icons/platforms/reddit-colored.svg';
import GithubColoredSvg from '@/assets/icons/platforms/github-colored.svg';
import YcombinatorColoredSvg from '@/assets/icons/platforms/ycombinator-colored.svg';
import ExternalLinkSvg from '@/assets/icons/boxicons/bx-link-external.svg';

const platformMap = new Map([
  ['reddit.com', { name: 'Reddit', icon: RedditColoredSvg }],
  ['github.com', { name: 'GitHub', icon: GithubColoredSvg }],
  ['ycombinator.com', { name: 'Hacker News', icon: YcombinatorColoredSvg }],
]);

export const enrichExternalDiscussions = (items: ExternalDiscussion[]): EnrichedExternalDiscussion[] => {
  const enriched = items.map((externalDiscussion) => {
    const domain = getDomain(externalDiscussion.url);
    const enrichedTitle = generateEnrichedTitle(domain, externalDiscussion.title);
    const Icon = getPlatformIcon(domain);
    return { externalDiscussion, enrichedTitle, Icon };
  });

  enriched.sort((a, b) => a.enrichedTitle.localeCompare(b.enrichedTitle));

  return enriched;
};

const generateEnrichedTitle = (domain: string | null, title: string | undefined): string => {
  if (!domain) {
    return 'Unknown';
  }
  const platformInfo = platformMap.get(domain);
  const platformName = platformInfo?.name || domain;
  return title ? `${platformName} (${title})` : platformName;
};

const getPlatformIcon = (domain: string | null) => {
  if (!domain) return ExternalLinkSvg;
  const platformInfo = platformMap.get(domain);
  return platformInfo?.icon || ExternalLinkSvg;
};
