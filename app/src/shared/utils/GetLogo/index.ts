/**
 * Determine which logo should be shown for the website.
 * @returns relative logo url to display
 */
export const getLogoUrl = (): string => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const lowerBound = new Date(year, 10, 20); // Nov 20
  const upperBound = new Date(year, 11, 26); // Dec 26

  if (currentDate >= lowerBound && currentDate <= upperBound) {
    return '/images/avatar/ai-mo-xmas.png';
  }
  return '/images/avatar/ai-mo.png';
};
