import Link from 'next/link';
import { CenteredH1, Headshot } from './styled';
import AuFlagSvg from '@/assets/flags/au.svg';

const getAgeFromDate = (dateString: string) => {
  const birthDate = new Date(dateString);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // If birth month hasn't been reached yet this year, or it's the birth month but the day hasn't occurred yet
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

export const AboutPage = () => {
  const ageInYears = getAgeFromDate('1994-07-20');
  return (
    <div>
      <Headshot />
      <CenteredH1>Howdy!</CenteredH1>
      <p>
        My name is <strong>Mo</strong>. I am {ageInYears} years old and live in <AuFlagSvg width="1em" height="auto" />{' '}
        <strong>Sydney, Australia</strong>.
      </p>
      <p>
        I am a Software Engineer and a{' '}
        <Link href="https://www.unsw.edu.au/" title="UNSW" rel="nofollow">
          University of New South Wales
        </Link>{' '}
        alumnus.
      </p>
      <p>
        I love computers and technology and the impact they have on our everyday lives. There is no greater feeling than
        creating something that people use and genuinely enjoy. For this reason I have been interested in website
        development since I was 10 years old. This was around about the time my father bought our family&apos;s first
        computer. I wasted no time teaching myself HTML, CSS and, learning about web standards and protocols.
      </p>
      <p>
        I consider myself to be a strong programmer who can design elegant solutions and write clean, efficient code. I
        love to learn and am always learning. You can find the projects I have been involved with on my{' '}
        <Link href="/projects" title="Projects">
          projects
        </Link>{' '}
        page and you can review my code on{' '}
        <Link href="https://github.com/mobeigi/" title="Github (Mo Beigi)" rel="nofollow">
          Github
        </Link>
        .
      </p>
      <p>
        Outside of programming, I enjoy playing soccer, video games and the piano. I also love swimming, travelling and,
        spending time with friends and family.
      </p>
      <p>The main purpose of this website is to showcase my work as well as document my learnings.</p>
      <p>
        If you want to chat about anything, please{' '}
        <Link href="/contact" title="Contact">
          contact
        </Link>{' '}
        me.
      </p>
      <p>
        Regards,
        <br />
        Mo
      </p>
    </div>
  );
};
