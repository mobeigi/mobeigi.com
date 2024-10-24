'use client';

import { useEffect } from 'react';

export const RegisterView = ({ postId }: { postId: number }) => {
  useEffect(() => {
    void fetch(`/api/custom/posts/${postId}/register-view/`, {
      method: 'POST',
    });
  }, [postId]);

  return null;
};
