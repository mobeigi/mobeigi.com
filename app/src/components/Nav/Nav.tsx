import Link from 'next/link';

export const Nav = () => (
  <nav>
    <Link href={'/'}>Home</Link>
    <Link href={'/about'}>About</Link>
  </nav>
);
