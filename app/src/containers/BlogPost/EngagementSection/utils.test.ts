import type { ExternalDiscussion } from '@/types/blog';

// Mock the SVG imports before importing the utils
jest.mock('@/assets/icons/boxicons/bxl-reddit-colored.svg', () => () => null);
jest.mock('@/assets/icons/boxicons/bxl-github-colored.svg', () => () => null);
jest.mock('@/assets/icons/platforms/ycombinator-tile-colored.svg', () => () => null);
jest.mock('@/assets/icons/boxicons/bx-link-external.svg', () => () => null);

import { enrichExternalDiscussions } from './utils';
import RedditSvg from '@/assets/icons/boxicons/bxl-reddit-colored.svg';
import GitHubSvg from '@/assets/icons/boxicons/bxl-github-colored.svg';
import YCombinatorSvg from '@/assets/icons/platforms/ycombinator-tile-colored.svg';
import ExternalLinkSvg from '@/assets/icons/boxicons/bx-link-external.svg';

describe('enrichExternalDiscussions', () => {
  it('returns empty array for empty input', () => {
    const result = enrichExternalDiscussions([]);
    expect(result).toEqual([]);
  });

  it('enriches Reddit discussion with title', () => {
    const discussions: ExternalDiscussion[] = [
      {
        title: 'Awesome discussion',
        url: 'https://www.reddit.com/r/programming/comments/123/test',
      },
    ];

    const result = enrichExternalDiscussions(discussions);

    expect(result).toHaveLength(1);
    expect(result[0].externalDiscussion).toBe(discussions[0]);
    expect(result[0].enrichedTitle).toBe('Reddit (Awesome discussion)');
    expect(result[0].Icon).toBe(RedditSvg);
  });

  it('enriches Reddit discussion without title', () => {
    const discussions: ExternalDiscussion[] = [
      {
        url: 'https://reddit.com/r/programming/comments/123/test',
      },
    ];

    const result = enrichExternalDiscussions(discussions);

    expect(result).toHaveLength(1);
    expect(result[0].enrichedTitle).toBe('Reddit');
    expect(result[0].Icon).toBe(RedditSvg);
  });

  it('enriches GitHub discussion with title', () => {
    const discussions: ExternalDiscussion[] = [
      {
        title: 'Bug report',
        url: 'https://github.com/owner/repo/issues/123',
      },
    ];

    const result = enrichExternalDiscussions(discussions);

    expect(result).toHaveLength(1);
    expect(result[0].enrichedTitle).toBe('GitHub (Bug report)');
    expect(result[0].Icon).toBe(GitHubSvg);
  });

  it('enriches Y Combinator discussion', () => {
    const discussions: ExternalDiscussion[] = [
      {
        title: 'Show HN: My Project',
        url: 'https://news.ycombinator.com/item?id=123456',
      },
    ];

    const result = enrichExternalDiscussions(discussions);

    expect(result).toHaveLength(1);
    expect(result[0].enrichedTitle).toBe('Hacker News (Show HN: My Project)');
    expect(result[0].Icon).toBe(YCombinatorSvg);
  });

  it('enriches unknown platform with domain name', () => {
    const discussions: ExternalDiscussion[] = [
      {
        title: 'Some discussion',
        url: 'https://example.com/discussion/123',
      },
    ];

    const result = enrichExternalDiscussions(discussions);

    expect(result).toHaveLength(1);
    expect(result[0].enrichedTitle).toBe('example.com (Some discussion)');
    expect(result[0].Icon).toBe(ExternalLinkSvg);
  });

  it('handles invalid URLs gracefully', () => {
    const discussions: ExternalDiscussion[] = [
      {
        title: 'Invalid URL',
        url: 'not-a-valid-url',
      },
    ];

    const result = enrichExternalDiscussions(discussions);

    expect(result).toHaveLength(1);
    expect(result[0].enrichedTitle).toBe('Unknown');
    expect(result[0].Icon).toBe(ExternalLinkSvg);
  });

  it('strips subdomains from unknown platforms', () => {
    const discussions: ExternalDiscussion[] = [
      {
        url: 'https://api.v2.example.com/discussion',
      },
    ];

    const result = enrichExternalDiscussions(discussions);

    expect(result).toHaveLength(1);
    expect(result[0].enrichedTitle).toBe('example.com');
  });

  it('sorts discussions alphabetically by title', () => {
    const discussions: ExternalDiscussion[] = [
      { url: 'https://stackoverflow.com/questions/123', title: 'Stack Overflow Question' },
      { url: 'https://github.com/owner/repo/issues/1', title: 'GitHub Issue' },
      { url: 'https://reddit.com/r/programming/comments/1', title: 'Programming Discussion' },
    ];

    const result = enrichExternalDiscussions(discussions);

    expect(result).toHaveLength(3);
    expect(result[0].enrichedTitle).toBe('GitHub (GitHub Issue)');
    expect(result[1].enrichedTitle).toBe('Reddit (Programming Discussion)');
    expect(result[2].enrichedTitle).toBe('stackoverflow.com (Stack Overflow Question)');
  });

  it('handles mixed known and unknown platforms', () => {
    const discussions: ExternalDiscussion[] = [
      { url: 'https://reddit.com/r/test', title: 'Reddit Post' },
      { url: 'https://unknown-site.com/post', title: 'Unknown Post' },
      { url: 'https://github.com/repo', title: 'GitHub Repo' },
    ];

    const result = enrichExternalDiscussions(discussions);

    expect(result).toHaveLength(3);

    // Should be sorted alphabetically
    const titles = result.map((r) => r.enrichedTitle);
    expect(titles).toEqual(['GitHub (GitHub Repo)', 'Reddit (Reddit Post)', 'unknown-site.com (Unknown Post)']);
  });

  it('handles empty title strings', () => {
    const discussions: ExternalDiscussion[] = [{ url: 'https://reddit.com/r/test', title: '' }];

    const result = enrichExternalDiscussions(discussions);

    expect(result).toHaveLength(1);
    expect(result[0].enrichedTitle).toBe('Reddit');
  });

  it('preserves original externalDiscussion object', () => {
    const discussions: ExternalDiscussion[] = [{ url: 'https://reddit.com/r/test', title: 'Original Title' }];

    const result = enrichExternalDiscussions(discussions);

    expect(result[0].externalDiscussion).toBe(discussions[0]);
    expect(result[0].externalDiscussion.title).toBe('Original Title');
    expect(result[0].externalDiscussion.url).toBe('https://reddit.com/r/test');
  });
});
