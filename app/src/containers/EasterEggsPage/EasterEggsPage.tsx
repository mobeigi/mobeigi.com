import Link from 'next/link';

export const EasterEggsPage = () => (
  <section>
    <h1>Easter Eggs</h1>
    <p>
      I&apos;ve added various Easter Eggs to my website for fun. You can find out about <strong>some</strong> of them
      below.
    </p>
    <h2>Robot in my robots.txt</h2>
    <p>Hmm, how did that get in there?</p>
    <p>
      <Link href="/robots.txt">robots.txt</Link>
    </p>
    <h2>Public Private Key</h2>
    <p>I&apos;ll trust you not to spy on me. 🙏</p>
    <p>
      <Link href="/sec/mo-beigi-pgp-priv.asc">mo-beigi-pgp-priv.asc</Link>
    </p>
  </section>
);
