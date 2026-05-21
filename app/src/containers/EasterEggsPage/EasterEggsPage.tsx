import Link from 'next/link';

export const EasterEggsPage = () => (
  <section>
    <h1>Easter Eggs</h1>
    <p>
      I&apos;ve added various Easter Eggs to my website for fun. You can find out about <strong>some</strong> of them
      below.
    </p>
    <h2>Robot in robots.txt</h2>
    <p>Hmm, how did that get in there?</p>
    <p>
      <Link href="/robots.txt">robots.txt</Link>
    </p>
    <h2>Public Private Key</h2>
    <p>I&apos;ll trust you not to spy on me. 🙏</p>
    <p>
      <Link href="/sec/mo-beigi-pgp-priv.asc">mo-beigi-pgp-priv.asc</Link>
    </p>
    <h2>Leaked .env</h2>
    <p>Oops, forgot to exclude this from the build.</p>
    <p>
      <Link href="/.env">.env</Link>
    </p>
    <h2>HTTP Headers</h2>
    <p>Worth the extra 27 bytes per response.</p>
    <p>
      <code>curl -I https://mobeigi.com</code>
    </p>
  </section>
);
