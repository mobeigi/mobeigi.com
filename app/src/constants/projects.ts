import { ProjectBoxProps } from '@/components/ProjectBox/types';

export const projects: ProjectBoxProps[] = [
  {
    title: 'ArticleVoid',
    description: 'ArticleVoid is an article directory that hosts unique and informative content.',
    url: 'http://www.articlevoid.com',
    urlActive: false,
    imgSrc: '/images/projects/articlevoid-screenshot.jpg',
    imgAlt: 'ArticleVoid website screenshot',
  },
  {
    title: 'FakeBSOD.com',
    description: 'Prank your friends, family and co-workers with this Fake Blue Screen of Death (BSOD) simulator.',
    url: 'https://fakebsod.com',
    urlActive: true,
    imgSrc: '/images/projects/fakebsod-com-screenshot.jpg',
    imgAlt: 'FakeBSOD.com website screenshot',
    githubUrl: 'https://github.com/mobeigi/fakebsod.com',
  },
  {
    title: 'Flappy Siavash',
    description: 'This is a Flappy Bird clone I made to learn libGDX, staring my Green Cheek Conure Siavash.',
    url: 'https://mobeigi.dev/flappysiavash',
    urlActive: true,
    imgSrc: '/images/projects/flappy-siavash-demo.webp',
    imgAlt: 'Flappy Siavash Game Demo',
    blogUrl: 'https://mobeigi.com/blog/development/programming/making-my-first-libgdx-game/', //TODO: Make relative and point to new blog url
    githubUrl: 'https://github.com/mobeigi/Flappy-Siavash',
  },
  {
    title: 'Chessort',
    description: "Chessort is a Chess puzzle game where you sort moves based on the chess engine's evaluation.",
    url: 'https://chessort.com',
    urlActive: true,
    imgSrc: '/images/projects/chessort-screenshot.jpg',
    imgAlt: 'Chessort website screenshot',
    blogUrl: 'https://mobeigi.com/blog/development/programming/creating-chessort/', //TODO: Make relative and point to new blog url
    githubUrl: 'https://github.com/mobeigi/chessort',
  },
  {
    title: 'Invex Gaming',
    description: 'Australian and New Zealand based online gaming community founded in late 2014.',
    url: 'https://invex.gg',
    urlActive: true,
    imgSrc: '/images/projects/invex-gaming-project-logo.jpg',
    imgAlt: 'Invex Gaming project logo',
    githubUrl: 'https://github.com/invexgaming',
  },
  {
    title: 'fb2cal',
    description: 'Fetch Facebook Birthdays events and create an ICS file for use with calendar apps.',
    url: 'https://pypi.org/project/fb2cal/',
    urlActive: true,
    imgSrc: '/images/projects/fb2cal-project-logo.jpg',
    imgAlt: 'fb2cal project logo',
    blogUrl:
      'https://mobeigi.com/blog/development/programming/restoring-facebooks-birthday-calendar-export-feature-fb2cal/', //TODO: Make relative and point to new blog url
    githubUrl: 'https://github.com/mobeigi/fb2cal',
  },
  {
    title: 'mobeigi.com',
    description: 'My shiny, personal, custom-built website powered by React!',
    url: 'https://mobeigi.com',
    urlActive: true,
    imgSrc: '/images/projects/mobeigi-com-project-logo.jpg',
    imgAlt: 'mobeigi.com project logo',
    githubUrl: 'https://github.com/mobeigi/mobeigi.com',
  },
];
