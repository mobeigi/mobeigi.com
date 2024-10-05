import { NextResponse } from 'next/server';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@payload-config';
import { mapComments } from '@/utils/payload';
import { CommentsForPost } from '@/types/api/commentsForPost';

const depth = 2;

export const GET = async (request: Request, { params: paramsPromise }: { params: Promise<{ postId: string }> }) => {
  try {
    const params = await paramsPromise;

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
    const commentsForPost: CommentsForPost = {
      comments: mappedComments,
    };
    return NextResponse.json(commentsForPost);
  } catch (error) {
    console.error('Failed to fetch comments for post.', error);
    return NextResponse.json({ error: 'Failed to fetch comments for post.' }, { status: 500 });
  }
};
