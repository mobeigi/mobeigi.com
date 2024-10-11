import { ContactBodyContainer } from './styled';
import PingForm from './PingForm';

export const ContactPage = () => (
  <section>
    <h1>Contact</h1>
    <ContactBodyContainer>
      <div>
        <h2>Email me</h2>
        <p>
          If you would like to contact me, please send an email to <a href="mailto:me@mobeigi.com">me@mobeigi.com</a>.
        </p>
        <p>
          This is the fastest way to reach me, and I typically respond within <strong>24</strong> hours.
        </p>
        <h2>Need some privacy?</h2>
        <p>I have a PGP Public key available if you prefer to encrypt your emails to me.</p>
        <p>
          <a href="/sec/mo-beigi-pgp-pub.asc">Mo Beigi&apos;s PGP Public Key</a>
        </p>
        <h2>Networks</h2>
        <p>You can also reach me on other networks where I&apos;m active.</p>
        <p>
          Check the <a href="#footer">footer</a> of this page for a list of networks.
        </p>
      </div>
      <div>
        <h2>Ping me</h2>
        <p>Use the form below to send me an anonymous message — it will pop up on my phone!</p>
        <p>If you would like a response, please send me an email instead.</p>
        <PingForm />
      </div>
    </ContactBodyContainer>
  </section>
);
