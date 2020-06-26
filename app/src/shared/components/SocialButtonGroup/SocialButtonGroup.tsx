import React, { Component } from 'react';
import SocialButton from './SocialButton';
import type { SocialButtonProps } from './SocialButton/SocialButton';
import { StyledSocialButtonGroup } from './styled';

type SocialButtonWithLinkType = {
    link: string,
    title: string,
    socialButton: SocialButtonProps,
}

type Props = {
  data: SocialButtonWithLinkType[],
}

type State = {
  socialButtonWithLinkList: SocialButtonWithLinkType[];
}

class SocialButtonGroup extends Component<Props, State> {
  constructor(props : any) {
    super(props);
    const { data } = this.props;
    this.state = { socialButtonWithLinkList: data };
  }

  render() {
    const { socialButtonWithLinkList } = this.state;
    const socialButtons = socialButtonWithLinkList.map((socialButtonWithLink) => (
      <a
        key={socialButtonWithLink.title}
        href={socialButtonWithLink.link}
        title={socialButtonWithLink.title}
        aria-label={socialButtonWithLink.title}
      >
        <SocialButton
          brandStyle={socialButtonWithLink.socialButton.brandStyle}
          iconName={socialButtonWithLink.socialButton.iconName}
          iconSize={socialButtonWithLink.socialButton.iconSize}
        />
      </a>
    ));
    return <StyledSocialButtonGroup>{socialButtons}</StyledSocialButtonGroup>;
  }
}

export default SocialButtonGroup;
