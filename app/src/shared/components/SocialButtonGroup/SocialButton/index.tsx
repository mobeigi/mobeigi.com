import React from 'react';

import '../../../assets/fontawesomepro/5.13.1/css/all.min.css';
import { StyledSocialButton } from './styled';
import { SocialButtonProps } from './types';

export const SocialButton = ({ brandStyle, iconName, iconSize = 'fa-1x' }: SocialButtonProps) => (
  <StyledSocialButton>
    <i className={`${brandStyle} ${iconName} ${iconSize}`} />
  </StyledSocialButton>
);
