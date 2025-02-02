export type ContributionEntry = [
  string, // Date in 'YYYY-MM-DD' format
  number, // Contribution count
];

export type DevelopmentActivity = {
  totalContributions: number;
  contributions: ContributionEntry[];
};
