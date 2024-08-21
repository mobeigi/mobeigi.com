import React from 'react';

import '../../../assets/fontawesomepro/5.13.1/css/all.min.css';
import { StyledSocialButton, StyledSocialButtonWithHover } from './styled';
import { SocialButtonProps } from './types';

export const BaseSocialButton = ({ brandStyle, iconName, iconSize = 'fa-1x' }: SocialButtonProps) => (
  <i className={`${brandStyle} ${iconName} ${iconSize}`} />
);

export const SocialButton = ({ brandStyle, iconName, iconSize = 'fa-1x' }: SocialButtonProps) => (
  <StyledSocialButton>
    <BaseSocialButton brandStyle={brandStyle} iconName={iconName} iconSize={iconSize} />
  </StyledSocialButton>
);

export const SocialButtonWithHover = ({ brandStyle, iconName, iconSize = 'fa-1x' }: SocialButtonProps) => (
  <StyledSocialButtonWithHover>
    <BaseSocialButton brandStyle={brandStyle} iconName={iconName} iconSize={iconSize} />
  </StyledSocialButtonWithHover>
);
