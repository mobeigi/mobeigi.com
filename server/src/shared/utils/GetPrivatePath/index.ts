export const getPrivatePath = (): string => {
  return process.env.PRIVATE_PATH || 'private';
};
