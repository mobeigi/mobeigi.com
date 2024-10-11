export const validateMessage = (message?: string | null): true | string => {
  if (message === null || message === undefined) {
    return 'Message is null or undefined.';
  }

  const trimmedMessage = message.trim();

  if (!trimmedMessage) {
    return 'Message cannot be empty.';
  }

  if (trimmedMessage.length < 1 || trimmedMessage.length > 300) {
    return 'Message must be between 1 and 300 characters.';
  }

  return true;
};
