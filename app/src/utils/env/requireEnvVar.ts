/**
 * Require an environment variable to be set.
 *
 * The reason the value is passed in directly is to support static replacement at build time
 * which is needed to support environment variables that are accessed on the client side.
 *
 * @example requireEnvVar(process.env.EXAMPLE_VAR, 'EXAMPLE_VAR')
 */
export const requireEnvVar = (value: string | undefined, key: string): string => {
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is missing and required.`);
  }
  return value;
};
