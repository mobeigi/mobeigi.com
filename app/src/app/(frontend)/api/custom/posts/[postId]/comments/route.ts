import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';
import { mapComments } from '@/utils/payload/server';
import { CommentsForPost } from '@/types/api/commentsForPost';

export const GET = async (request: Request, { params: paramsPromise }: { params: Promise<{ postId: string }> }) => {
  try {
    const params = await paramsPromise;

    const { postId } = params;

    const payload = await getPayload({
      config,
    });

    const comments = await payload.find({
      collection: 'comments',
      where: {
        post: { equals: postId },
      },
      depth: 1,
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
