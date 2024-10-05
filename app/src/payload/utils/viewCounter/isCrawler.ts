import crawlerUserAgents from 'crawler-user-agents';

export const isCrawler = (userAgent: string): boolean => {
  return crawlerUserAgents.some((crawler) => {
    const crawlerPattern = new RegExp(crawler.pattern, 'i'); // case insensitive match
    return crawlerPattern.test(userAgent);
  });
};
