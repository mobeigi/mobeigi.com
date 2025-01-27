import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';
import { createPayloadHmac256 } from '@/utils/crypto/hmac256';
import { headers } from 'next/headers';

export const GET = async (request: Request, { params: paramsPromise }: { params: Promise<{ commentId: string }> }) => {
  try {
    const params = await paramsPromise;

    const { commentId } = params;

    const url = new URL(request.url);
    const token = url.searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Token is required.' }, { status: 400 });
    }

    const payload = await getPayload({
      config,
    });

    const comment = await payload.findByID({
      collection: 'comments',
      id: commentId,
      disableErrors: true,
    });

    if (!comment) {
      return NextResponse.json({ error: `Comment with id '${commentId}' does not exist.` }, { status: 404 });
    }

    // Validate token
    const commentIdHmac256 = createPayloadHmac256({ data: commentId });
    if (commentIdHmac256 !== token) {
      return NextResponse.json({ error: 'Token is invalid.' }, { status: 401 });
    }

    if (!comment.notifyOnReply) {
      return NextResponse.json({ error: 'You have already unsubscribed from this comment.' }, { status: 400 });
    }

    const headerList = await headers();
    const result = await payload.auth({ headers: headerList });

    await payload.update({
      collection: 'comments',
      id: commentId,
      data: {
        notifyOnReply: false,
      },
      overrideAccess: true,
      user: result.user,
    });

    return NextResponse.json({ message: 'You have successfully unsubscribed from this comment.' }, { status: 200 });
  } catch (error) {
    console.error('Failed to unsubscribe from comment.', error);
    return NextResponse.json({ error: 'Failed to unsubscribe from comment.' }, { status: 500 });
  }
};
