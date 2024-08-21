import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { StyledHomepage } from './styled';
import { Header } from './Header';
import { COMMON } from '../shared/constants/Common';
import { ResumeModal } from './ResumeModal';
import { SocialButtonGroup } from '../shared/components/SocialButtonGroup';
import { MonospacedParagraph, StyledButton } from '../shared/styles/common';

const myStuffSBG = [
  {
    link: '/blog',
    title: "Mo Beigi's Blog",
    forceReload: true,
    socialButton: { brandStyle: 'fas', iconName: 'fa-blog', iconSize: 'fa-3x' },
  },
  {
    link: 'https://paste.mobeigi.com',
    title: "Mo's Privatebin",
    socialButton: { brandStyle: 'fas', iconName: 'fa-paste', iconSize: 'fa-3x' },
  },
  {
    link: 'https://mobeigi.atlassian.net/',
    title: "Mo's Jira",
    external: true,
    nofollow: true,
    socialButton: { brandStyle: 'fab', iconName: 'fa-jira', iconSize: 'fa-3x' },
  },
  {
    link: 'https://mobeigi.atlassian.net/wiki',
    title: "Mo's Confluence",
    external: true,
    nofollow: true,
    socialButton: { brandStyle: 'fab', iconName: 'fa-confluence', iconSize: 'fa-3x' },
  },
  {
    link: 'https://obs.mobeigi.com',
    title: 'Observability',
    external: true,
    nofollow: true,
    socialButton: { brandStyle: 'fas', iconName: 'fa-radar', iconSize: 'fa-3x' },
  },
  {
    link: '/trades',
    title: 'Trades',
    socialButton: { brandStyle: 'fas', iconName: 'fa-sack-dollar', iconSize: 'fa-3x' },
  },
  {
    link: 'https://photos.mobeigi.com',
    title: 'Photos',
    socialButton: { brandStyle: 'fas', iconName: 'fa-camera', iconSize: 'fa-3x' },
  },
  {
    link: '#resume',
    title: "Mo Beigi's Résumé",
    socialButton: { brandStyle: 'fas', iconName: 'fa-file-certificate', iconSize: 'fa-3x' },
  },
  {
    link: '/sec/mo-beigi-pgp-pub.asc',
    title: "Mo's PGP Key",
    forceReload: true,
    socialButton: { brandStyle: 'fas', iconName: 'fa-key', iconSize: 'fa-3x' },
  },
  {
    link: '/blog/contact/',
    title: 'Contact Me',
    forceReload: true,
    socialButton: { brandStyle: 'fas', iconName: 'fa-envelope', iconSize: 'fa-3x' },
  },
];

