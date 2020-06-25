import React, { Component } from 'react';

import type { SocialButtonProps } from './SocialButton/SocialButton';

type SocialButtonWithLinkType = {
    href: string,
    title: string,
    socialButton: SocialButtonProps,
}

type State = {
    socialButtonList: SocialButtonWithLinkType[];
}

class SocialButtonGroup extends Component<any, State> {
  constructor(props : any) {
    super(props);
    this.state = { socialButtonList: [] };
  }

  render() {
    const { socialButtonList } = this.state;
    return socialButtonList.map((socialButton) => <div key={socialButton.title}>111</div>);
  }
}

export default SocialButtonGroup;
