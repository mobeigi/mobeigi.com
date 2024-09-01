import { ProjectBoxProps } from '@/components/ProjectBox/types';

export const projects: ProjectBoxProps[] = [
  {
    imgSrc: '/images/projects/articlevoid-screenshot.jpg',
    imgAlt: 'ArticleVoid website screenshot',
    title: 'ArticleVoid',
    description: 'ArticleVoid is an article directory that hosts unique and informative content.',
    url: 'http://www.articlevoid.com',
    urlActive: false,
  },
  {
    imgSrc: '/images/projects/fakebsod-com-screenshot.jpg',
    imgAlt: 'FakeBSOD.com website screenshot',
    title: 'FakeBSOD.com',
    description: 'Prank your friends, family and co-workers with this Fake Blue Screen of Death (BSOD) simulator.',
    url: 'https://fakebsod.com',
    urlActive: true,
    githubUrl: 'https://github.com/mobeigi/fakebsod.com',
  },
  {
    imgSrc: '/images/projects/flappy-siavash-demo.webp',
    imgAlt: 'Flappy Siavash Game Demo',
    title: 'Flappy Siavash',
    description: 'This is a Flappy Bird clone I made to learn libGDX, staring my Green Cheek Conure Siavash.',
    url: 'https://mobeigi.dev/flappysiavash',
    urlActive: true,
    blogUrl: 'https://mobeigi.com/blog/development/programming/making-my-first-libgdx-game/', //TODO: Make relative and point to new blog url
    githubUrl: 'https://github.com/mobeigi/Flappy-Siavash',
  },
  {
    imgSrc: '/images/projects/chessort-screenshot.jpg',
    imgAlt: 'Chessort website screenshot',
    title: 'Chessort',
    description: "Chessort is a Chess puzzle game where you sort moves based on the chess engine's evaluation.",
    url: 'https://chessort.com',
    urlActive: true,
    blogUrl: 'https://mobeigi.com/blog/development/programming/creating-chessort/', //TODO: Make relative and point to new blog url
    githubUrl: 'https://github.com/mobeigi/chessort',
  },
  {
    imgSrc: '/images/projects/invex-gaming-project-logo.jpg',
    imgAlt: 'Invex Gaming project logo',
    title: 'Invex Gaming',
    description: 'Australian and New Zealand based online gaming community founded in late 2014.',
    url: 'https://invex.gg',
    urlActive: true,
    githubUrl: 'https://github.com/invexgaming',
  },
  {
    imgSrc: '/images/projects/fb2cal-project-logo.jpg',
    imgAlt: 'fb2cal project logo',
    title: 'fb2cal',
    description: 'Fetch Facebook Birthdays events and create an ICS file for use with calendar apps.',
    url: 'https://pypi.org/project/fb2cal/',
    urlActive: true,
    blogUrl:
      'https://mobeigi.com/blog/development/programming/restoring-facebooks-birthday-calendar-export-feature-fb2cal/', //TODO: Make relative and point to new blog url
    githubUrl: 'https://github.com/mobeigi/fb2cal',
  },
  {
    imgSrc: '/images/projects/mobeigi-com-project-logo.jpg',
    imgAlt: 'mobeigi.com project logo',
    title: 'mobeigi.com',
    description: 'My shiny, personal, custom-built website powered by React!',
    url: 'https://mobeigi.com',
    urlActive: true,
    githubUrl: 'https://github.com/mobeigi/mobeigi.com',
  },
];
