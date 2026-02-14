import './globals.css';

import type { Metadata, Viewport } from 'next';
import { Roboto } from 'next/font/google';
import { APPLICATION_NAME, BASE_URL, SITE_TITLE } from '@/constants/app';
import HeaderContent from '@/components/HeaderContent';
import FooterContent from '@/components/FooterContent';
import GlobalStyle from '@/styles/GlobalStyle';
import { Header, Main, MainContents, Footer } from './styled';
import ThemedToastContainer from '@/components/ThemedToastContainer';
import { GoogleAnalytics } from '@next/third-parties/google';
import { GA_TAG_ID } from '@/constants/analytics';
import GlobalTooltip from '@/components/BaseTooltip';
import ConsoleWelcomeMessage from '@/components/ConsoleWelcomeMessage';
import HolyLoader from 'holy-loader';
import { ThemeProvider } from 'next-themes';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: `%s - ${SITE_TITLE}`,
    default: `${SITE_TITLE}`,
  },
  description:
    "Hi, I'm Mo! Welcome to my online portfolio. Dive into my programming blog and reach out if you're up for a chat.",
  alternates: {
    canonical: './',
  },
  applicationName: APPLICATION_NAME,
  icons: {
    icon: [
      {
        url: '/favicon-32x32.png',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        url: '/favicon-16x16.png',
        type: 'image/png',
        sizes: '16x16',
      },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [{ url: '/safari-pinned-tab.svg', rel: 'mask-icon', color: '#5bbad5' }],
  },
  manifest: '/manifest.webmanifest',
  other: {
    'apple-mobile-web-app-title': APPLICATION_NAME,
    'msapplication-TileColor': '#cc7156',
    // Disable dark reader extension since we natively support dark mode
    'darkreader-lock': '1',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#1e1e1e' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
};

const roboto = Roboto({ subsets: ['latin'], style: ['normal', 'italic'], weight: ['400', '700'] });
const holyLoaderColor = '#af363c';

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    // suppressHydrationWarning needed for next-themes
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider enableSystem={true} defaultTheme="system">
          <GlobalStyle />
          <GlobalTooltip id="global-tooltip" />
          <ThemedToastContainer />
          <HolyLoader color={holyLoaderColor} height="0.2rem" />
          <ConsoleWelcomeMessage />
          <Header id="header">
            <HeaderContent />
          </Header>
          <Main id="main">
            <MainContents>{children}</MainContents>
          </Main>
          <Footer id="footer">
            <FooterContent />
          </Footer>
        </ThemeProvider>
        <GoogleAnalytics gaId={GA_TAG_ID} />
      </body>
    </html>
  );
};

export default RootLayout;
