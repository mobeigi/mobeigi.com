import Link from 'next/link';
import Error404Svg from '@/assets/icons/internet/404.svg';
import { NotFoundPageContainer, TextContainer } from './styled';

export const NotFoundPage = () => (
  <NotFoundPageContainer>
    <h1>Not Found</h1>
    <Error404Svg width="15em" height="12em" />
    <TextContainer>
      <p>The page you are looking for was not found.</p>
      <br />
      <p>
        If you think this is an error, please <Link href="/contact/">contact</Link> me.
      </p>
      <p>
        Otherwise, feel free to return to the <Link href="/">home</Link> page.
      </p>
    </TextContainer>
  </NotFoundPageContainer>
);
