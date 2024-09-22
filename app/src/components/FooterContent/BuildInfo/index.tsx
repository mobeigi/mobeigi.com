'use client';
// Uncomment during local development (with hot reloading) to fix @svgr/webpack bug.
// TODO: Remove above workaround when @svgr/webpack bug is resolved. This component does not need to be a client side component.
// Github link: https://github.com/vercel/next.js/issues/69545

// TODO: Once above bug is resolved, flatten this into FooterContent.tsx parent

import { IconWrapper } from '@/styles/icon';
import { BuildInfo } from './styled';
import GithubSvg from '@/assets/icons/boxicons/bxl-github.svg';
import GitCommitSvg from '@/assets/icons/boxicons/bx-git-commit.svg';
import { COMMIT_HASH } from '@/constants/build';

export const BuildInfoComponent = () => (
  <>
    <BuildInfo>
      <IconWrapper>
        <GitCommitSvg />
      </IconWrapper>
      <span>
        <a href={`https://github.com/mobeigi/mobeigi.com/commit/${COMMIT_HASH}`}>{COMMIT_HASH}</a>
      </span>
    </BuildInfo>
    <BuildInfo>
      <IconWrapper>
        <GithubSvg />
      </IconWrapper>
      <span>
        <a href="https://github.com/mobeigi/mobeigi.com">mobeigi/mobeigi.com</a>
      </span>
    </BuildInfo>
  </>
);
