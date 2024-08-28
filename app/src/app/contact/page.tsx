import ContactPage from '@/containers/ContactPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Mo Beigi via email or secure PGP. Alternatively, find him on various other networks.',
  keywords: [
    'Mo Beigi',
    'contact',
    'email',
    'me@mobeigi.com',
    'PGP public key',
    'networks',
    'reach out',
    'fast response',
    'privacy',
  ],
};

const Contact = () => <ContactPage />;

export default Contact;
