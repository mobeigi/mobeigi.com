import crypto from 'crypto';
import { CreateHmac256Props, CreatePayloadHmac256Props } from './types';
import { requireEnvVar } from '@/utils/env';

export const createHmac256 = ({ data, secretKey }: CreateHmac256Props): string => {
  return crypto.createHmac('sha256', secretKey).update(data).digest('hex');
};

/**
 * Generate an HMAC-SHA256 hex digest with the Payload secret as the key.
 */
export const createPayloadHmac256 = ({ data }: CreatePayloadHmac256Props): string => {
  return createHmac256({ data, secretKey: requireEnvVar(process.env.PAYLOAD_SECRET, 'PAYLOAD_SECRET') });
};
