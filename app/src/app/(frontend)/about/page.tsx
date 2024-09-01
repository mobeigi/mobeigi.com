import AboutPage from '@/containers/AboutPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Mo, a Software Engineer from Sydney, who showcases his tech projects, development skills, and personal interests.',
};

const About = () => <AboutPage />;

export default About;
