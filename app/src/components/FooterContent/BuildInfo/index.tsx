'use client';
// Uncomment during local development (with hot reloading) to fix @svgr/webpack bug.
// TODO: Remove above workaround when @svgr/webpack bug is resolved. This component does not need to be a client side component.
// Github link: https://github.com/vercel/next.js/issues/69545

import { BuildInfoSpan, IconAndTextContainer, StyledA, CustomIconWrapper as IconWrapper } from './styled';
import GithubSvg from '@/assets/icons/boxicons/bxl-github.svg';
import GitCommitSvg from '@/assets/icons/boxicons/bx-git-commit.svg';
import { COMMIT_HASH } from '@/constants/build';

export const BuildInfo = () => (
  <>
    <BuildInfoSpan>
      <StyledA href={`https://github.com/mobeigi/mobeigi.com/commit/${COMMIT_HASH}`}>
        <IconAndTextContainer>
          <IconWrapper>
            <GitCommitSvg />
          </IconWrapper>
          <span>{COMMIT_HASH}</span>
        </IconAndTextContainer>
      </StyledA>
    </BuildInfoSpan>
    <BuildInfoSpan>
      <StyledA href="https://github.com/mobeigi/mobeigi.com">
        <IconAndTextContainer>
          <IconWrapper>
            <GithubSvg />
          </IconWrapper>
          <span>mobeigi/mobeigi.com</span>
        </IconAndTextContainer>
      </StyledA>
    </BuildInfoSpan>
  </>
);
