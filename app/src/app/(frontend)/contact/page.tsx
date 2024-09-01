import ContactPage from '@/containers/ContactPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Mo Beigi via email or secure PGP. Alternatively, find him on various other networks.',
};

const Contact = () => <ContactPage />;

export default Contact;
