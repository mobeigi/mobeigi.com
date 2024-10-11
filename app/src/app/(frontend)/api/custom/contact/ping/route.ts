import { NextResponse } from 'next/server';
import { ErrorResonse } from '@/types/api/error';
import { PingRequest } from '@/types/api/contact';
import { validateMessage } from '@/utils/api/contact/ping/validators';
import { joinUrl } from '@/utils/url';
import { NTFY_HOST, NTFY_PASS, NTFY_USER } from '@/constants/ntfy';

const NTFY_TOPIC = 'visitor-messages';
const NTFY_URL = joinUrl([NTFY_HOST, NTFY_TOPIC], false);
const NTFY_USER_CREDENTIALS = `${NTFY_USER}:${NTFY_PASS}`;

export const POST = async (request: Request) => {
  try {
    const body = (await request.json()) as PingRequest;
    const { message } = body;

    // Validate input
    const validateMessageResult = validateMessage(message);
    if (validateMessageResult !== true) {
      const errorResponse: ErrorResonse = { error: validateMessageResult };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Send ping
    const ntfyResponse = await fetch(NTFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        Authorization: 'Basic ' + Buffer.from(NTFY_USER_CREDENTIALS).toString('base64'),
      },
      body: message,
    });

    if (!ntfyResponse.ok) {
      throw new Error('Failed to send message to ntfy server');
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    const errorResponse: ErrorResonse = { error: 'Encountered error while processing ping request.' };
    console.error(errorResponse.error, error);
    return NextResponse.json(errorResponse, { status: 500 });
  }
};
