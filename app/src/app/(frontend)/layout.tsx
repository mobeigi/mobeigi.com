import { cookies } from 'next/headers';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Roboto } from 'next/font/google';
import { APPLICATION_NAME, BASE_URL, SITE_TITLE } from '@/constants/app';
import HeaderContent from '@/components/HeaderContent';
import FooterContent from '@/components/FooterContent';
import GlobalStyle from '@/styles/GlobalStyle';
import StyledComponentsRegistry from '@/lib/StyledComponentsRegistry';
import ThemeProviderWrapper from '@/lib/ThemeProviderWrapper';
import { PrefersColorScheme } from '@/types/theme';
import { THEME_COOKIE_NAME } from '@/constants/cookies';
import { Header, Main, MainContents, Footer } from './styled';
import { UserPreferencesProvider } from '@/context/userPreferencesContext';
import { parseThemeCookieValue, resolveThemeMode } from '@/utils/theme';
import { DEFAULT_THEME_MODE, FALLBACK_PREFERS_COLOR_SCHEME } from '@/constants/theme';
import HighlightJsThemeLoader from '@/components/HighlightJsThemeLoader';
import ThemedToastContainer from '@/components/ThemedToastContainer';
import { GoogleAnalytics } from '@next/third-parties/google';
import { GA_TAG_ID } from '@/constants/analytics';
import GlobalTooltip from '@/containers/GlobalTooltip';
import { use } from 'react';
import ConsoleWelcomeMessage from '@/components/ConsoleWelcomeMessage';
import HolyLoader from 'holy-loader';

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
  const cookieStore = use(cookies());
  const themeCookie = cookieStore.get(THEME_COOKIE_NAME);

  let initialThemeMode = DEFAULT_THEME_MODE;
  let initialPrefersColorScheme: PrefersColorScheme | undefined = FALLBACK_PREFERS_COLOR_SCHEME;

  if (themeCookie?.value) {
    let parsedThemeCookieValue;
    try {
      parsedThemeCookieValue = parseThemeCookieValue(themeCookie.value);
      initialThemeMode = parsedThemeCookieValue.themeMode;
      initialPrefersColorScheme = parsedThemeCookieValue.prefersColorScheme;
    } catch (error) {
      console.warn(`Parsing theme cookie value failed. themeCookie: ${themeCookie.value}`, error);
    }
  }

  const currentThemeMode = resolveThemeMode(initialThemeMode, initialPrefersColorScheme);

  return (
    <html lang="en">
      <body className={roboto.className}>
        <StyledComponentsRegistry>
          <UserPreferencesProvider
            initialThemeMode={initialThemeMode}
            initialPrefersColorScheme={initialPrefersColorScheme}
          >
            <ThemeProviderWrapper>
              <GlobalStyle />
              <GlobalTooltip />
              <ThemedToastContainer />
              <HolyLoader color={holyLoaderColor} height="0.2rem" />
              <HighlightJsThemeLoader currentThemeMode={currentThemeMode} />
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
            </ThemeProviderWrapper>
          </UserPreferencesProvider>
        </StyledComponentsRegistry>
        <GoogleAnalytics gaId={GA_TAG_ID} />
      </body>
    </html>
  );
};

export default RootLayout;
