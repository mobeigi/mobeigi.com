import {
  EngagementContainer,
  ExternalDiscussionItem,
  ExternalDiscussionItemWrapper,
  ExternalDiscussionsArea,
  ExternalDiscussionsAreaHeading,
} from './styled';
import { EngagementSectionProps } from './types';
import { IconAndTextContainer, IconWrapper } from '@/styles/icon';
import { enrichExternalDiscussions } from './utils';
import { StyledLink } from '@/styles/link';

export const EngagementSection = ({ externalDiscussions }: EngagementSectionProps) => {
  const enrichedExternalDiscussions = enrichExternalDiscussions(externalDiscussions);
  return (
    <EngagementContainer>
      {enrichedExternalDiscussions.length > 0 && (
        <ExternalDiscussionsArea>
          <ExternalDiscussionsAreaHeading id="external-discussions">
            External discussions
          </ExternalDiscussionsAreaHeading>
          <ExternalDiscussionItemWrapper>
            {enrichedExternalDiscussions.map((enrichedExternalDiscussion, index) => (
              <ExternalDiscussionItem key={index}>
                <StyledLink href={enrichedExternalDiscussion.externalDiscussion.url} rel="nofollow">
                  <IconAndTextContainer>
                    <IconWrapper>
                      <enrichedExternalDiscussion.Icon />
                    </IconWrapper>
                    <span>{enrichedExternalDiscussion.enrichedTitle}</span>
                  </IconAndTextContainer>
                </StyledLink>
              </ExternalDiscussionItem>
            ))}
          </ExternalDiscussionItemWrapper>
        </ExternalDiscussionsArea>
      )}
    </EngagementContainer>
  );
};
