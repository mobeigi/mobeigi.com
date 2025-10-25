import ProjectBox from '@/components/ProjectBox';
import { ProjectsContainer } from './styled';
import { ProjectsPageProps } from './types';

export const ProjectsPage = ({ projects }: ProjectsPageProps) => (
  <section>
    <h1>Projects</h1>
    <p>
      Discover my most interesting projects below, and check out my other projects on{' '}
      <a href="https://github.com/mobeigi" title="GitHub (mobeigi)" rel="nofollow">
        GitHub
      </a>
      .
    </p>
    <ProjectsContainer>
      {projects.slice().map((project) => (
        <ProjectBox
          key={project.title}
          imgSrc={project.image.url}
          imgAlt={project.image.alt}
          title={project.title}
          description={project.description}
          url={project.url}
          urlActive={project.urlActive}
          blogPostUrl={project.blogPostUrl}
          githubUrl={project.githubUrl}
        />
      ))}
    </ProjectsContainer>
  </section>
);