const networks = [
  {
    link: 'https://github.com/mobeigi',
    title: 'Github (mobeigi)',
    external: true,
    nofollow: true,
    socialButton: { brandStyle: 'fab', iconName: 'fa-github', iconSize: 'fa-3x' },
  },
  {
    link: 'https://bitbucket.org/mobeigi/',
    title: 'Bitbucket (mobeigi)',
    external: true,
    nofollow: true,
    socialButton: { brandStyle: 'fab', iconName: 'fa-bitbucket', iconSize: 'fa-3x' },
  },
  {
    link: 'https://gitlab.com/mobeigi',
    title: 'Gitlab (mobeigi)',
    external: true,
    nofollow: true,
    socialButton: { brandStyle: 'fab', iconName: 'fa-gitlab', iconSize: 'fa-3x' },
  },
  {
    link: 'https://stackexchange.com/users/905320/mo-beigi?tab=accounts',
    title: 'Stack Exchange (Mo Beigi)',
    external: true,
    nofollow: true,
    socialButton: { brandStyle: 'fab', iconName: 'fa-stack-exchange', iconSize: 'fa-3x' },
  },
  {
    link: 'https://www.hackerrank.com/mobeigi',
    title: 'HackerRank (mobeigi)',
    external: true,
    nofollow: true,
    socialButton: { brandStyle: 'fab', iconName: 'fa-hackerrank', iconSize: 'fa-3x' },
  },
  {
    link: 'https://leetcode.com/mobeigi/',
    title: 'LeetCode (mobeigi)',
    external: true,
    nofollow: true,
    socialButton: { brandStyle: 'fas', iconName: 'fa-lira-sign', iconSize: 'fa-3x' },
  },
  {
    link: 'https://www.linkedin.com/in/mobeigi17/',
    title: 'LinkedIn (mobeigi17)',
    external: true,
    nofollow: true,
    socialButton: { brandStyle: 'fab', iconName: 'fa-linkedin-in', iconSize: 'fa-3x' },
  },
  {
    link: 'https://dev.to/mobeigi',
    title: 'DEV (mobeigi)',
    external: true,
    nofollow: true,
    socialButton: { brandStyle: 'fab', iconName: 'fa-dev', iconSize: 'fa-3x' },
  },
  {
    link: 'https://play.google.com/store/apps/dev?id=7760934167916887403',
    title: 'Play Store (Mo Beigi)',
    external: true,
    nofollow: true,
    socialButton: { brandStyle: 'fab', iconName: 'fa-google-play', iconSize: 'fa-3x' },
  },
  {
    link: 'https://invex.gg/member.php?action=profile&uid=1',
    title: 'Invex Gaming (Byte)',
    external: true,
    nofollow: true,
    socialButton: { brandStyle: 'fas', iconName: 'fa-dragon', iconSize: 'fa-3x' },
  },
  {
    link: 'https://discordapp.com/users/356003102169759755',
    title: 'Discord (Byte#0017)',
    external: true,
    nofollow: true,
    socialButton: { brandStyle: 'fab', iconName: 'fa-discord', iconSize: 'fa-3x' },
  },
  {
    link: 'http://steamcommunity.com/profiles/76561198108407557',
    title: 'Steam (InvexByte)',
    external: true,
    nofollow: true,
    socialButton: { brandStyle: 'fab', iconName: 'fa-steam', iconSize: 'fa-3x' },
  },
  {
    link: 'https://www.reddit.com/user/persianmg',
    title: 'Reddit (persianmg)',
    external: true,
    nofollow: true,
    socialButton: { brandStyle: 'fab', iconName: 'fa-reddit-alien', iconSize: 'fa-3x' },
  },
  {
    link: 'https://www.youtube.com/c/mobeigi',
    title: 'Youtube (Mo Beigi)',
    external: true,
    nofollow: true,
    socialButton: { brandStyle: 'fab', iconName: 'fa-youtube', iconSize: 'fa-3x' },
  },
  {
    link: 'https://www.facebook.com/mobeigi',
    title: 'Facebook (mobeigi)',
    external: true,
    nofollow: true,
    socialButton: { brandStyle: 'fab', iconName: 'fa-facebook-square', iconSize: 'fa-3x' },
  },
  {
    link: 'https://www.instagram.com/mobeigi17/',
    title: 'Instagram (mobeigi17)',
    external: true,
    nofollow: true,
    socialButton: { brandStyle: 'fab', iconName: 'fa-instagram', iconSize: 'fa-3x' },
  },
  {
    link: 'https://twitter.com/mobeigi17',
    title: 'Twitter (mobeigi17)',
    external: true,
    nofollow: true,
    socialButton: { brandStyle: 'fab', iconName: 'fa-twitter', iconSize: 'fa-3x' },
  },
  {
    link: 'https://www.snapchat.com/add/persianmg',
    title: 'Snapchat (persianmg)',
    external: true,
    nofollow: true,
    socialButton: { brandStyle: 'fab', iconName: 'fa-snapchat-ghost', iconSize: 'fa-3x' },
  },
];

export const Homepage = () => {
  const [state, setState] = useState({ isResumeModalOpen: false });
  const history = useHistory();
  const location = useLocation();

  const openResumeModal = () => {
    setState((prevState) => ({
      ...prevState,
      isResumeModalOpen: true,
    }));
  };

  const closeResumeModal = () => {
    setState((prevState) => ({
      ...prevState,
      isResumeModalOpen: false,
    }));
    history.push('/');
  };

  useEffect(() => {
    // Trigger modal
    if (!state.isResumeModalOpen && location.hash === '#resume') {
      openResumeModal();
    }
  }, [location.hash]);

  return (
    <StyledHomepage>
      <Helmet>
        <title>
          {COMMON.WEBSITE.titlePrefix}
          Software Engineer
        </title>
        <link rel="canonical" href={COMMON.WEBSITE.baseURL} />
        <meta
          name="description"
          content="Howdy, I&#039;m Mo and this is my personal website. Please check out my programming blog and hit me up if you would like to chat!"
        />
        <meta
          name="keywords"
          content="mo beigi, mobeigi, mobeigi17, ghasembeigi, mohammadg, persianmg, security, hacker, programming, coding, website development, software engineer, sydney, australia"
        />
      </Helmet>
      <ResumeModal isOpen={state.isResumeModalOpen} onRequestClose={closeResumeModal} />
      <Header />
      <br />
      <MonospacedParagraph style={{ fontSize: '1.2rem' }}>My Stuff</MonospacedParagraph>
      <div style={{ maxWidth: '450px', margin: '0 auto' }}>
        <SocialButtonGroup data={myStuffSBG} />
      </div>
      <br />
      <MonospacedParagraph style={{ fontSize: '1.2rem' }}>Networks</MonospacedParagraph>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <SocialButtonGroup data={networks} />
      </div>
      <br />
      <a href={myStuffSBG[0].link} title={myStuffSBG[0].title}>
        <StyledButton type="button" style={{ margin: '0 auto' }}>
          CONTINUE TO BLOG
        </StyledButton>
      </a>
    </StyledHomepage>
  );
};
