import React from 'react';

import '../../../assets/fontawesomepro/5.8.2/css/all.min.css';

export type SocialButtonProps = {
  brandStyle: string
  iconName: string
  iconSize?: string
}

const SocialButton = ({
  brandStyle, iconName, iconSize,
} : SocialButtonProps) => (
  <i className={`${brandStyle} ${iconName} ${iconSize}`} />
);

SocialButton.defaultProps = {
  iconSize: 'fa-1x',
};

export default SocialButton;
