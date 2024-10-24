import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { registerView } from '@/payload/utils/viewCounter';

export const POST = async (request: Request, { params: paramsPromise }: { params: Promise<{ postId: string }> }) => {
  try {
    const params = await paramsPromise;
    const { postId: postIdString } = params;

    const postId = Number(postIdString);

    if (isNaN(postId)) {
      return NextResponse.json({ error: 'Invalid postId' }, { status: 400 });
    }

    const headerList = await headers();
    const ipAddress = headerList.get('x-forwarded-for');
    const userAgent = headerList.get('user-agent');

    if (!ipAddress || !userAgent) {
      return NextResponse.json({ error: 'Missing headers' }, { status: 400 });
    }

    // Fire async
    void registerView({ postId: postId, ipAddress, userAgent });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error registering view:', error);
    return NextResponse.json(error, { status: 500 });
  }
};
