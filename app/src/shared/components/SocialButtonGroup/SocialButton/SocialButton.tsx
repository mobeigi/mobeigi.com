import React from 'react';

import '../../../assets/fontawesomepro/5.8.2/css/all.min.css';
import { StyledSocialButton } from './styled';

export type SocialButtonProps = {
  brandStyle: string
  iconName: string
  iconSize?: string
}

const SocialButton = ({
  brandStyle, iconName, iconSize,
} : SocialButtonProps) => (
  <StyledSocialButton><i className={`${brandStyle} ${iconName} ${iconSize}`} /></StyledSocialButton>
);

SocialButton.defaultProps = {
  iconSize: 'fa-1x',
};

export default SocialButton;
