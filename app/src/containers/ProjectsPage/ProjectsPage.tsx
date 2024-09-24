import ProjectBox from '@/components/ProjectBox';
import { ProjectsContainer } from './styled';
import { projects } from '@/constants/projects';

export const ProjectsPage = () => (
  <section>
    <h1>Projects</h1>
    <p>
      Discover my most interesting projects below, and check out my other projects on{' '}
      <a href="https://github.com/mobeigi" rel="nofollow">
        Github
      </a>
      .
    </p>
    <ProjectsContainer>
      {projects
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((project) => (
          <ProjectBox
            key={project.title}
            imgSrc={project.imgSrc}
            imgAlt={project.imgAlt}
            title={project.title}
            description={project.description}
            url={project.url}
            urlActive={project.urlActive}
            blogUrl={project.blogUrl}
            githubUrl={project.githubUrl}
          />
        ))}
    </ProjectsContainer>
  </section>
);
