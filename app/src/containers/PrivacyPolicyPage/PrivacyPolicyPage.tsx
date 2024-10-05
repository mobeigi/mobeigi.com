import Link from 'next/link';

export const PrivacyPolicyPage = () => (
  <section>
    <h1>Privacy Policy</h1>
    <p>Below is a summary of all of the information we collect about you.</p>
    <h2>Cookies</h2>
    <p>This website uses the following cookies:</p>
    <ul>
      <li>
        <strong>theme:</strong> Tracks your theme mode preference (<code>system</code>, <code>dark</code>,
        <code>light</code>) as well as your browsers <code>prefers-color-scheme</code> CSS media feature value.
      </li>
      <li>
        <strong>_ga:</strong> Used to power{' '}
        <a href="https://developers.google.com/analytics" rel="nofollow">
          Google Analytics
        </a>{' '}
        which tracks user behavior and interactions on the site. Please see{' '}
        <a href="https://policies.google.com/privacy" rel="nofollow">
          Google Privacy Policy
        </a>
        .
      </li>
    </ul>
    <h2>Comments</h2>
    <p>
      The blog section of this website supports authless user comments. Comments are stored on the server alongside
      other identifying metadata. Your <code>Display Name</code> will be displayed publicly. Your{' '}
      <code>Email Address</code> will not be shown publicly but is stored for anti-spam validation purposes.
    </p>
    <p>
      Your <code>Email Address</code> will be used to display your public{' '}
      <a href="https://gravatar.com/" rel="nofollow">
        Gravatar
      </a>{' '}
      image if you have previously configured it. See{' '}
      <a href="https://support.gravatar.com/account/data-privacy/" rel="nofollow">
        Gravatar Data privacy
      </a>
      .
    </p>
    <p>
      All the metadata from a comment including your <code>Email Address</code>, <code>Ip Address</code> and{' '}
      <code>User Agent</code> are stored and forwarded to{' '}
      <a href="https://akismet.com/" rel="nofollow">
        Akismet&apos;s
      </a>{' '}
      spam protection API service. See{' '}
      <a href="https://akismet.com/privacy/" rel="nofollow">
        Akismet Privacy Policy
      </a>
      .
    </p>
    <h2>Views</h2>
    <p>
      The blog section of this website tracks views. Your <code>Ip Address</code> and <code>User Agent</code> is
      temporarily stored for anti-spam validation purposes and to validate a view count as authentic. After some time,
      this temporary data is pruned and is then no longer persisted.
    </p>
    <h2>User Rights</h2>
    <p>
      If you would like any of your data removed or modified from this website, please{' '}
      <Link href="/contact/">contact</Link> me to make this request.
    </p>
  </section>
);
