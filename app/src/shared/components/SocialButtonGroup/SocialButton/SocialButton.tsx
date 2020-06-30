import React from 'react';

import '../../../assets/fontawesomepro/5.13.1/css/all.min.css';
import { StyledSocialButton } from './styled';

export type SocialButtonProps = {
  brandStyle: string
  iconName: string
  iconSize?: string
};

const SocialButton : React.FunctionComponent<SocialButtonProps> = ({
  brandStyle, iconName, iconSize,
} : SocialButtonProps) => (
  <StyledSocialButton><i className={`${brandStyle} ${iconName} ${iconSize}`} /></StyledSocialButton>
);

SocialButton.defaultProps = {
  iconSize: 'fa-1x',
};

export default SocialButton;
