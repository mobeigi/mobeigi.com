import { headers } from 'next/headers';
import { registerView } from '@/payload/utils/viewCounter';

const registerViewHelper = async (postId: number) => {
  const headerList = await headers();
  const ipAddress = headerList.get('x-forwarded-for');
  const userAgent = headerList.get('user-agent');
  if (ipAddress && userAgent) {
    await registerView({ postId: postId, ipAddress, userAgent });
  }
};

interface RegisterViewSCProps {
  postId: number;
}

export const RegisterViewSc = ({ postId }: RegisterViewSCProps) => {
  void registerViewHelper(postId);
  return null;
};
