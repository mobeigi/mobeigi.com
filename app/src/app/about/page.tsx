import AboutPage from '@/containers/AboutPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Mo, a Software Engineer from Sydney, who showcases his tech projects, development skills, and personal interests.',
  keywords: [
    'Mo',
    'about',
    'learn',
    'software engineer',
    'sydney',
    'australia',
    'soccer',
    'video games',
    'piano',
    'swimming',
    'travel',
  ],
};

const About = () => <AboutPage />;

export default About;
