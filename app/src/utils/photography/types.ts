export type PhotographyImage = {
  filename: string;
  date: Date;
  niceName: string;
  thumbsUrl: string;
  fullUrl: string;
};

export interface GetLatestPhotographyImagesProps {
  limit?: number;
}
