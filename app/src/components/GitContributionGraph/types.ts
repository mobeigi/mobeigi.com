export interface GitContributionGraphProps {
  data: HeatmapEntry[];
}

export type HeatmapEntry = [
  string, // Date in 'YYYY-MM-DD' format
  number, // Contribution count
];
