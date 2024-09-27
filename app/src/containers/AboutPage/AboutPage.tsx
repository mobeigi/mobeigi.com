'use client';
// Uncomment during local development (with hot reloading) to fix @svgr/webpack bug.
// TODO: Remove above workaround when @svgr/webpack bug is resolved. This component does not need to be a client side component.
// Github link: https://github.com/vercel/next.js/issues/69545

import Link from 'next/link';
import Image from 'next/image';
import {
  IconAndTextContainer,
  ImageWrapper,
  ProgrammingLanguagesContainer,
  CustomIconWrapper as IconWrapper,
} from './styled';

import AuFlagSvg from '@/assets/icons/flags/au.svg';
import CSvg from '@/assets/icons/misc/c.svg';
import CppSvg from '@/assets/icons/boxicons/bxl-c-plus-plus.svg';
import JavaSvg from '@/assets/icons/boxicons/bxl-java.svg';
import KotlinSvg from '@/assets/icons/misc/kotlin.svg';
import PythonSvg from '@/assets/icons/boxicons/bxl-python.svg';
import TypescriptSvg from '@/assets/icons/boxicons/bxl-typescript.svg';
import JavascriptSvg from '@/assets/icons/boxicons/bxl-javascript.svg';
import ReactSvg from '@/assets/icons/boxicons/bxl-react.svg';
import DataSvg from '@/assets/icons/boxicons/bx-data.svg';
import PersonShowcase from '@/components/PersonShowcase';

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
    <section>
      <h1>About</h1>
      <PersonShowcase />
      <h2>Introduction</h2>
      <p>
        My name is <strong>Mo</strong>. I am {ageInYears} years old and live in beautiful{' '}
        <strong>Sydney, Australia</strong>.{' '}
        <IconWrapper>
          <AuFlagSvg />
        </IconWrapper>
      </p>
      <ImageWrapper>
        <Image src="/images/about/sydney.webp" alt="Sydney" fill />
      </ImageWrapper>
      <p>
        I am a full stack Software Engineer and a{' '}
        <Link href="https://www.unsw.edu.au/" title="UNSW" rel="nofollow">
          University of New South Wales
        </Link>{' '}
        alumnus.
      </p>
      <p>
        I love computers and technology and the impact they have on our everyday lives. There is no greater feeling than
        creating something that people use and genuinely enjoy. For this reason I have been interested in development
        since I was 10 years old. This was around about the time my father bought our family&apos;s first computer. I
        wasted no time teaching myself HTML, CSS and, learning about web standards and protocols.
      </p>
      <p>To this day, my passion for programming burns hot! 🔥</p>
      <hr />
      <h2>Interests</h2>
      <p>Outside of programming, my interests are:</p>
      <ul>
        <li>⚽ Playing and watching soccer</li>
        <li>🎮 Video games</li>
        <li>🎹 Piano</li>
        <li>🏊 Swimming</li>
        <li>🚀 Travelling</li>
        <li>🍽️ Enjoying tasty food</li>
        <li>📈 Stock trading & financial markets</li>
        <li>👨‍👩‍👦 Spending time with friends and family</li>
      </ul>
      <hr />
      <h2>Professional Background</h2>
      <h3>Career</h3>
      <p>Notable historians claim that I am a full-time legend. Notable historians are correct in their assessment.</p>
      <p>
        To learn about my career history please visit my{' '}
        <a href="https://www.linkedin.com/in/mobeigi17/" title="Linked In (mobeigi17)" rel="nofollow">
          Linked In
        </a>
        , download my <Link href="/resume/">Resume</Link> or <Link href="/contact/">contact me</Link>.
      </p>
      <h3>Projects</h3>
      <p>
        I am always working on various <Link href="/projects/">projects</Link> and am very active in the development
        community. What can I say, I just love writing <s>bugs</s> code.
      </p>
      <h3>Skills</h3>
      <blockquote>
        I do have are a very particular set of skills, skills I have acquired over a long career, skills that make me a
        nightmare for people like you. If you approve my PR now, that will be the end of it. But if you don&apos;t, I
        will look for you. I will find you. And I will give you a mediocre peer performance review.
      </blockquote>
      <p>I dedicate my time and energy to staying proficient in these programming languages:</p>
      <ProgrammingLanguagesContainer>
        <IconAndTextContainer>
          <IconWrapper>
            <CSvg />
          </IconWrapper>
          <span>C</span>
        </IconAndTextContainer>
        <IconAndTextContainer>
          <IconWrapper>
            <CppSvg />
          </IconWrapper>
          <span>C++</span>
        </IconAndTextContainer>
        <IconAndTextContainer>
          <IconWrapper>
            <JavaSvg />
          </IconWrapper>
          <span>Java</span>
        </IconAndTextContainer>
        <IconAndTextContainer>
          <IconWrapper>
            <KotlinSvg />
          </IconWrapper>
          <span>Kotlin</span>
        </IconAndTextContainer>
        <IconAndTextContainer>
          <IconWrapper>
            <PythonSvg />
          </IconWrapper>
          <span>Python</span>
        </IconAndTextContainer>
        <IconAndTextContainer>
          <IconWrapper>
            <JavascriptSvg />
          </IconWrapper>
          <span>Javascript</span>
        </IconAndTextContainer>
        <IconAndTextContainer>
          <IconWrapper>
            <TypescriptSvg />
          </IconWrapper>
          <span>Typescript</span>
        </IconAndTextContainer>
        <IconAndTextContainer>
          <IconWrapper>
            <ReactSvg />
          </IconWrapper>
          <span>React</span>
        </IconAndTextContainer>
        <IconAndTextContainer>
          <IconWrapper>
            <DataSvg />
          </IconWrapper>
          <span>SQL</span>
        </IconAndTextContainer>
      </ProgrammingLanguagesContainer>
    </section>
  );
};
