type SeriesData = {
  date: string;
  color: string;
  seriesName: string;
  returnPercentage: string;
};

export type TooltipProps = {
  portfolioData: SeriesData | null;
  marketData: SeriesData | null;
};
