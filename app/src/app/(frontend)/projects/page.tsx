import ProjectsPage from '@/containers/ProjectsPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    "Discover Mo Beigi's most interesting projects, dive into open-source code, and explore related blog posts.",
};

const Projects = () => <ProjectsPage />;

export default Projects;
