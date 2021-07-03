import React from 'react';
import { TargetAwareLink } from '../../utils/TargetAwareLink';
import { SocialButton } from './SocialButton';
import type { SocialButtonProps } from './SocialButton';
import { StyledSocialButtonGroup } from './styled';

type SocialButtonWithLinkType = {
  link: string;
  title: string;
  external?: boolean;
  nofollow?: boolean;
  forceReload?: boolean;
  socialButton: SocialButtonProps;
};

type SocialButtonGroupProps = {
  data: SocialButtonWithLinkType[];
};

export const SocialButtonGroup = ({ data }: SocialButtonGroupProps) => {
  const getRelAttribute = (external?: boolean, nofollow?: boolean): string => {
    const arr = [];
    if (external) {
      arr.push('external');
    }
    if (nofollow) {
      arr.push('nofollow');
    }
    return arr.join(' ');
  };

  const socialButtons = data.map((socialButtonWithLink) => {
    const relAttribute = getRelAttribute(socialButtonWithLink.external, socialButtonWithLink.nofollow);
    return (
      <TargetAwareLink
        key={socialButtonWithLink.title}
        to={socialButtonWithLink.link}
        title={socialButtonWithLink.title}
        aria-label={socialButtonWithLink.title}
        rel={relAttribute || undefined}
        forceReload={socialButtonWithLink.forceReload}
      >
        <SocialButton
          brandStyle={socialButtonWithLink.socialButton.brandStyle}
          iconName={socialButtonWithLink.socialButton.iconName}
          iconSize={socialButtonWithLink.socialButton.iconSize}
        />
      </TargetAwareLink>
    );
  });

  return <StyledSocialButtonGroup>{socialButtons}</StyledSocialButtonGroup>;
};
