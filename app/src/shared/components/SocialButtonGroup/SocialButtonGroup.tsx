import React from 'react';
import Link from '../../utils/Link';
import SocialButton from './SocialButton';
import type { SocialButtonProps } from './SocialButton/SocialButton';
import { StyledSocialButtonGroup } from './styled';

type SocialButtonWithLinkType = {
  link: string,
  title: string,
  external?: boolean,
  nofollow?: boolean,
  socialButton: SocialButtonProps,
};

type Props = {
  data: SocialButtonWithLinkType[],
};

type State = {
  socialButtonWithLinkList: SocialButtonWithLinkType[];
};

class SocialButtonGroup extends React.Component<Props, State> {
  static defaultProps = {
    external: false,
    nofollow: false,
  };

  static propTypes = {
  };

  constructor(props: Props) {
    super(props);
    const { data } = this.props;
    this.state = { socialButtonWithLinkList: data };
  }

  getRelAttribute = (external?: boolean, nofollow?: boolean): string => {
    const arr = [];
    if (external) { arr.push('external'); }
    if (nofollow) { arr.push('nofollow'); }
    return arr.join(' ');
  };

  render() : JSX.Element {
    const { socialButtonWithLinkList } = this.state;
    const socialButtons = socialButtonWithLinkList.map((socialButtonWithLink) => {
      const relAttribute = this.getRelAttribute(
        socialButtonWithLink.external,
        socialButtonWithLink.nofollow,
      );
      return (
        <Link
          key={socialButtonWithLink.title}
          to={socialButtonWithLink.link}
          title={socialButtonWithLink.title}
          aria-label={socialButtonWithLink.title}
          rel={relAttribute || undefined}
        >
          <SocialButton
            brandStyle={socialButtonWithLink.socialButton.brandStyle}
            iconName={socialButtonWithLink.socialButton.iconName}
            iconSize={socialButtonWithLink.socialButton.iconSize}
          />
        </Link>
      );
    });
    return <StyledSocialButtonGroup>{socialButtons}</StyledSocialButtonGroup>;
  }
}

export default SocialButtonGroup;
