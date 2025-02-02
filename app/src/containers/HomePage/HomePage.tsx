import {
  HomePageSection,
  CustomIconWrapper as IconWrapper,
  IconAndTextContainer,
  PhotographyImageWrapper,
  PhotographyTag,
  BlogSummaryWrapper,
  PhotographyImagesWrapper,
  GitContributionGraphOverflow,
  GitContributionGraphWrapper,
} from './styled';
import CalendarSvg from '@/assets/icons/boxicons/bx-calendar.svg';
import FileSvg from '@/assets/icons/boxicons/bx-file.svg';
import Link from 'next/link';
import Image from 'next/image';
import { format as formatDate } from 'date-fns';
import { HomePageProps } from './types';
import BlogSummary from '@/components/BlogSummary';
import PersonShowcase from '@/components/PersonShowcase';
import GitContributionGraph from '@/components/GitContributionGraph';

export const HomePage = ({
  latestBlogPostMetas,
  latestPhotographyImages,
  latestDevelopmentActivity,
}: HomePageProps) => (
  <HomePageSection>
    <header>
      <PersonShowcase headshotWidth="14em" headshotHeight="14em" headingLevel="h1" />
    </header>

    <section>
      <h2>Hi, I&apos;m Mo! Welcome to my online portfolio 😊</h2>
      <p>
        I am a full stack Software Engineer. I love sharing my thoughts and insights through my{' '}
        <Link href="/blog/">blog posts</Link>, and working on several interesting{' '}
        <Link href="/projects/">projects</Link>. I would love to have a chat so kindly{' '}
        <Link href="/contact/">contact me</Link>.
      </p>
      <p>
        Learn more <Link href="/about/">about me</Link>.
      </p>
    </section>
    <hr />
    <section>
      <h2>Latest blog {latestBlogPostMetas.length === 1 ? 'post' : 'posts'}</h2>
      {latestBlogPostMetas.length > 0 ? (
        <p>
          Showing the latest <strong>{latestBlogPostMetas.length}</strong>{' '}
          {latestBlogPostMetas.length === 1 ? 'post' : 'posts'}.
        </p>
      ) : (
        <p>There are no posts found to display.</p>
      )}
      <BlogSummaryWrapper>
        {latestBlogPostMetas.length > 0 &&
          latestBlogPostMetas.map((meta) => (
            <article key={meta.post.id}>
              <BlogSummary blogPostMeta={meta} headingLevel="h3" />
            </article>
          ))}
      </BlogSummaryWrapper>
    </section>
    {latestDevelopmentActivity && (
      <>
        <hr />
        <section>
          <h2>Latest development activity</h2>
          <p>
            Showing <strong>{latestDevelopmentActivity.totalContributions}</strong>{' '}
            {latestDevelopmentActivity.totalContributions === 1 ? 'contribution' : 'contributions'} in the last year.
          </p>
          <GitContributionGraphOverflow>
            <GitContributionGraphWrapper>
              <GitContributionGraph data={latestDevelopmentActivity.contributions} />
            </GitContributionGraphWrapper>
          </GitContributionGraphOverflow>
          <p>
            Check out my latest code on{' '}
            <a href="https://github.com/mobeigi/" title="GitHub (mobeigi)" rel="nofollow">
              GitHub
            </a>
            .
          </p>
        </section>
      </>
    )}
    {latestPhotographyImages && latestPhotographyImages.length > 0 && (
      <>
        <hr />
        <section>
          <h2>Latest {latestPhotographyImages.length === 1 ? 'photo' : 'photos'}</h2>
          <p>
            Through my lens, I capture the world. View my shots on{' '}
            <a href="https://photos.mobeigi.com/">photos.mobeigi.com</a> or{' '}
            <a href="https://www.instagram.com/lensofmobeigi" title="Instagram (lensofmobeigi)" rel="nofollow">
              Instagram
            </a>
            .
          </p>
          <p>
            Showing the latest <strong>{latestPhotographyImages.length}</strong>{' '}
            {latestBlogPostMetas.length === 1 ? 'photo' : 'photos'}.
          </p>
          <PhotographyImagesWrapper>
            {latestPhotographyImages.map((photographyImage) => (
              <div key={photographyImage.filename}>
                <PhotographyImageWrapper>
                  <Image
                    src={photographyImage.thumbsUrl}
                    alt="Latest Photograpy Image"
                    width={750}
                    height={750}
                    quality={100}
                    draggable={false}
                  />
                </PhotographyImageWrapper>
                <PhotographyTag>
                  <IconAndTextContainer data-tooltip-id="global-tooltip" data-tooltip-content="Date taken">
                    <IconWrapper>
                      <CalendarSvg />
                    </IconWrapper>
                    <span>{formatDate(photographyImage.date, 'd MMMM yyyy')}</span>
                  </IconAndTextContainer>
                  <IconAndTextContainer data-tooltip-id="global-tooltip" data-tooltip-content="Photo name">
                    <IconWrapper>
                      <FileSvg />
                    </IconWrapper>
                    <span>{photographyImage.niceName}</span>
                  </IconAndTextContainer>
                </PhotographyTag>
              </div>
            ))}
          </PhotographyImagesWrapper>
        </section>
      </>
    )}
  </HomePageSection>
);
