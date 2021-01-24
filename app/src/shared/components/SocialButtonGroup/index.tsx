import React from 'react';
import TargetAwareLink from '../../utils/TargetAwareLink';
import SocialButton from './SocialButton';
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

type Props = {
  data: SocialButtonWithLinkType[];
};

type State = {
  socialButtonWithLinkList: SocialButtonWithLinkType[];
};

class SocialButtonGroup extends React.Component<Props, State> {
  static defaultProps = {
    external: false,
    nofollow: false,
    forceReload: false,
  };

  static propTypes = {};

  constructor(props: Props) {
    super(props);
    const { data } = this.props;
    this.state = { socialButtonWithLinkList: data };
  }

  getRelAttribute = (external?: boolean, nofollow?: boolean): string => {
    const arr = [];
    if (external) {
      arr.push('external');
    }
    if (nofollow) {
      arr.push('nofollow');
    }
    return arr.join(' ');
  };

  render(): JSX.Element {
    const { socialButtonWithLinkList } = this.state;
    const socialButtons = socialButtonWithLinkList.map((socialButtonWithLink) => {
      const relAttribute = this.getRelAttribute(socialButtonWithLink.external, socialButtonWithLink.nofollow);
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
  }
}

export default SocialButtonGroup;
