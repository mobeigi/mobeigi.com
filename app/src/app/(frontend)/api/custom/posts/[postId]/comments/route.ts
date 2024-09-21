import { NextResponse } from 'next/server';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@payload-config';
import { mapComments } from '@/utils/payload';

const depth = 2;

export async function GET(request: Request, { params }: { params: { postId: string } }) {
  try {
    const { postId } = params;

    const payload = await getPayloadHMR({
      config,
    });

    const comments = await payload.find({
      collection: 'comments',
      where: {
        post: { equals: postId },
      },
      depth,
      limit: 0,
      pagination: false,
    });

    const mappedComments = await mapComments(comments.docs);
    return NextResponse.json({ comments: mappedComments });
  } catch (error) {
    console.error('Failed to fetch comments for post.', error);
    return NextResponse.json({ error: 'Failed to fetch comments for post.' }, { status: 500 });
  }
}
