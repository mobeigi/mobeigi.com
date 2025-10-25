import ProjectsPage from '@/containers/ProjectsPage';
import { Metadata } from 'next';
import { getPayload } from 'payload';
import config from '@payload-config';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateBreadcrumbs } from './breadcrumbs';
import { unstable_cacheLife as cacheLife } from 'next/cache';
import { Project } from '@/types/projects';
import { Media, Post } from '@/payload-types';
import { resolvePostsUrl } from '@/payload/collections/Posts/resolveUrl';
import { sortProjectByTitle } from '@/utils/project/sort';

/**
 * Data fetching
 */
const getProjects = async () => {
  'use cache';
  cacheLife('alwaysCheck15m');

  const payload = await getPayload({
    config,
  });

  const payloadProjects = await payload.find({
    collection: 'projects',
    depth: 1,
    limit: 0,
    pagination: false,
  });

  // Transform to Project type
  const projects: Project[] = (
    await Promise.all(
      payloadProjects.docs.map(async (project) => {
        const blogPostUrl = project.post ? await resolvePostsUrl(project.post as Post) : undefined;

        return {
          title: project.title,
          description: project.description,
          image: {
            url: (project.image as Media).url!,
            alt: (project.image as Media).alt,
          },
          url: project.url ?? undefined,
          urlActive: project.urlActive ?? undefined,
          blogPostUrl: blogPostUrl ?? undefined,
          githubUrl: project.githubUrl ?? undefined,
        };
      }),
    )
  ).sort(sortProjectByTitle);

  return projects;
};

/**
 * Metadata
 */
export const metadata: Metadata = {
  title: 'Projects',
  description:
    "Discover Mo Beigi's most interesting projects, dive into open-source code, and explore related blog posts.",
};

/**
 * Handler
 */
const Projects = async () => {
  const projects = await getProjects();
  const breadcrumbs = generateBreadcrumbs();
  return (
    <div>
      {breadcrumbs && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
          <Breadcrumbs breadcrumbList={breadcrumbs} />
        </>
      )}
      <ProjectsPage projects={projects} />
    </div>
  );
};

export default Projects;
