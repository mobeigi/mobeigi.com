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
