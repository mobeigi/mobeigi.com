import { GITHUB_USERNAME, GITHUB_PERSONAL_ACCESS_KEY } from '@/constants/github';
import { ContributionEntry, DevelopmentActivity } from './types';
import { graphql } from '@octokit/graphql';
import { unstable_cacheLife as cacheLife } from 'next/cache';

export const getLatestDevelopmentActivity = async (): Promise<DevelopmentActivity | null> => {
  try {
    const response = await graphql<{
      user: {
        contributionsCollection: {
          contributionCalendar: {
            totalContributions: number;
            weeks: { contributionDays: { contributionCount: number; date: string }[] }[];
          };
        };
      };
    }>(
      `
        query ($userName: String!) {
          user(login: $userName) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `,
      {
        userName: GITHUB_USERNAME,
        headers: {
          authorization: `token ${GITHUB_PERSONAL_ACCESS_KEY}`,
        },
      },
    );

    const contributionCalendar = response.user.contributionsCollection.contributionCalendar;

    // Flatten the contribution data
    const contributions: ContributionEntry[] = contributionCalendar.weeks.flatMap((week) =>
      week.contributionDays.map((day) => [day.date, day.contributionCount] as ContributionEntry),
    );

    return {
      totalContributions: contributionCalendar.totalContributions,
      contributions,
    };
  } catch (error) {
    console.warn('getLatestDevelopmentActivity: Error while fetching latest development activity.', error);
    return null;
  }
};

export const getCachedLatestDevelopmentActivity = async () => {
  'use cache';
  cacheLife('alwaysCheck15m');

  return getLatestDevelopmentActivity();
};
